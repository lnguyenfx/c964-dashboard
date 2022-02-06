from .db import db


class Sales(db.Model):
    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False)
    store_nbr = db.Column(db.Integer, nullable=False)
    automotive = db.Column(db.Float, nullable=False)
    baby_care = db.Column(db.Float, nullable=False)
    beauty = db.Column(db.Float, nullable=False)
    beverages = db.Column(db.Float, nullable=False)
    books = db.Column(db.Float, nullable=False)
    bread_bakery = db.Column(db.Float, nullable=False)
    celeberation = db.Column(db.Float, nullable=False)
    cleaning = db.Column(db.Float, nullable=False)
    dairy = db.Column(db.Float, nullable=False)
    deli = db.Column(db.Float, nullable=False)
    eggs = db.Column(db.Float, nullable=False)
    frozen_foods = db.Column(db.Float, nullable=False)
    grocery_i = db.Column(db.Float, nullable=False)
    grocery_ii = db.Column(db.Float, nullable=False)
    hardware = db.Column(db.Float, nullable=False)
    home_and_kitchen_i = db.Column(db.Float, nullable=False)
    home_and_kitchen_ii = db.Column(db.Float, nullable=False)
    home_appliances = db.Column(db.Float, nullable=False)
    home_care = db.Column(db.Float, nullable=False)
    ladieswear = db.Column(db.Float, nullable=False)
    lawn_and_garden = db.Column(db.Float, nullable=False)
    lingerie = db.Column(db.Float, nullable=False)
    liquor_wine_beer = db.Column(db.Float, nullable=False)
    magazines = db.Column(db.Float, nullable=False)
    meats = db.Column(db.Float, nullable=False)
    personal_care = db.Column(db.Float, nullable=False)
    pet_supplies = db.Column(db.Float, nullable=False)
    players_and_electronics = db.Column(db.Float, nullable=False)
    poultry = db.Column(db.Float, nullable=False)
    prepared_foods = db.Column(db.Float, nullable=False)
    produce = db.Column(db.Float, nullable=False)
    school_and_office_supplies = db.Column(db.Float, nullable=False)
    seafood = db.Column(db.Float, nullable=False)

    def to_dict(self):
        return {
           'id': self.id,
           'date': self.date,
           'store_nbr': self.store_nbr,
           'automotive': self.automotive,
           'baby_care': self.baby_care,
           'beauty': self.beauty,
           'beverages': self.beverages,
           'books': self.books,
           'bread_bakery': self.bread_bakery,
           'celeberation': self.celeberation,
           'cleaning': self.cleaning,
           'dairy': self.dairy,
           'deli': self.deli,
           'eggs': self.eggs,
           'frozen_foods': self.frozen_foods,
           'grocery_i': self.grocery_i,
           'grocery_ii': self.grocery_ii,
           'hardware': self.hardware,
           'home_and_kitchen_i': self.home_and_kitchen_i,
           'home_and_kitchen_ii': self.home_and_kitchen_ii,
           'home_appliances': self.home_appliances,
           'home_care': self.home_care,
           'ladieswear': self.ladieswear,
           'lawn_and_garden': self.lawn_and_garden,
           'lingerie': self.lingerie,
           'liquor_wine_beer': self.liquor_wine_beer,
           'magazines': self.magazines,
           'meats': self.meats,
           'personal_care': self.personal_care,
           'pet_supplies': self.pet_supplies,
           'players_and_electronics': self.players_and_electronics,
           'poultry': self.poultry,
           'prepared_foods': self.prepared_foods,
           'produce': self.produce,
           'school_and_office_supplies': self.school_and_office_supplies,
           'seafood': self.seafood
        }

    def to_summary(self, filters = []):
        sales_cols = [attr for attr in dir(self)]
        total_sales = 0

        for col in sales_cols:
            val = getattr(self, col)
            if isinstance(val, float):
                if len(filters) == 0 or (len(filters) > 0 and col in filters):
                    total_sales += val

        return {
            'id': self.id,
            'date': self.date.strftime("%Y-%m-%d"),
            'store_nbr': self.store_nbr,
            'total_sales': total_sales
        }
