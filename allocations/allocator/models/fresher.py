from allocator.models.student import Student

import numpy as np


class Fresher:

    def __init__(self, data):

        self.id = data['_id']
        self.student = Student(data['student'])

        self._interests = data['interests']
        del self._interests['_id']

        self.family = data['family'] if 'family' in data.keys() else None

    # def to_dict(self):
    #     interests_dict = self.interests.to_dict()
    #     interests_dict["shortcode"] = self.student.shortcode

    #     return interests_dict

    @property
    def interests(self):
        return np.fromiter(self._interests.values(), dtype=float)

    def __str__(self):
        return "Fresher(" + str(self.student) + ")"
