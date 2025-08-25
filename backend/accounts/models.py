# accounts/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"  # Use email to login
    REQUIRED_FIELDS = ["username"]  # username required for registration

    def __str__(self):
        return self.email
