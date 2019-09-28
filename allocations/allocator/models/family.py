from itertools import combinations, product

from allocator.models.fresher import Fresher
from allocator.models.parent import Parent

import numpy as np

NO_OF_HOBBIES = 27

AVERAGE_DISTANCE_IN_N_DIMENSIONAL_SPACE = 4.2


class Family:

    def __init__(self, data):

        self.parents = [
            Parent(data['parents']['proposerId']),
            Parent(data['parents']['proposeeId'])
        ]

        self.id = data['_id']

        self.kids = [Fresher(f) for f in data['kids']]
        self.unallocated_kids = []
        self.hasFemale = data['hasFemale']
        self.hasJmc = data['hasJmc']
        self.children_score = 1000
        self.parent_score = 1000
        self.children_mean = np.zeros(NO_OF_HOBBIES)
        self.parent_mean = np.zeros(NO_OF_HOBBIES)

    def _score_children(self, all_kids):

        if len(all_kids) <= 1:
            return AVERAGE_DISTANCE_IN_N_DIMENSIONAL_SPACE

        pairs = combinations(all_kids, 2)
        vectors = [list(map(lambda x: x.interests, pair)) for pair in pairs]
        distances = [np.linalg.norm(pair[0] - pair[1])
                     for pair in vectors]

        self.children_score = \
            sum([distance ** 2 for
                 distance in distances]) / len(distances)

        return self.children_score

    def _score_parents(self, all_kids):
        if not all_kids:
            return 1000
        pairs = product(self.parents, all_kids)
        vectors = [list(map(lambda x: x.interests, pair)) for pair in pairs]
        distances = [np.linalg.norm(pair[0] - pair[1])
                     for pair in vectors]
        self.parent_score = \
            sum([distance ** 2 for
                 distance in distances]) / len(distances)

        return self.parent_score

    def score(self, addition=None, removal=None):
        unalloc = self.unallocated_kids
        if removal:
            unalloc.remove(removal)

        all_kids = self.kids + unalloc

        if addition:
            all_kids.append(addition)

        return self._score_children(all_kids) \
            + self._score_parents(all_kids)

    def calculate_parent_mean(self):
        self.parent_mean = np.mean(
            self.parents.proposerId.interests_vector(),
            self.parents.proposeeId.interests_vector()
        )
        return self.parent_mean

    def calculate_children_mean(self):
        self.children_mean = np.mean(
            list(map(lambda x: x.interests,
                     self.kids + self.unallocated_kids)))
        return self.children_mean

    def sort_children(self):
        self.kids.sort(
            key=lambda x: np.linalg.norm(x.interests - self.children_mean))

    def __repr__(self):
        kids_string = ""
        for kid in self.kids + self.unallocated_kids:
            kids_string += str(kid) + ","
        return "Family(Parents=[{}], Kids=[{}])".format(
            self.parents, kids_string
        )
