import pymongo
from django.conf import settings

client = pymongo.MongoClient(settings.MONGO_URI)
db = client[settings.MONGO_DB_NAME]

users_collection = db["users"]
issues_collection = db["issues"]
plantations_collection = db["plantations"]