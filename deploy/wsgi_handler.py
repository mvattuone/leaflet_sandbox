# complete_project.wsgi is configured to live in projects/complete_project/deploy.
# If you move this file you need to reconfigure the paths below.

import sys
from os.path import abspath, dirname, join
from os import environ

VIRTUAL_ENV_PATH = '/home/mike/sitebase/projects/leaflet_sandbox/venv/'
PROJECT_PATH = '/home/mike/sitebase/projects/leaflet_sandbox'

# redirect sys.stdout to sys.stderr for bad libraries like geopy that uses
# print statements for optional import exceptions.
sys.stdout = sys.stderr

activate_this = join(VIRTUAL_ENV_PATH, 'bin/activate_this.py')
execfile(activate_this, dict(__file__=activate_this))

import site
sys.path.insert(0, abspath(join(dirname(__file__), "..","..")))
sys.path.insert(0, abspath(join(dirname(__file__), "..")))

from django.core.handlers.wsgi import WSGIHandler
from django.conf import settings

environ["DJANGO_SETTINGS_MODULE"] = "settings"

sys.path.insert(0, PROJECT_PATH)

application = WSGIHandler()

