from django.contrib.auth.models import User
from django.core.management import BaseCommand

from todo_api.models import WebUser


class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        User.objects.create_superuser('drf', password='geekbrains')

        WebUser.objects.all().delete()
        for num in range(1, 6):
            WebUser.objects.create(username=f'user-{num}', email=f'user-{num}@mail.ru')

