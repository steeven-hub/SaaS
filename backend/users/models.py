from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class Organization(models.Model):
    name = models.CharField(max_length=255)
    owner = models.ForeignKey('User', on_delete=models.CASCADE, related_name='owned_organizations')
    subscription_plan = models.CharField(max_length=50, default="base")
    subscription_status = models.CharField(max_length=50, default="inactive")

    def __str__(self):
        return self.name

class User(AbstractUser):
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to='profiles/', null=True, blank=True)
    profile_picture_url = models.URLField(null=True, blank=True)
    affiliate_code = models.CharField(max_length=20, unique=True, null=True, blank=True)
    referral_count = models.IntegerField(default=0)
    stripe_customer_id = models.CharField(max_length=100, null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True, related_name='members')
    role = models.CharField(max_length=20, default="member") # owner, member
    total_rewards = models.FloatField(default=0.0)

    # Use email for login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def save(self, *args, **kwargs):
        if not self.affiliate_code:
            # Generate a unique code
            self.affiliate_code = uuid.uuid4().hex[:8].upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
