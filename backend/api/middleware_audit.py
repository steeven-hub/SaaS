from .models_audit import AuditLog

class AuditMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Log critical actions
        try:
            if request.user.is_authenticated and request.method in ['POST', 'PUT', 'DELETE']:
                AuditLog.objects.create(
                    user=request.user,
                    action=f"{request.method} {request.path}",
                    endpoint=request.path,
                    ip_address=self.get_client_ip(request)
                )
        except Exception as e:
            print(f"AUDIT LOG ERROR: {str(e)}")
            
        return response

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR')
