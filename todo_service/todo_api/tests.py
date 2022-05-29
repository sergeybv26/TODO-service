from mimesis import Person
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from todo_api.views import UserViewSet


class TestUserViewSet(TestCase):
    def test_get_user_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        person = Person('ru')
        username = person.username()
        firstname = person.first_name()
        lastname = person.last_name()
        email = person.email()
        password = person.password()
        request = factory.post('/api/users/', {
            'username': username,
            'firstname': firstname,
            'lastname': lastname,
            'email': email,
            'password': password
        }, format='json')
        view = UserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
