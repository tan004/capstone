from flask import Blueprint
from ..models.restaurant import Restaurant
from ..models.cuisine import Cuisine
from app.models import restaurant

search_routes = Blueprint('search', __name__)

@search_routes.route('/<query>')
def search_restaurant(query):

    results = Restaurant.query.filter(Restaurant.title.ilike(f"%{query}%")).all()


    restaurants = [r.to_dict() for r in results]

    return {'restaurants': restaurants}
