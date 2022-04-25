from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from todo_api.models import WebUser
from todo_api.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = WebUser.objects.all()
    serializer_class = UserModelSerializer
