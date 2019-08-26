from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    EmbeddedDocumentField,
    StringField
)

from allocator.models.interests import Interests
from allocator.models.student import Student


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

    def interests_vector(self):
        return self.interests.to_np_array()
