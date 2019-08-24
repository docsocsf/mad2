from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    ListField,
    GenericReferenceField
)


class Family(Document):
    parents = GenericReferenceField()
    kids = ListField(GenericReferenceField(), default=[])
    assignedTs = DateTimeField()

    meta = {
        "strict": False,
        "collection": "families"
    }
