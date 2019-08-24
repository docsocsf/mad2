from mongoengine import EmbeddedDocument
from mongoengine.fields import (
    IntField
)


def preference_field():
    return IntField(min_value=0, max_value=4, default=0)


class Interests(EmbeddedDocument):
    alcohol = preference_field()
    clubbing = preference_field()
    anime = preference_field()
    sports = preference_field()
    cooking = preference_field()
    performingMusic = preference_field()
    kpop = preference_field()
    dance = preference_field()

    meta = {
        "strict": False,
        "collection": "interests"
    }

    def to_dict(self):
        return {
            "alcohol": self.alcohol,
            "clubbing": self.clubbing,
            "anime": self.anime,
            "sports": self.sports,
            "cooking": self.cooking,
            "performingMusic": self.performingMusic,
            "kpop": self.kpop,
            "dance": self.dance
        }
