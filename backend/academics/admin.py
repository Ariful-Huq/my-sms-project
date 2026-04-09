# backend/academics/admin.py
from django.contrib import admin
from .models import AcademicYear, ClassLevel, Section, Subject, ClassPeriod, WorkingDay, Exam


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    # Updated to match the new field names in your model
    list_display = (
        'name',
        'subject_code',
        'written_max_marks',
        'objective_max_marks',
        'practical_max_marks'
    )
    # Updated to match the new boolean toggle names
    list_filter = (
        'is_written_applicable',
        'is_objective_applicable',
        'is_practical_applicable'
    )
    search_fields = ('name', 'subject_code')


admin.site.register(AcademicYear)
admin.site.register(ClassLevel)
admin.site.register(Section)
admin.site.register(ClassPeriod)
admin.site.register(WorkingDay)
admin.site.register(Exam)
