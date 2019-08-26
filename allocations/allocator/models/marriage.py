import numpy as np
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
    proposee = ReferenceField(Parent, required=False)
    accepted = BooleanField(default=False)
    proposeTs = DateTimeField()
    acceptedTs = DateTimeField()

    meta = {
        "strict": False,
        "collection": "marriages"
    }

    def mean(self):
        return np.mean(
            np.array([self.proposer.interests_vector(), self.proposee.interests_vector()])
        )