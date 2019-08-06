from models import Family, Fresher


def allocate_and_save(freshers):
    kids = []

    for fresher in freshers:
        kids.append(fresher)
        if len(kids) == 4:
            family = Family(kids=kids)
            family.save()
            kids = []


allocate_and_save(Fresher.objects)

for family in Family.objects:
    print()
    print(family)
    for kid in family.kids:
        print(kid['student'])
