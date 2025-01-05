from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, RestaurantViewSet, ReviewViewSet, LoginView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'restaurants', RestaurantViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'), 
]