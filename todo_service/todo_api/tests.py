from mimesis import Person
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate
from rest_framework_simplejwt.views import TokenObtainPairView

from todo_api.models import WebUser
from todo_api.views import UserViewSet


class TestUserViewSet(TestCase):

    def setUp(self) -> None:
        admin = WebUser.objects.create_superuser('drf', password='geekbrains')
        person = Person('ru')
        username = person.username()
        firstname = person.first_name()
        lastname = person.last_name()
        email = person.email()
        password = person.password()
        user = WebUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            firstname=firstname,
            lastname=lastname
        )

    def test_get_user_list(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users/')
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        user = WebUser.objects.all()[1]
        request = factory.put(f'/api/users/{user.uid}/', {
            'firstname': 'Иван',
            'lastname': 'Иванов',
        }, format='json')
        view = UserViewSet.as_view({'put': 'update'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        factory = APIRequestFactory()
        user = WebUser.objects.all()[1]
        admin = WebUser.objects.get(username='drf')
        request_token = factory.post('/api/token/',
                                     {
                                         'username': admin.username,
                                         'password': 'geekbrains'
                                     }
                                     )
        view_token = TokenObtainPairView.as_view()
        response_token = view_token(request_token)
        token_dict = response_token.data
        token = token_dict.get('access')
        request = factory.patch(f'/api/users/{user.uid}/', {
            'firstname': 'Иван',
            'lastname': 'Иванов',
        }, format='json')
        # force_authenticate(request, user=admin, token=token)
        # view = UserViewSet.as_view({'patch': 'update'})
        # response = view(request)
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
