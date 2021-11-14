---
layout: apprendre_post
permalink: /apprendre/about
title: "Apprendre à programmer"
---

Ce cours n'a pas d'autre ambition que de vous familiariser avec la programmation dans un environnement Web.

Après avec parcouru les différentes pages de ce tuto vous saurez développer des applications Web, les déployer sur un serveur
et les partager avec qui vous le souhaitez...

Ce cours contient les chapitres suivants:
<div class="course-week-list">
     <h2>Notes</h2>
     <ul>
       <li><a href="/apprendre/intro" class="body-link primary">Introduction - p5.js, JavaScript, and Strings</a></li>
     </ul>
 </div>


{% for c in sites.categories %}
{{c}}
{% if c[0]=='cours' %}
  {% for t in c[1] %}
    <h2>{{t.title}}</h2>
  {% endfor %}
{% endif %}
{% endfor %}
