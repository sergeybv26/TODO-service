from rest_framework.serializers import HyperlinkedModelSerializer

from todo_api.models import WebUser


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = WebUser
        fields = ['uid', 'url', 'username', 'firstname', 'lastname', 'email']
