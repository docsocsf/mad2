from mongoengine import connect, fields, Document

db = connect(db='demo', host='mongodb://localhost:27017')

class Fresher(Document):
    student = fields.DictField()
    interests = fields.DictField()
    selfDescription = fields.StringField()
    meta = {'collection': 'fresher_models', 'strict': False}


class Family(Document):
    kids = fields.ListField(fields.ReferenceField(Fresher))


def allocate_and_save(freshers):
    kids = []

    for fresher in freshers:
        kids.append(fresher)
        if len(kids) == 4:
            family = Family(kids=kids)
            family.save()
            kids = []


for family in Family.objects:
    for kid in family.kids:
        print(kid['student'])
