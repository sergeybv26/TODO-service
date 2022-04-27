from mimesis import Person
from django.contrib.auth.models import User
from django.core.management import BaseCommand

from todo_api.models import WebUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser('drf', password='geekbrains')

        WebUser.objects.all().delete()
        person = Person('ru')
        for num in range(20):
            WebUser.objects.create(
                username=person.username(),
                firstname=person.first_name(),
                lastname=person.last_name(),
                email=person.email())

