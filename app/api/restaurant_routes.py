from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms.restaurant_form import RestaurantForm
from ..models.restaurant import Restaurant
from ..models.db import db

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


@restaurant_routes.route('/new', methods=['POST'])
@login_required
def create_restaurant():
    user = current_user
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = Restaurant(
            owner_id=user.id,
            title=form.data['title'],
            phone=form.data['phone'],
            description=form.data['description'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            lat=form.data['lat'],
            lng=form.data['lng'],
        )

        if data.lat == '':
            data.lat = None

        if data.lng == '':
            data.lng = None

        db.session.add(data)
        db.session.commit()
        return data.to_dict()
    return jsonify(form.errors)
