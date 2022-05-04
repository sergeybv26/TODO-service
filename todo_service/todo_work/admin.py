from django.contrib import admin

from todo_work.models import Project, ToDo

admin.site.register(Project)
admin.site.register(ToDo)
