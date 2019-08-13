import json

from models import Family, Fresher, Parent, Marriage

from pandas import DataFrame as Df

from matplotlib import pyplot as plt

from sklearn.cluster import KMeans

from datetime import datetime


def allocate_parents():

    parents = Parent.objects
    parents = list(parents)

    print(parents)

    pairs = list(zip(parents, parents[::-1][:(len(parents) // 2)]))

    if len(parents) % 2 == 1:
        pairs[-1] = pairs[-1] + (parents[(len(parents) // 2)],)

    print(pairs)

    for pair in pairs:
        marriage = Marriage(
            parents=list(pair),
            proposer=pair[0],
            proposee=pair[1]
        )
        marriage.save()


allocate_parents()


def allocate_and_save(freshers):
    kids = []

    for fresher in freshers:
        kids.append(fresher)
        if len(kids) == 4:
            family = Family(kids=kids)
            family.save()
            kids = []

# allocate_and_save(Fresher.objects)

# for family in Family.objects:
#     print()
#     print(family)
#     for kid in family.kids:
#         print(kid['student'])


def cluster():
    freshers = []

    for fresher in Fresher.objects:
        # fresher = json.loads(fresher.to_json())
        # print(json.dumps(fresher, indent=4))
        freshers.append(fresher.to_dict())
        print(json.dumps(fresher.to_dict(), indent=4))

    df = Df(freshers)

    df.set_index("shortcode", inplace=True)

    df = df[['alcohol', 'anime']]

    print(df)

    km = KMeans(n_clusters=2).fit(df)
    centroids = km.cluster_centers_

    plt.scatter(df['alcohol'], df['anime'],
                c=km.labels_.astype(float), s=50, alpha=0.5)
    plt.scatter(centroids[:, 0], centroids[:, 1], c='red', s=50)

    plt.show()
