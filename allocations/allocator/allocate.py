import json

from allocator.models import Family, Fresher

import requests

LOCAL_URL = "http://localhost:8080/"
MAX_CHILDREN = 2


def dummy_allocate(families, freshers):

    while freshers:
        for family in families:
            if freshers:
                family.unallocated_kids.append(freshers.pop())
            else:
                break


def transferrable(kid, current_family, potential_family,
                  max_children=MAX_CHILDREN):
    pass


def allocate(dry=True, url=LOCAL_URL, debug=False, max_children=MAX_CHILDREN):
    families = requests.get(url + "api/signup/all-families")
    freshers = requests.get(url + "api/signup/all-unallocated-freshers")

    if debug:
        print(json.dumps(families.json(), indent=4))
        print(json.dumps(freshers.json(), indent=4))

    families = [Family(family) for family in families.json()]
    freshers = [Fresher(fresher) for fresher in freshers.json()]

    if debug:
        print("Number of families: {}".format(len(families)))
        print("Number of unallocated freshers: {}".format(len(freshers)))

    # Blind dummy allocations
    dummy_allocate(families, freshers)

    if debug:
        for family in families:
            print(family)

    # Swaps and transfers need to occur here
    while True:
        # Sort families by score, and then start with lowest score family
        swapped = False
        families.sort(key=lambda x: x.score())
        for family_index in range(1, len(families)):
            current_family = families[-family_index]
            print(current_family.score())
            for kid in current_family.unallocated_kids:
                for potential_family in families:
                    transfer = transferrable(kid,
                                             current_family,
                                             potential_family)
                    if transfer:  # Do the swap/transfer and then break
                        if transfer is True:  # One way transfer:
                            pass
                        else:  # Swap
                            pass
                        swapped = True
                        break

        if not swapped:
            break

    # Construct allocations request to backend
    for family in families:
        for kid in family.unallocated_kids:
            print(family.id, kid.id)
