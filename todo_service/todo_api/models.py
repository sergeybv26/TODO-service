from uuid import uuid4

from django.db import models


class WebUser(models.Model):
    uid = models.UUIDField(primary_key=True, default=uuid4)
    username = models.CharField(max_length=150, unique=True, verbose_name='Логин')
    firstname = models.CharField(max_length=150, blank=True, verbose_name='Имя пользователя')
    lastname = models.CharField(max_length=150, blank=True, verbose_name='Фамилия пользователя')
    email = models.EmailField(unique=True, verbose_name='email address')

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'

    def __str__(self):
        return f'{self.username}'
