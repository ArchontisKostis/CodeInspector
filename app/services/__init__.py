from datetime import datetime, timedelta


def calculate_past_year_date_range(from_date, to_date):
    today = datetime.today()
    one_year_ago = today - timedelta(days=365)

    from_date = one_year_ago
    to_date = today


    return from_date, to_date