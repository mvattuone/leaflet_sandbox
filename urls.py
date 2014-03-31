from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'floatmap.views.map', name='map'),
    url(r'/searchs^$', 'floatmap.views.search', name='search'),

    url(r'^admin/', include(admin.site.urls)),
)
