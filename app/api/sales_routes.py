from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import HistoricalSales, PredictedSales

sales_routes = Blueprint('sales', __name__)


@sales_routes.route('/historical')
@login_required
def historical_sales():
    sales = HistoricalSales.query.filter(HistoricalSales.date >= '2017-08-01')
    return {'historical_sales': [row.to_summary() for row in sales]}


@sales_routes.route('/predicted')
@login_required
def predicted_sales():
    sales = PredictedSales.query.filter(PredictedSales.date >= '2017-08-16')
    return {'predicted_sales': [row.to_summary() for row in sales]}


@sales_routes.route('/historical/<filters>')
@login_required
def historical_sales_with_filters(filters):
    families = [val for val in filters.split('+')]
    sales = HistoricalSales.query.filter(HistoricalSales.date >= '2017-08-01')
    return {'historical_sales': [row.to_summary(families) for row in sales]}


@sales_routes.route('/predicted/<filters>')
@login_required
def predicted_sales_with_filters(filters):
    families = [val for val in filters.split('+')]
    sales = PredictedSales.query.filter(PredictedSales.date >= '2017-08-16')
    return {'predicted_sales': [row.to_summary(families) for row in sales]}
