from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from todo_work.models import Project, ToDo
from todo_work.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all().select_related()
    serializer_class = ProjectModelSerializer


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all().select_related()
    serializer_class = ToDoModelSerializer
