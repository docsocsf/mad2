from mongoengine import connect, fields, Document


class Fresher(Document):
    student = fields.DictField()
    interests = fields.DictField()
    self_description = fields.StringField()


for fresher in Fresher.objects:
    print(fresher)
