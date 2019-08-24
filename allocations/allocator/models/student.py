from mongoengine import EmbeddedDocument
from mongoengine.fields import (
    StringField
)


class Student(EmbeddedDocument):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    preferredName = StringField(default="")
    shortcode = StringField(unique=True, required=True)

    meta = {
        "strict": False,
        "collection": "students"
    }
