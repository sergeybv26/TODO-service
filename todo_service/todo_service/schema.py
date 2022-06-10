import graphene
from graphene_django import DjangoObjectType

from todo_api.models import WebUser
from todo_work.models import ToDo, Project


class TodoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class AuthorType(DjangoObjectType):
    class Meta:
        model = WebUser
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todo = graphene.List(TodoType)
    all_authors = graphene.List(AuthorType)
    all_projects = graphene.List(ProjectType)

    def resolve_all_todo(root, info):
        return ToDo.objects.all()

    def resolve_all_authors(root, info):
        return WebUser.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()


schema = graphene.Schema(query=Query)
