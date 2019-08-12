from mongoengine import Document, EmbeddedDocument, connect
from mongoengine.fields import (
    BoolField,
    DateTimeField,
    EmbeddedDocumentField,
    IntField,
    ListField,
    ReferenceField,
    StringField
)

db = connect(db='demo', host='mongodb://localhost:27017')


def preference_field():
    return IntField(min_value=0, max_value=4, default=0)


class Student(EmbeddedDocument):
    firstName = StringField(required=True)
    lastName = StringField(required=True)
    preferredName = StringField(default="")
    shortcode = StringField(unique=True, required=True)


class Interests(EmbeddedDocument):
    alcohol = preference_field()
    clubbing = preference_field()
    anime = preference_field()
    sports = preference_field()
    cooking = preference_field()
    performingMusic = preference_field()
    kpop = preference_field()
    dance = preference_field()

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


class Fresher(Document):

    student = EmbeddedDocumentField(Student, required=True)
    interests = EmbeddedDocumentField(Interests, required=True)
    selfDescription = StringField(default="")
    signedUpTs = DateTimeField()

    meta = {'collection': 'freshers'}

    def to_dict(self):
        interests_dict = self.interests.to_dict()
        interests_dict["shortcode"] = self.student.shortcode

        return interests_dict


class Parent(Document):

    student = EmbeddedDocumentField(Student, required=True)
    interests = EmbeddedDocumentField(Interests, required=True)
    partnerShortcode = StringField(required=True)
    selfDescription = StringField(default="")
    signedUpTs = DateTimeField()

    meta = {'collection': 'parents'}

    def to_dict(self):
        interests_dict = self.interests.to_dict()
        interests_dict["shortcode"] = self.student.shortcode

        return interests_dict


class Marriage(Document):
    parents = ListField(ReferenceField(Parent), required=True)
    proposer = ReferenceField(Parent, required=True)
    proposee = ReferenceField(Parent, required=True)
    accepted = BoolField(default=False)
    proposeTs = DateTimeField()
    acceptedTs = DateTimeField()


class Family(Document):
    parents = ReferenceField(Marriage)
    kids = ListField(ReferenceField(Fresher), default=[])
    assignedTs = DateTimeField()
