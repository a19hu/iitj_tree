from django.db import models

# Create your models here.
class Student(models.Model):
    name= models.CharField(max_length=50)
    roll_no= models.CharField(max_length=9,unique=True)
    year= models.CharField(max_length=4)
    # picture= models.URLField(max_length=200, blank=True,null=True)
    picture=models.ImageField(upload_to='images/')
    parentId= models.CharField(max_length=400,  default=None, blank=True, null=True)
    linkedIn= models.URLField(max_length=200, blank=True,null=True)
    # def __str__(self):
    #     return self.roll_no,
