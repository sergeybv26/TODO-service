from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models


class WebUser(AbstractUser):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    firstname = models.CharField(max_length=150, blank=True, verbose_name='Имя пользователя')
    lastname = models.CharField(max_length=150, blank=True, verbose_name='Фамилия пользователя')

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'

    def __str__(self):
        return f'{self.username}'
