"""todo_service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from graphene_django.views import GraphQLView
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from todo_api.views import UserViewSet
from todo_work.views import ProjectModelViewSet, ToDoModelViewSet

schema_view = get_schema_view(
    openapi.Info(
        title='TODO API',
        default_version='0.0.1',
        description='Documentation to project TODO API',
        contact=openapi.Contact(email='user@test.ru'),
        license=openapi.License(name='MIT license'),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

router = DefaultRouter()
router.register('users', UserViewSet, basename='users')
router.register('projects', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', obtain_auth_token),
    path('api/', include(router.urls)),
    re_path(r'^api/(?P<version>\d\.\d\.\d)/users/$', UserViewSet.as_view({'get': 'list'})),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView, name='token_refresh'),
    path('graphql/', GraphQLView.as_view(graphiql=True)),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
