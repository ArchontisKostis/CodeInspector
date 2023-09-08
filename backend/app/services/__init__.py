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


def validate_date(from_date: str, to_date: str):
    # If from_date or to_date is None, calculate past year date range
    if from_date is None or to_date is None:
        from_date, to_date = calculate_past_year_date_range(from_date, to_date)
    else:
        from_date = try_to_parse_date(from_date)
        to_date = try_to_parse_date(to_date)

    return from_date, to_date
