from . import Student, Interests

from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    EmbeddedDocumentField,
    StringField
)


class Fresher(Document):

    student = EmbeddedDocumentField(Student, required=True)
    interests = EmbeddedDocumentField(Interests, required=True)
    selfDescription = StringField(default="")
    signedUpTs = DateTimeField()

    meta = {
        "strict": False,
        "collection": "freshers"
    }

    def to_dict(self):
        interests_dict = self.interests.to_dict()
        interests_dict["shortcode"] = self.student.shortcode

        return interests_dict
