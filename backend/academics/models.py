# backend/academics/models.py
from django.db import models


class AcademicYear(models.Model):
    year = models.CharField(max_length=9, unique=True)  # e.g., "2025-2026"
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.year


class ClassLevel(models.Model):  # "Class" is a reserved word in Python
    name = models.CharField(max_length=50, unique=True)  # e.g., "Class 10"
    numeric_value = models.IntegerField()  # e.g., 10 (for sorting)

    def __str__(self):
        return self.name


class Section(models.Model):
    name = models.CharField(max_length=50)  # e.g., "A" or "Science"
    classroom_number = models.CharField(max_length=20, blank=True, null=True)
    capacity = models.IntegerField(default=40)

    def __str__(self):
        return self.name


class Subject(models.Model):
    name = models.CharField(max_length=100)
    subject_code = models.CharField(max_length=20)

    # Written
    is_written_applicable = models.BooleanField(default=True)
    written_max_marks = models.PositiveIntegerField(
        default=100, blank=True, null=True)

    # Objective (MCQ)
    is_objective_applicable = models.BooleanField(default=False)
    objective_max_marks = models.PositiveIntegerField(
        default=0, blank=True, null=True)

    # Practical
    is_practical_applicable = models.BooleanField(default=False)
    practical_max_marks = models.PositiveIntegerField(
        default=0, blank=True, null=True)

    def total_marks(self):
        total = 0
        if self.is_written_applicable:
            total += self.written_max_marks
        if self.is_objective_applicable:
            total += self.objective_max_marks
        if self.is_practical_applicable:
            total += self.practical_max_marks
        return total


class ClassPeriod(models.Model):
    PERIOD_TYPES = [
        ('CLASS', 'Regular Class'),
        ('BREAK', 'Lunch/Prayer Break'),
    ]

    period_name = models.CharField(max_length=50)  # e.g., "1st Period"
    period_type = models.CharField(
        max_length=10, choices=PERIOD_TYPES, default='CLASS')
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        ordering = ['start_time']

    def __str__(self):
        return f"{self.period_name} ({self.start_time.strftime('%I:%M %p')})"


class WorkingDay(models.Model):
    DAYS_OF_WEEK = [
        ('SUN', 'Sunday'), ('MON', 'Monday'), ('TUE', 'Tuesday'),
        ('WED', 'Wednesday'), ('THU', 'Thursday'),
        ('FRI', 'Friday'), ('SAT', 'Saturday'),
    ]
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK, unique=True)
    is_holiday = models.BooleanField(default=False)

    def __str__(self):
        return self.get_day_display()


class Exam(models.Model):
    name = models.CharField(max_length=100)  # e.g., "First Term Exam"
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.name} - {self.academic_year.year}"


class InstitutionSettings(models.Model):
    school_name = models.CharField(max_length=255, default="My School ERP")
    eiin_number = models.CharField(max_length=20, blank=True, null=True)
    active_academic_year = models.ForeignKey(
        AcademicYear, on_delete=models.SET_NULL, null=True, blank=True)
    school_start_time = models.TimeField(default="10:00")
    school_end_time = models.TimeField(default="16:00")

    class Meta:
        verbose_name = "Institution Setting"
        verbose_name_plural = "Institution Settings"

    def __str__(self):
        return self.school_name
