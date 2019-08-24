from mongoengine import EmbeddedDocument
from mongoengine.fields import (
    BooleanField,
    GenericReferenceField
)


class MarriageStatus(EmbeddedDocument):
    married = BooleanField(default=False)
    marriage = GenericReferenceField(required=False)

    meta = {
        "strict": False,
    }
