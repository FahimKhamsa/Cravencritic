from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Restaurant, Review

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'contact_info', 'earned_points', 'review_status', 'password', 'is_superuser', 'date_joined']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'contact_info', 'email', 'cuisine_type', 'menu_photo', 'representative', 'is_pending']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'restaurant', 'user', 'username', 'review_text', 'rating', 'created_at']