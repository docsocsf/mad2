from .interests import Interests

from .marriage_status import MarriageStatus

from .student import Student


from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    EmbeddedDocumentField,
    StringField
)


class Parent(Document):

    student = EmbeddedDocumentField(Student, required=True)
    interests = EmbeddedDocumentField(Interests, required=True)
    selfDescription = StringField(default="")
    signedUpTs = DateTimeField()
    marriageStatus = EmbeddedDocumentField(MarriageStatus)

    meta = {
        "strict": False,
        "collection": "parents"
    }

    def to_dict(self):
        interests_dict = self.interests.to_dict()
        interests_dict["shortcode"] = self.student.shortcode

        return interests_dict
