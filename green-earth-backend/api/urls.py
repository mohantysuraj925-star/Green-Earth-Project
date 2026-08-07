from django.urls import path
from .views import register_user, login_user, admin_stats

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', login_user, name='login'),
    path('admin-stats/', admin_stats, name='admin_stats'),
]