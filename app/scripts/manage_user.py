from .. import app
from app.models import User, db


def add_user(username, email, password):
    user = User(
        username=username,
        email=email,
        password=password
    )
    db.session.add(user)
    db.session.commit()


def delete_user(email):
    User.query.filter(User.email == email).delete()
    db.session.commit()


def change_password(email, password):
    user = User.query.filter(User.email == email).one()
    user.password = password
    db.session.commit()
