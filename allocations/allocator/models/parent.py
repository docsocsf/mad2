from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    GenericEmbeddedDocumentField,
    EmbeddedDocumentField,
    StringField
)

from allocator.models.interests import Interests


class Parent(Document):
    student = GenericEmbeddedDocumentField(required=True)
    interests = EmbeddedDocumentField(Interests, required=True)
    selfDescription = StringField(default="")
    signedUpTs = DateTimeField()
    marriageStatus = GenericEmbeddedDocumentField()

    meta = {
        "strict": False,
        "collection": "parents"
    }

    def to_dict(self):
        interests_dict = self.interests.to_dict()
        interests_dict["shortcode"] = self.student.shortcode

        return interests_dict

    def interests_vector(self):
        return self.interests.to_np_array()

