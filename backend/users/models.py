# backend/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        SCHOOL_ADMIN = "SCHOOL_ADMIN", "School Admin"
        TEACHER = "TEACHER", "Teacher"
        STUDENT = "STUDENT", "Student"
        ACCOUNTANT = "ACCOUNTANT", "Accountant"
        STAFF = "STAFF", "Staff"

    # Set the default role to STAFF or STUDENT depending on your preference
    base_role = Role.STAFF

    role = models.CharField(
        max_length=50,
        choices=Role.choices,
        default=base_role
    )

    # Common fields for all users
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.pk:
            # You can add logic here to auto-assign roles if needed
            pass
        return super().save(*args, **kwargs)


class StudentProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='student_profile')
    student_id = models.CharField(max_length=20, unique=True)
    # Use a Foreign Key to a "Class" model later
    class_name = models.CharField(max_length=50)


class TeacherProfile(models.Model):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name='teacher_profile')
    employee_id = models.CharField(max_length=20, unique=True)
    subject_specialty = models.CharField(max_length=100)
