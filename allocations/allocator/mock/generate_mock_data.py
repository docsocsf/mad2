from datetime import datetime
from random import randint

from ..models import Fresher, Interests, Parent, Student

import pandas as pd


from rstr import xeger


shortcode_pattern = "[a-z]{2}\d{1,2}19"


def rand_interest():
    return randint(0, 4)


def mock_students():
    df = pd.read_csv('students.csv')

    for _, row in df.iterrows():
        fresher = Fresher(
            student=Student(
                firstName=row['fname'],
                lastName=row['lname'],
                shortcode=xeger(shortcode_pattern)
            ),
            interests=Interests(
                alcohol=rand_interest(),
                clubbing=rand_interest(),
                anime=rand_interest(),
                sports=rand_interest(),
                cooking=rand_interest(),
                performingMusic=rand_interest(),
                kpop=rand_interest(),
                dance=rand_interest()
            )
        )
        fresher.save()


def mock_parents():
    df = pd.read_csv('parents.csv')

    for _, row in df.iterrows():
        parent = Parent(
            student=Student(
                firstName=row['fname'],
                lastName=row['lname'],
                shortcode=xeger(shortcode_pattern)
            ),
            interests=Interests(
                alcohol=rand_interest(),
                clubbing=rand_interest(),
                anime=rand_interest(),
                sports=rand_interest(),
                cooking=rand_interest(),
                performingMusic=rand_interest(),
                kpop=rand_interest(),
                dance=rand_interest()
            ),
            signedUpTs=datetime.now()
        )
        parent.save()


mock_parents()
