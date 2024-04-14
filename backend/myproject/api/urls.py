from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ItemViewSet
from .views import CreateUserView

router = DefaultRouter()
router.register(r'items', ItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', CreateUserView.as_view(), name='signup'),
]
