from mongoengine import Document, EmbeddedDocument, connect
from mongoengine.fields import (
    DictField,
    ListField,
    ReferenceField,
    StringField,
    EmbeddedDocumentField
)

db = connect(db='demo', host='mongodb://localhost:27017')


class Student(EmbeddedDocument):
    firstName = StringField()
    lastName = StringField()
    preferredName = StringField(default="")
    shortcode = StringField(unique=True)


class Fresher(Document):
    student = EmbeddedDocumentField(Student)
    interests = DictField()
    selfDescription = StringField(default="")
    meta = {'collection': 'fresher_models', 'strict': False}


class Family(Document):
    kids = ListField(ReferenceField(Fresher))
