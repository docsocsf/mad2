from mongoengine import Document
from mongoengine.fields import (
    BooleanField,
    DateTimeField,
    ListField,
    ReferenceField
)

from allocator.models.parent import Parent


class Marriage(Document):
    parents = ListField(ReferenceField(Parent), required=True)
    proposer = ReferenceField(Parent, required=True)
    proposee = ReferenceField(Parent, required=True)
    accepted = BooleanField(default=False)
    proposeTs = DateTimeField()
    acceptedTs = DateTimeField()

    meta = {
        "strict": False,
        "collection": "marriages"
    }
