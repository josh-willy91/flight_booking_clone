from flask_wtf import FlaskForm
from wtforms import StringField, DateField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
from datetime import date
import re


def special_char_check(form, field):
    #checking for numbers or symbols
    string = field.data
    regex = '[0-9]|[@_!#$%^&*()<>?/|}{~:]'
    check_string = re.search(regex, string)
    if check_string is not None:
        raise ValidationError(' Origin & destination must only contain letters')

def check_dates(form, field):
    form_date = field.data
    today = date.today()


class SearchForm(FlaskForm):
    origin = StringField('origin', validators=[DataRequired(), special_char_check])
    destination = StringField('destination', validators=[DataRequired(), special_char_check])
    # departure_date = DateField('departure_date', validators=[DataRequired(), check_dates])
    # return_date = DateField('return_date', validators=[DataRequired(), check_dates])
