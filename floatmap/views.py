import os
import json
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponse

def map(request):
    context = {}
    return render_to_response("map.html",context,context_instance=RequestContext(request))

def floodzones(request):
    data = open(os.path.abspath('data/floodzones.geojson'))
    json_data = json.loads(data.read())
    return HttpResponse(json.dumps(json_data))

def extreme_precipitation(request):
    data = open(os.path.abspath('data/noaa_ex_precip.geojson'))
    json_data = json.loads(data.read())
    return HttpResponse(json.dumps(json_data))
