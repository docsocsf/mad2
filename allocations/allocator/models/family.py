from allocator.models import Marriage, Fresher

from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    ListField,
    ReferenceField
)


class Family(Document):
    parents = ReferenceField(Marriage)
    kids = ListField(ReferenceField(Fresher), default=[])
    assignedTs = DateTimeField()

    meta = {
        "strict": False,
        "collection": "families"
    }
