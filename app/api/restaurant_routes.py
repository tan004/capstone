from app.models.cuisine import Cuisine
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms.restaurant_form import RestaurantForm
from ..models.restaurant import Restaurant
from ..models.db import db
from ..models.cuisine import Cuisine
from ..forms.cuisine_form import CuisineForm

restaurant_routes = Blueprint('restaurants', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@restaurant_routes.route('/all')
def get_all_restaurants():
    restaurants = Restaurant.query.all()
    return {r.id: r.to_dict() for r in restaurants}


@restaurant_routes.route('/<int:id>')
def get_one_restaurant(id):
    restaurant = Restaurant.query.get(id)
    return restaurant.to_dict()


@restaurant_routes.route('/new', methods=['POST'])
@login_required
def create_restaurant():
    user = current_user
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print(form.data)
        data = Restaurant(
            owner_id=user.id,
            title=form.data['title'],
            phone=form.data['phone'],
            description=form.data['description'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            profile_pic=form.data['profile_pic'],
            lat=form.data['lat'],
            lng=form.data['lng'],
        )

        if data.lat == '':
            data.lat = None

        if data.lng == '':
            data.lng = None

        db.session.add(data)
        db.session.commit()
        # print(data)
        return data.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_restaurant(id):
    user = current_user
    restaurant = Restaurant.query.get(id)

    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if user.id != restaurant.owner_id:
        return {'errors': ['Unauthorized']}, 401

    if form.validate_on_submit():
        data = form.data
        restaurant.title = data['title']
        restaurant.phone = data['phone']
        restaurant.description = data['description']
        restaurant.address = data['address']
        restaurant.city = data['city']
        restaurant.state = data['state']
        restaurant.zip_code = data['zip_code']
        restaurant.profile_pic = data['profile_pic']
        restaurant.lat = data['lat']
        restaurant.lng = data['lng']

        db.session.commit()
        # print(restaurant.to_dict())
        return restaurant.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_restaurant(id):
    user = current_user
    restaurant = Restaurant.query.get(id)

    if user.id != restaurant.owner_id:
        return {'errors': ['Unauthorized']}, 401

    db.session.delete(restaurant)
    db.session.commit()

    return jsonify('Completed')


@restaurant_routes.route('/<int:id>/addcuisine', methods=['POST'])
@login_required
def add_cuisine(id):

    form = CuisineForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        new_type = Cuisine(
            restaurant_id=id,
            type=data['type']
        )
        db.session.add(new_type)
        db.session.commit()
        return new_type.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>/one')
def get_cuisine_for_one(id):
    cuisines = Cuisine.query.filter(Cuisine.restaurant_id == id).all()
    return {cuisine.id: cuisine.to_dict() for cuisine in cuisines}
