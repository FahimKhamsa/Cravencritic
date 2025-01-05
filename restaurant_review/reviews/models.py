from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    contact_info = models.CharField(max_length=100)
    earned_points = models.IntegerField(default=0)
    review_status = models.CharField(max_length=20, choices=[('pending', 'Pending'), ('approved', 'Approved')], default='pending')
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Restaurant(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    contact_info = models.CharField(max_length=100)
    email = models.EmailField()
    cuisine_type = models.CharField(max_length=100)
    menu_photo = models.ImageField(upload_to='menu_photos/')
    representative = models.ForeignKey(User, on_delete=models.CASCADE)
    is_pending = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    review_text = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Review by {self.username}'