# backend/academics/serializers.py
from rest_framework import serializers
from .models import AcademicYear, ClassLevel, Section, Subject, ClassPeriod, WorkingDay, Exam, InstitutionSettings


class AcademicYearSerializer(serializers.ModelSerializer):
    class Meta:
        model = AcademicYear
        fields = '__all__'


class ClassLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassLevel
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Section
        fields = '__all__'


class SubjectSerializer(serializers.ModelSerializer):
    total_marks = serializers.ReadOnlyField()  # Calculated field from our model

    class Meta:
        model = Subject
        fields = '__all__'


class ClassPeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassPeriod
        fields = '__all__'


class WorkingDaySerializer(serializers.ModelSerializer):
    day_display = serializers.CharField(
        source='get_day_display', read_only=True)

    class Meta:
        model = WorkingDay
        fields = '__all__'


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'


class InstitutionSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstitutionSettings
        fields = '__all__'
