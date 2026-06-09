from django.urls import path
from .views_billing import CreateCheckoutSessionView, StripeWebhookView
from .views_admin import AdminKPIsView
from .views_data import FileUploadView, UploadDemoView, AIInsightsView, GeneratePDFView
from .views_connectors import ConnectSourceView
from .views_dashboard import LicensesView, InvoicesView, DownloadsView
from .views_affiliate import AffiliateStatsView
from .views_hackathon import FeatureEngineeringView
from .views_validator import SubmissionValidatorView
from .views_teams import TeamMembersView
from .views import ValidationHistoryView

urlpatterns = [
    path('billing/create-checkout-session', CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    path('webhooks/stripe', StripeWebhookView.as_view(), name='stripe_webhook'),
    path('admin/kpis', AdminKPIsView.as_view(), name='admin_kpis'),
    path('data/upload', FileUploadView.as_view(), name='data_upload'),
    path('data/upload-demo', UploadDemoView.as_view(), name='data_upload_demo'),
    path('data/ai-insights', AIInsightsView.as_view(), name='ai_insights'),
    path('data/generate-pdf', GeneratePDFView.as_view(), name='generate_pdf'),
    path('connectors/connect', ConnectSourceView.as_view(), name='connect_source'),
    path('dashboard/licenses', LicensesView.as_view(), name='dashboard_licenses'),
    path('dashboard/invoices', InvoicesView.as_view(), name='dashboard_invoices'),
    path('dashboard/downloads', DownloadsView.as_view(), name='dashboard_downloads'),
    path('affiliate/stats', AffiliateStatsView.as_view(), name='affiliate_stats'),
    path('hackathon/feature-engineering', FeatureEngineeringView.as_view(), name='feature_engineering'),
    path('hackathon/validate-submission', SubmissionValidatorView.as_view(), name='validate_submission'),
    path('hackathon/history', ValidationHistoryView.as_view(), name='validation_history'),
    path('teams/members', TeamMembersView.as_view(), name='team_members'),
]
