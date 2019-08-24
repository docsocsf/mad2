from mongoengine import connect

from allocator.models.fresher import Fresher
from allocator.models.family import Family
from allocator.models.interests import Interests
from allocator.models.marriage import Marriage
from allocator.models.marriage_status import MarriageStatus
from allocator.models.parent import Parent
from allocator.models.student import Student

db = connect(db='demo', host='mongodb://localhost:27017')

