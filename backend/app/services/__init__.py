from datetime import datetime, timedelta

from app.exceptions.InvalidDateException import InvalidDateException


def calculate_past_year_date_range(from_date, to_date):
    today = datetime.today()
    one_year_ago = today - timedelta(days=365)

    from_date = one_year_ago
    to_date = today

    return from_date, to_date


def try_to_parse_date(date):
    try:
        return datetime.strptime(date, '%Y-%m-%d')
    except ValueError:
        raise InvalidDateException("Invalid date format. Please use the format YYYY-MM-DD.")
