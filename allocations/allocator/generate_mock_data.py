import pandas as pd

from rstr import xeger

from models import Fresher, Student


shortcode_pattern = "[a-z]{2}\d{1,2}19"


df = pd.read_csv('MOCK_DATA.csv')

for _, row in df.iterrows():
    fresher = Fresher(student=Student(
        firstName=row['fname'],
        lastName=row['lname'],
        shortcode=xeger(shortcode_pattern)
    ), interests={})
    fresher.save()
