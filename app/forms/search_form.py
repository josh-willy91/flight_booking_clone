from flask_wtf import FlaskForm
from wtforms import StringField, DateField, DateTimeField
from wtforms.validators import DataRequired, ValidationError
import re


def special_char_check(form, field):
    #checking for numbers or symbols
    string = field.data
    # print(string, '=======string============================================')
    regex = '[0-9]|[@_!#$%^&*()<>?/|}{~:]'
    check_string = re.search(regex, string)
    # print(check_string, '=====================================')
    if check_string is not None:
        # print('inside conditional ========================')
        raise ValidationError(' Origin & destination must only contain letters')

def check_dates(form, field):
    date = field.data
    print(date, '=========date===============')

class SearchForm(FlaskForm):
    origin = StringField('origin', validators=[DataRequired(), special_char_check])
    destination = StringField('destination', validators=[DataRequired(), special_char_check])
    # departure_date = DateField('departure_date', validators=[DataRequired(), check_dates])
    # return_date = DateField('return_date', validators=[DataRequired(), check_dates])
