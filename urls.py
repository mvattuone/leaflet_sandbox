from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'floatmap.views.map', name='map'),
    url(r'^search/$', 'floatmap.views.search', name='search'),
    url(r'^floodzones/$', 'floatmap.views.floodzones', name='floodzones'),
    url(r'^extreme_precipitation/$', 'floatmap.views.extreme_precipitation', name='extreme_precipitation'),
    url(r'^admin/', include(admin.site.urls)),
)
