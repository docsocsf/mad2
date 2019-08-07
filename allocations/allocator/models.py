from mongoengine import Document, EmbeddedDocument, connect
from mongoengine.fields import (
    EmbeddedDocumentField,
    IntField,
    ListField,
    ReferenceField,
    StringField
)

db = connect(db='demo', host='mongodb://localhost:27017')


class PrefField():

    def __call__(self):
        return IntField(min_value=0, max_value=4, default=0)


class Student(EmbeddedDocument):
    firstName = StringField()
    lastName = StringField()
    preferredName = StringField(default="")
    shortcode = StringField(unique=True)


class Interests(EmbeddedDocument):
    alcohol = IntField(min_value=0, max_value=4, default=0)
    clubbing = IntField(min_value=0, max_value=4, default=0)
    anime = IntField(min_value=0, max_value=4, default=0)
    sports = IntField(min_value=0, max_value=4, default=0)
    cooking = IntField(min_value=0, max_value=4, default=0)
    performingMusic = IntField(min_value=0, max_value=4, default=0)
    kpop = IntField(min_value=0, max_value=4, default=0)
    dance = IntField(min_value=0, max_value=4, default=0)


class Fresher(Document):
    student = EmbeddedDocumentField(Student)
    interests = EmbeddedDocumentField(Interests)
    selfDescription = StringField(default="")
    meta = {'collection': 'fresher_models', 'strict': False}


class Family(Document):
    kids = ListField(ReferenceField(Fresher))
