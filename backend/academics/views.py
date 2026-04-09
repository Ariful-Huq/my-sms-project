# backend/academics/views.py
from rest_framework import viewsets
from .models import *
from .serializers import *


class AcademicYearViewSet(viewsets.ModelViewSet):
    queryset = AcademicYear.objects.all()
    serializer_class = AcademicYearSerializer


class ClassLevelViewSet(viewsets.ModelViewSet):
    queryset = ClassLevel.objects.all()
    serializer_class = ClassLevelSerializer


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer


class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class ClassPeriodViewSet(viewsets.ModelViewSet):
    queryset = ClassPeriod.objects.all()
    serializer_class = ClassPeriodSerializer


class WorkingDayViewSet(viewsets.ModelViewSet):
    queryset = WorkingDay.objects.all()
    serializer_class = WorkingDaySerializer


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer


class InstitutionSettingsViewSet(viewsets.ModelViewSet):
    queryset = InstitutionSettings.objects.all()
    serializer_class = InstitutionSettingsSerializer

    # Logic to ensure only one settings object exists
    def get_object(self):
        obj, created = InstitutionSettings.objects.get_or_create(id=1)
        return obj
