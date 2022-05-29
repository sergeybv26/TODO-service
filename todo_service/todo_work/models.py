from uuid import uuid4

from django.db import models

from todo_api.models import WebUser


class Project(models.Model):
    """Модель сущности Проект"""
    uid = models.UUIDField(primary_key=True, default=uuid4)
    name = models.CharField(max_length=255, unique=True, verbose_name='Наименование проекта')
    git_url = models.URLField(max_length=512, verbose_name='Ссылка на страницу GitHub')
    authors = models.ManyToManyField(WebUser, related_name='authors_project', verbose_name='Авторы проекта')

    def __str__(self):
        return f'{self.name}'


class ToDo(models.Model):
    """Модель сущности Заметка"""
    uid = models.UUIDField(primary_key=True, default=uuid4)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='todo_project', verbose_name='Проект')
    text = models.CharField(max_length=1024, verbose_name='Текст заметки')
    author = models.ForeignKey(WebUser, on_delete=models.CASCADE, related_name='todo_user', verbose_name='Автор')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Создана')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Обновлена')
    is_active = models.BooleanField(default=True, verbose_name='Активна')
