from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import bcrypt
from .db import users_collection

# 1. SIGNUP API (Normal User & Volunteer)
@api_view(['POST'])
def register_user(request):
    data = request.data
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')  # 'user' or 'volunteer'

    if not name or not email or not password:
        return Response({"error": "सभी डिटेल्स भरें!"}, status=status.HTTP_400_BAD_REQUEST)

    if users_collection.find_one({"email": email}):
        return Response({"error": "यह ईमेल पहले से रजिस्टर्ड है!"}, status=status.HTTP_400_BAD_REQUEST)

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    user_data = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "role": role,
        "trees_planted": 0 if role == 'volunteer' else None
    }

    users_collection.insert_one(user_data)
    return Response({"message": f"{role.capitalize()} अकाउंट सफलता से बन गया!"}, status=status.HTTP_201_CREATED)


# 2. LOGIN API (Admin, Volunteer, Normal User)
@api_view(['POST'])
def login_user(request):
    data = request.data
    email_or_username = data.get('email')
    password = data.get('password')

    # ADMIN SPECIAL LOGIN CHECK
    if email_or_username == 'admin' and password == 'admin12345678910':
        return Response({
            "message": "एडमिन लॉगिन सफल!",
            "user": {
                "name": "Super Admin",
                "email": "admin@greenearth.com",
                "role": "admin"
            }
        }, status=status.HTTP_200_OK)

    # NORMAL USER & VOLUNTEER CHECK
    user = users_collection.find_one({"email": email_or_username})
    if not user:
        return Response({"error": "गलत ईमेल/यूज़रनेम या पासवर्ड!"}, status=status.HTTP_400_BAD_REQUEST)

    if bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return Response({
            "message": "लॉगिन सफल!",
            "user": {
                "name": user['name'],
                "email": user['email'],
                "role": user['role']
            }
        }, status=status.HTTP_200_OK)
    
    return Response({"error": "गलत ईमेल/यूज़रनेम या पासवर्ड!"}, status=status.HTTP_400_BAD_REQUEST)


# 3. ADMIN DASHBOARD STATS API (Only for Admin)
@api_view(['GET'])
def admin_stats(request):
    total_users = users_collection.count_documents({"role": "user"})
    total_volunteers = users_collection.count_documents({"role": "volunteer"})
    
    all_users = list(users_collection.find({}, {"_id": 0, "password": 0}))

    return Response({
        "total_users": total_users,
        "total_volunteers": total_volunteers,
        "users_list": all_users
    }, status=status.HTTP_200_OK)