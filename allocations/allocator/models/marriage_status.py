from . import Marriage

from mongoengine import EmbeddedDocument
from mongoengine.fields import (
    BooleanField,
    ReferenceField
)


class MarriageStatus(EmbeddedDocument):
    married = BooleanField(default=False)
    marriage = ReferenceField(Marriage, required=False)

    meta = {
        "strict": False,
    }
