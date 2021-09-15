import datetime
from app.models.cuisine import Cuisine
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..forms.restaurant_form import RestaurantForm
from ..models.restaurant import Restaurant
from ..models.db import db
from ..models.cuisine import Cuisine
from ..forms.cuisine_form import CuisineForm
from ..forms.booking_form import BookingForm
from ..models.booking import Booking
from datetime import time, datetime, date
from ..models.image import Image

from app.aws import (
    upload_file_to_s3, allowed_file, get_unique_filename)

from app.models import restaurant

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


@restaurant_routes.route('/<int:id>/bookmark', methods=['PUT'])
@login_required
def bookmark(id):
    user = current_user
    restaurant = Restaurant.query.get(id)

    all_user_ids = [user.id for user in restaurant.bookmark_users]

    if user.id in all_user_ids:
        restaurant.bookmark_users.remove(user)
    else:
        restaurant.bookmark_users.append(user)

    db.session.commit()
    return restaurant.to_dict()


@restaurant_routes.route('/<int:id>/newbooking', methods=['POST'])
@login_required
def add_booking(id):
    user = current_user
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # getting value from the form
    booking_date = form.data['startDate']
    booking_time = form.data['startTime']
    # query the correct restaurant with all the same date(same date with the upcoming request) bookings.
    same_date_bookings = Booking.query.filter(
        Booking.startDate == booking_date,
        Booking.restaurant_id == id
    ).all()
    # filter out the bookings only the same hour with the upcoming request startTime.
    # turn it into list, get the length
    exsisting_bookings_length = len(list(filter(
        lambda x: x == booking_time.hour,
        [booking.startTime.hour for booking in same_date_bookings])))
    # if the same hour, same day same restautant having 5 or more bookings, request denied.
    # throw error let user know that no more spots!
    if exsisting_bookings_length >= 5:
        return {'errors': ['sorry no more spots in the selected hour']}, 401

    if form.validate_on_submit():
        data = form.data
        new_booking = Booking(
            user_id=user.id,
            size=data['size'],
            startDate=data['startDate'],
            startTime=data['startTime'],
            restaurant_id=id
        )

        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@restaurant_routes.route('/<int:id>/getbookings')
def get_bookings(id):
    bookings = Booking.query.filter(
        Booking.restaurant_id == id, Booking.startDate == date.today()).all()
    return {booking.id: booking.to_dict() for booking in bookings}


@restaurant_routes.route('/<int:id>/images')
def get_images(id):
    images = Image.query.filter(Image.restaurant_id == id).all()
    return {image.id: image.to_dict() for image in images}


@restaurant_routes.route('/<int:id>/uploadimage', methods=['POST'])
@login_required
def upload_image(id):
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Image(
        user_id=current_user.id,
        imgUrl=url,
        restaurant_id=id
    )
    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()
