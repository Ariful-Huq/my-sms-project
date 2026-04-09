# backend/api/v1/urls.py
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from users.serializers import MyTokenObtainPairView

urlpatterns = [
    # JWT Auth
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Apps
    path('users/', include('users.urls')),
    # When you create the school app, you'll just add:
    # path('school/', include('school.urls')),
    path('academics/', include('academics.urls')),
]
