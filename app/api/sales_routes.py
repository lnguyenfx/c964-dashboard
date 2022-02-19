from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import HistoricalSales, PredictedSales

sales_routes = Blueprint('sales', __name__)


@sales_routes.route('/historical')
@login_required
def historical_sales():
    return get_historical_sales()


@sales_routes.route('/predicted')
@login_required
def predicted_sales():
    return get_predicted_sales()


@sales_routes.route('/errors')
@login_required
def errors_in_sales():
    return get_errors_in_sales()


@sales_routes.route('/historical/<filters>')
@login_required
def historical_sales_with_filters(filters):
    return get_historical_sales(filters)


@sales_routes.route('/predicted/<filters>')
@login_required
def predicted_sales_with_filters(filters):
    return get_predicted_sales(filters)


@sales_routes.route('/errors/<filters>')
@login_required
def error_in_sales_with_filters(filters):
    return get_errors_in_sales(filters)


def get_historical_sales(filters=None):
    sales = HistoricalSales.query.filter(HistoricalSales.date >= '2017-08-01')
    if filters is None:
        return {'historical_sales': [row.to_summary() for row in sales]}
    else:
        families = [val for val in filters.split('+')]
        return {'historical_sales': [row.to_summary(families) for row in sales]}


def get_predicted_sales(filters = None):
    sales = PredictedSales.query.filter(PredictedSales.date >= '2017-08-16')
    if filters is None:
        return {'predicted_sales': [row.to_summary() for row in sales]}
    else:
        families = [val for val in filters.split('+')]
        return {'predicted_sales': [row.to_summary(families) for row in sales]}


def get_errors_in_sales(filters = None):
    h_sales = HistoricalSales.query \
        .filter(HistoricalSales.date >= '2017-08-01',
                HistoricalSales.date <= '2017-08-15')

    p_sales = PredictedSales.query \
        .filter(PredictedSales.date >= '2017-08-01',
                PredictedSales.date <= '2017-08-15')

    if filters is None:
        families = []
    else:
        families = [val for val in filters.split('+')]

    h_sales = [row.to_summary(families) for row in h_sales]
    p_sales = [row.to_summary(families) for row in p_sales]

    errors = []

    for i in range(len(h_sales)):
        row = h_sales[i]
        row['total_sales'] -= p_sales[i]['total_sales']
        errors.append(row)

    return {'errors_sales': errors}
