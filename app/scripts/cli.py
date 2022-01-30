import click
from flask.cli import FlaskGroup
from .. import app
from .manage_user import add_user, delete_user

cli = FlaskGroup(app)

@cli.command()
def hello():
    print("hello")


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


if __name__ == "__main__":
    cli()
