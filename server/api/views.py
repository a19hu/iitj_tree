from django.shortcuts import render
from django.http import HttpResponse
from .models import Student
import pandas as pd
import csv, io
from django.contrib import messages
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import StudentSerializer
# Create your views here.
from django.http import JsonResponse





class ResolveAllTreeNodes(APIView):
    def get(self, request, format=None):
     try:
        students = Student.objects.all()
        student_dict = {}
        root_nodes = []
        
        for student in students:
            student_dict[student.roll_no] = {
                'name': student,
                'roll_no': student.roll_no,
                'picture': student.picture,
                'children': []
            }
        
        for student_data in student_dict.values():
            if student_data['name'].parentId:
                parent_id = student_data['name'].parentId
                if student_dict.get(parent_id):
                    student_dict[parent_id]['children'].append(student_data)
                else:
                    print(f"Parent with ID {parent_id} not found for student with ID {student_data['roll_no']}")
                    root_nodes.append(student_data)
            else:
                root_nodes.append(student_data)
        
        def build_tree(node):
            serialized_node = {
                'rollNo': node['name'].roll_no,
                'name': node['name'].name,
                'parentId': node['name'].parentId,
                'picture': node['name'].picture,
                'children': [build_tree(child) for child in node['children']]
            }
            return serialized_node
        
        tree_data = [build_tree(node) for node in root_nodes]
        
        return JsonResponse(tree_data, status=200, safe=False)
     except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    

def index(request):
    return HttpResponse(" ")


def upload(request):
    # data = Profile.objects.all()
    data = Student.objects.all()
    prompt = {
        'order': 'Order of the CSV should be  roll_no,name,year,parentId,linkedIn,picture',
        'profiles': data    
              }
    if request.method == "GET":
        return render(request, 'excelImport.html', prompt)
    csv_file = request.FILES['file']
    if not csv_file.name.endswith('.csv'):
        messages.error(request, 'THIS IS NOT A CSV FILE')
    data_set = csv_file.read().decode('UTF-8')
    io_string = io.StringIO(data_set)
    print('hello')
    next(io_string)
    for column in csv.reader(io_string, delimiter=',', quotechar="|"):
       created = Student.objects.update_or_create(
        roll_no=column[0].upper(),
        name=column[1],
        year=column[2],
        parentId=column[3].upper(),
        linkedIn=column[4],
        picture=column[5],
        
       )
    
    return render(request, 'excelImport.html')