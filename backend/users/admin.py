from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Organization

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'username', 'organization', 'is_staff', 'is_superuser']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('date_of_birth', 'profile_picture', 'affiliate_code', 'referral_count', 'stripe_customer_id', 'organization', 'role', 'total_rewards')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('email', 'date_of_birth', 'profile_picture', 'affiliate_code', 'referral_count', 'stripe_customer_id', 'organization', 'role', 'total_rewards')}),
    )

admin.site.register(User, CustomUserAdmin)
admin.site.register(Organization)
