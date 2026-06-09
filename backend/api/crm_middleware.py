import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger('crm_tracker')

class CRMTrackingMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        # Exemple : Tracer les conversions Stripe ou les accès au dashboard
        if request.user.is_authenticated:
            if request.path.startswith('/api/billing/'):
                logger.info(f"User {request.user.id} accessed billing: {request.path}")
            elif request.path.startswith('/api/data/'):
                logger.info(f"User {request.user.id} accessed data engine: {request.path}")
        return response
