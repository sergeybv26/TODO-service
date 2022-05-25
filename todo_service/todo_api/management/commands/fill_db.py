from mimesis import Person
from django.core.management import BaseCommand

from todo_api.models import WebUser


class Command(BaseCommand):
    def handle(self, *args, **options):

        WebUser.objects.all().delete()
        WebUser.objects.create_superuser('drf', password='geekbrains')
        person = Person('ru')
        for num in range(20):
            WebUser.objects.create_user(
                username=person.username(),
                firstname=person.first_name(),
                lastname=person.last_name(),
                email=person.email(),
                password='geek_user')

