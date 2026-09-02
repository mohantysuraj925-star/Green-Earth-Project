from django.db import models


class UserAccount(models.Model):
	name = models.CharField(max_length=150)
	email = models.EmailField(unique=True)
	password = models.CharField(max_length=128)
	role = models.CharField(max_length=20, default='user')
	trees_planted = models.PositiveIntegerField(null=True, blank=True)

	class Meta:
		ordering = ['id']
