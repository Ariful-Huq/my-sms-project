# backend/academics/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'years', AcademicYearViewSet)
router.register(r'classes', ClassLevelViewSet)
router.register(r'sections', SectionViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'periods', ClassPeriodViewSet)
router.register(r'working-days', WorkingDayViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'institution-settings',
                InstitutionSettingsViewSet, basename='institution-settings')

urlpatterns = [
    path('', include(router.urls)),
]
