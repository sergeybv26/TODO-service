from django.shortcuts import render, get_object_or_404

from rest_framework import mixins
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from todo_api.models import WebUser
from todo_api.serializers import UserModelSerializer


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = WebUser.objects.all()
    serializer_class = UserModelSerializer

    # def list(self, request):
    #     users = WebUser.objects.all()
    #     serializer = UserModelSerializer(users, many=True)
    #     return Response(serializer.data)
    #
    # def retrieve(self, request, pk=None):
    #     user = get_object_or_404(WebUser, pk=pk)
    #     serializer = UserModelSerializer(user)
    #     return Response(serializer.data)
    #
    # def update(self, request, pk=None):
    #     user = get_object_or_404(WebUser, pk=pk)
    #     serializer = UserModelSerializer(user)
    #     return Response(serializer.data)
    #
    # def partial_update(self, request, pk=None):
    #     user = get_object_or_404(WebUser, pk=pk)
    #     serializer = UserModelSerializer(user)
    #     return Response(serializer.data)
