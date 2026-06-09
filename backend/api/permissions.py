from rest_framework import permissions

class IsBasePlan(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        # Access plan via organization; default to 'base' if no org
        org = getattr(request.user, 'organization', None)
        plan = getattr(org, 'subscription_plan', 'base')
        return plan in ['base', 'pro', 'enterprise']

class IsProPlan(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        org = getattr(request.user, 'organization', None)
        plan = getattr(org, 'subscription_plan', 'base')
        return plan in ['pro', 'enterprise']

class IsEnterprisePlan(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        org = getattr(request.user, 'organization', None)
        plan = getattr(org, 'subscription_plan', 'base')
        return plan == 'enterprise'
