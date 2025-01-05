from django.contrib import admin
from .models import User, Admin, Restaurant, Review

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Restaurant)
admin.site.register(Review)