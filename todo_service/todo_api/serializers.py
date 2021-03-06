from rest_framework.serializers import ModelSerializer

from todo_api.models import WebUser


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = WebUser
        fields = ['uid', 'username', 'firstname', 'lastname', 'email']


class UserModelExtendedSerializer(ModelSerializer):
    class Meta:
        model = WebUser
        fields = ['uid', 'username', 'firstname', 'lastname', 'email', 'is_superuser', 'is_staff']
