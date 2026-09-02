from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import bcrypt

from .models import UserAccount


# =========================================================
# REGISTER API
# Normal User + Volunteer
# =========================================================

@api_view(['POST'])
def register_user(request):
    data = request.data

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'user')

    # Required fields
    if not name or not email or not password:
        return Response(
            {"error": "सभी डिटेल्स भरें!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Normalize data
    name = str(name).strip()
    email = str(email).strip().lower()
    password = str(password)

    # Only user / volunteer allowed
    if role not in ['user', 'volunteer']:
        role = 'user'

    # Duplicate email check
    if UserAccount.objects.filter(email=email).exists():
        return Response(
            {"error": "यह ईमेल पहले से रजिस्टर्ड है!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode('utf-8'),
        bcrypt.gensalt()
    ).decode('utf-8')

    # Create account
    user = UserAccount.objects.create(
        name=name,
        email=email,
        password=hashed_password,
        role=role,
        trees_planted=0 if role == 'volunteer' else None,
    )

    return Response(
        {
            "message": f"{role.capitalize()} अकाउंट सफलता से बन गया!",
            "user": {
                "user_id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            }
        },
        status=status.HTTP_201_CREATED
    )


# =========================================================
# LOGIN API
# Normal User + Volunteer
# =========================================================

@api_view(['POST'])
def login_user(request):
    data = request.data

    email = data.get('email')
    password = data.get('password')

    # Required fields
    if not email or not password:
        return Response(
            {"error": "ईमेल और पासवर्ड दोनों भरें!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Normalize data
    email = str(email).strip().lower()
    password = str(password)

    # Find account
    user = UserAccount.objects.filter(email=email).first()

    if not user:
        return Response(
            {"error": "गलत ईमेल या पासवर्ड!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Check password
    try:
        password_correct = bcrypt.checkpw(
            password.encode('utf-8'),
            user.password.encode('utf-8')
        )
    except Exception:
        return Response(
            {"error": "पासवर्ड verify करने में समस्या हुई!"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    if not password_correct:
        return Response(
            {"error": "गलत ईमेल या पासवर्ड!"},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Successful login
    return Response(
        {
            "message": "लॉगिन सफल!",
            "user": {
                "user_id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
            }
        },
        status=status.HTTP_200_OK
    )