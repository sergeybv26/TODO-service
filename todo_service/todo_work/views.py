from django.shortcuts import render
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from todo_work.filters import ProjectFilter
from todo_work.models import Project, ToDo
from todo_work.serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all().select_related()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectLimitOffsetPagination
    filterset_class = ProjectFilter


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all().select_related()
    serializer_class = ToDoModelSerializer
    pagination_class = TodoLimitOffsetPagination

    def get_queryset(self):
        project = self.request.query_params.get('project', '')

        if project:
            return ToDo.objects.filter(project__name__contains=project)
        return super().get_queryset()

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()
