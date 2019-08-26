from itertools import combinations

import numpy as np
from mongoengine import Document
from mongoengine.fields import (
    DateTimeField,
    ListField,
    ReferenceField
)

from allocator.models.fresher import Fresher
from allocator.models.marriage import Marriage


class Family(Document):
    marriage = ReferenceField(Marriage, required=False)
    kids = ListField(ReferenceField(Fresher), default=[])
    assignedTs = DateTimeField()

    meta = {
        "strict": False,
        "collection": "families"
    }

    def __init__(self, *args, **values):
        super().__init__(*args, **values)
        self.children_score = 1000
        self.parent_score = 1000
        self.children_mean = np.zeros(8)
        self.parent_mean = np.zeros(8)

    def score_children(self):
        pairs = list(combinations(self.kids, 2))
        vectors = [list(map(lambda x: x.interests_vector(), pair)) for pair in pairs]
        distances = [np.linalg.norm(pair[0] - pair[1])
                     for pair in vectors]

        self.children_score = sum([distance ** 2 for distance in distances]) / len(self.kids)
        return self.children_score

    def calculate_parent_mean(self):
        self.parent_mean = np.mean(list(map(lambda x: x.interests_vector(), self.marriage.parents)))
        return self.parent_mean

    def calculate_children_mean(self):
        self.children_mean = np.mean(list(map(lambda x: x.interests_vector(), self.kids)))
        return self.children_mean

    def sort_children(self):
        self.kids.sort(key=lambda x: np.linalg.norm(x.interests_vector() - self.children_mean))
        # print([(kid.student.shortcode, np.linalg.norm(kid.interests_vector() - self.children_mean)) for kid in self.kids])

    # TODO
    def total_score(self):
        return
