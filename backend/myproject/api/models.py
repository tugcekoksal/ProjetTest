from django.db import models
from django.contrib.auth.models import User


class Item(models.Model):
    title = models.CharField(max_length=100)
    completed = models.BooleanField(default=False)

    owner = models.ForeignKey(User, related_name='items', on_delete=models.CASCADE, null=True)


    def __str__(self):
        return self.title
