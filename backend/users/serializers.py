from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'email', 'first_name', 'last_name', 'date_of_birth', 
            'profile_picture', 'profile_picture_url', 'affiliate_code', 'referral_count',
            'total_rewards', 'is_superuser', 'organization', 'role'
        )
        read_only_fields = ('id', 'affiliate_code', 'referral_count', 'total_rewards', 'organization', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    referrer_code = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ('email', 'password', 'referrer_code')

    def create(self, validated_data):
        referrer_code = validated_data.pop('referrer_code', None)
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password']
        )
        
        # Affiliate code generation
        import uuid
        user.affiliate_code = uuid.uuid4().hex[:8].upper()
        
        if referrer_code:
            try:
                referrer = User.objects.get(affiliate_code=referrer_code)
                referrer.referral_count += 1
                referrer.total_rewards += 10.0
                referrer.save()
            except User.DoesNotExist:
                pass
        
        user.save()
        return user
