from django.test import TestCase
from myproject.api.models import Item

class ItemModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        Item.objects.create(title='Test Item', completed=False)

    def test_title_content(self):
        item = Item.objects.get(id=1)
        expected_object_name = f'{item.title}'
        self.assertEquals(expected_object_name, str(item))

    def test_completed_content(self):
        item = Item.objects.get(id=1)
        self.assertEquals(item.completed, False)