import numpy as np

from itertools import combinations

from allocator.models import Fresher, Family


def update_families(families):
    for family in families:
        update_family(family)


def update_family(family):
    family.score_children()
    family.calculate_children_mean()
    family.sort_children()


def should_swap(current_kid, old_family, worst_kid, new_family):

    old_family_kids = old_family.kids.copy()
    new_family_kids = new_family.kids.copy()

    new_family_kids.remove(worst_kid)
    new_family_kids.append(current_kid)

    old_family_kids.remove(current_kid)
    old_family_kids.append(worst_kid)

    def score_kids(kids):
        pairs = list(combinations(kids, 2))
        vectors = [list(map(lambda x: x.interests_vector(), pair)) for pair in pairs]
        distances = [np.linalg.norm(pair[0] - pair[1])
                     for pair in vectors]
        return sum([distance ** 2 for distance in distances]) / len(kids)

    if score_kids(old_family_kids) < old_family.children_score and \
            score_kids(new_family_kids) < new_family.children_score:
        print("Swap has been deemed appropriate")
        print("Old Scores: {} {}".format(old_family.children_score, new_family.children_score))
        print("New Scores: {} {}".format(score_kids(old_family_kids), score_kids(new_family_kids)))
        print()
        return True
    else:
        return False


def swaps():
    families = list(Family.objects)
    no_swaps = 0
    first_run = True
    update_families(families)
    while no_swaps > 0 or first_run:
        no_swaps = 0
        first_run = False
        for family_index in range(1, len(families)):
            current_family = families[-family_index]
            for child_index in range(1, len(current_family.kids)):
                current_child = current_family.kids[-child_index]
                by_distance = families.copy()
                by_distance.sort(key=lambda x: \
                    np.linalg.norm(current_child.interests_vector() - x.children_mean))

                swapped_child = False

                for family in by_distance:
                    if family is current_family:
                        continue

                    for swappable_kid in family.kids:
                        if should_swap(current_child, current_family, swappable_kid, family):

                            """ Swap """
                            family.kids.remove(swappable_kid)
                            family.kids.append(current_child)
                            update_family(family)

                            current_family.kids.remove(current_child)
                            current_family.kids.append(swappable_kid)
                            update_family(current_family)

                            swapped_child = True
                            no_swaps += 1
                            break
                        else:
                            swapped_child = False

                    if swapped_child:
                        break

        update_families(families)
        families.sort(key=lambda x: x.children_score)
        print(list(map(lambda x: x.children_score, families)))

    families.sort(key=lambda x: x.children_score)
    print(list(map(lambda x: x.interests_vector(), families[-1].kids)))

    for family in families:
        family.save()


swaps()
