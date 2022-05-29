from django.shortcuts import render, get_object_or_404

from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from todo_api.models import WebUser
from todo_api.serializers import UserModelSerializer


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = WebUser.objects.all()
    serializer_class = UserModelSerializer
