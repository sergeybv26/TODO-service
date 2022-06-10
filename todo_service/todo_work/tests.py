from django.test import TestCase
from mimesis import Person
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APITestCase

from todo_api.models import WebUser
from todo_work.models import Project, ToDo


class TestProjectModelViewSet(TestCase):
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
        project = Project.objects.create(name='new_proj')
        project.authors.add(user)

    def test_proj_detail(self):
        project = Project.objects.get(name='new_proj')
        client = APIClient()

        response = client.get(f'/api/projects/{project.uid}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_proj_edit_guest(self):
        project = Project.objects.get(name='new_proj')
        client = APIClient()
        response = client.put(f'/api/projects/{project.uid}/', {'name': 'super_proj'})

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_proj_edit_admin(self):
        project = Project.objects.get(name='new_proj')
        client = APIClient()

        response_token = client.post('/api-token-auth/', {'username': 'drf', 'password': 'geekbrains'})
        token_dict = response_token.data
        token = token_dict.get('token')

        client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        response = client.patch(f'/api/projects/{project.uid}/', {'name': 'super_proj'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(pk=project.uid)
        self.assertEqual(project.name, 'super_proj')


class TestTodoViewSet(APITestCase):
    def setUp(self) -> None:
        admin = WebUser.objects.create_superuser('drf', password='geekbrains')

    def test_get_todo(self):
        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_todo_admin(self):
        response_token = self.client.post('/api-token-auth/', {'username': 'drf', 'password': 'geekbrains'})
        token_dict = response_token.data
        token = token_dict.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        response = self.client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_mixer_admin(self):
        todo = mixer.blend(ToDo)
        response_token = self.client.post('/api-token-auth/', {'username': 'drf', 'password': 'geekbrains'})
        token_dict = response_token.data
        token = token_dict.get('token')

        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        response = self.client.patch(f'/api/todo/{todo.uid}/', {'text': 'bla-bla-bla'})

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        todo = ToDo.objects.get(uid=todo.uid)
        self.assertEqual(todo.text, 'bla-bla-bla')
