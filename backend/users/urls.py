# backend/users/urls.py
from django.urls import path
from .views import get_user_profile

urlpatterns = [
    path('profile/', get_user_profile, name='user_profile'),
]
