from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from todo_api.models import WebUser
from todo_api.serializers import UserModelSerializer
from todo_work.models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    authors = serializers.SlugRelatedField(slug_field='username', many=True, queryset=WebUser.objects.all())

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = serializers.SlugRelatedField(slug_field='name', queryset=Project.objects.all())
    author = serializers.SlugRelatedField(slug_field='username', queryset=WebUser.objects.all())

    class Meta:
        model = ToDo
        fields = '__all__'
