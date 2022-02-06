import click
from flask.cli import FlaskGroup
from .. import app
from .manage_user import add_user, delete_user, change_password
from .import_data import import_historical_sales, import_predicted_sales


cli = FlaskGroup(app)


@cli.command("add_user")
@click.option('--username')
@click.option('--email')
@click.option('--password')
def add_user_command(username, email, password):
    add_user(username, email, password)


@cli.command("delete_user")
@click.argument("email")
def delete_user_command(email):
    delete_user(email)


@cli.command("change_password")
@click.argument("email")
@click.argument("password")
def change_password_command(email, password):
    change_password(email, password)


@cli.command("import_historical_sales")
def import_historical_sales_command():
    import_historical_sales()


@cli.command("import_predicted_sales")
def import_predicted_sales_command():
    import_predicted_sales()


if __name__ == "__main__":
    cli()
