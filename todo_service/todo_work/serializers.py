from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer

from todo_api.serializers import UserModelSerializer
from todo_work.models import Project, ToDo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    authors = serializers.StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(HyperlinkedModelSerializer):
    project = serializers.StringRelatedField()
    author = UserModelSerializer()

    class Meta:
        model = ToDo
        fields = '__all__'
