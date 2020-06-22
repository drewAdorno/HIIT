from django.shortcuts import render, redirect,HttpResponse
import json

def index(request):
    if 'rest_time' not in request.session:
        request.session['rest_time'] = 0
    if 'workout_time' not in request.session:
        request.session['workout_time'] = 0
    if 'break_time' not in request.session:
        request.session['break_time'] = 0
    if 'training_array' not in request.session:
        request.session['training_array'] = []
    if 'exercise_name' not in request.session:
        request.session['exercise_name'] = []

    return render(request, 'index.html')

def exercise(request, exer_num, exercise_name):
    response_data={}
    response_data['result']= 'Success'
    

    if len(request.session['training_array']) < 6 and len(request.session['exercise_name']) < 6:
        request.session['training_array'].append(exer_num)
        request.session['exercise_name'].append(exercise_name)
        request.session.save()
    print(request.session['training_array'])
    response_data['data']=request.session['training_array']
    return HttpResponse(json.dumps(response_data), content_type='application/json')

def starttraning(request):
    request.session['rest_time'] = request.POST['rest_time']
    request.session['workout_time'] = request.POST['workout_time']
    request.session['break_time'] = request.POST['break_time']
    print(request.session['rest_time'])
    print(request.session['workout_time'] )
    print(request.session['break_time'])
    return redirect('/traning')

def traning(request):
    return render(request, 'traning.html')

def reset(request):
    request.session.clear()
    return redirect('/')









