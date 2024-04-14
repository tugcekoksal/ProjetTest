from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        # fields = '__all__'
        fields = ['id', 'title', 'completed', 'owner']
        read_only_fields = ('owner',)

    def create(self, validated_data):
        validated_data['owner'] = self.context['request'].user
        return super().create(validated_data)
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'password']  
        extra_kwargs = {
            'username': {'required': True},
            # 'email': {'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user