import csv
import os
from .. import app
from app.models import HistoricalSales, PredictedSales, db
from datetime import datetime

def import_historical_sales():
    import_sales('historical_sales.csv', HistoricalSales)


def import_predicted_sales():
    #import_sales('predicted_historical_sales.csv', PredictedSales)
    import_sales('predicted_future_sales.csv', PredictedSales)


def import_sales(csv_filename, SalesModel):
    db.create_all() # make sure schema is created

    script_dir = os.path.dirname(os.path.realpath(__file__))
    with open(script_dir + '/../data/' + csv_filename) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        
        for row in csv_reader:
            if (row[0] == 'date' or row[0] == ''):
                continue # skip header row

            sales = SalesModel(
                date=datetime.strptime(row[0], '%Y-%m-%d'),
                store_nbr=row[1],
                automotive=row[2],
                baby_care=row[3],
                beauty=row[4],
                beverages=row[5],
                books=row[6],
                bread_bakery=row[7],
                celeberation=row[8],
                cleaning=row[9],
                dairy=row[10],
                deli=row[11],
                eggs=row[12],
                frozen_foods=row[13],
                grocery_i=row[14],
                grocery_ii=row[15],
                hardware=row[16],
                home_and_kitchen_i=row[17],
                home_and_kitchen_ii=row[18],
                home_appliances=row[19],
                home_care=row[20],
                ladieswear=row[21],
                lawn_and_garden=row[22],
                lingerie=row[23],
                liquor_wine_beer=row[24],
                magazines=row[25],
                meats=row[26],
                personal_care=row[27],
                pet_supplies=row[28],
                players_and_electronics=row[29],
                poultry=row[30],
                prepared_foods=row[31],
                produce=row[32],
                school_and_office_supplies=row[33],
                seafood=row[34]
            )
            db.session.add(sales)
            db.session.commit()
