---
layout: apprendre_post
permalink: /apprendre/intro
title: "Apprendre à programmer"
categories: cours
---

Commençons par faire un premier tour d'horizon de tous les concepts et outils nécessaires pour développer une application pour le `Web`.
## Le Web
Pas besoin d'entrée dans le détail mais l'outil principal pour pouvoir utiliser votre application c'est un Navigateur Web.
* Chrome : sur PC, Mac et mobile ...
* Firefox : sur PC, Mac et mobile ...
* Safari : pour les Mac, les iPhone enfin tous les produits Apple
* IE : ou edge ou je ne sais pas ... de toute façon votre application ne marchera pas avec ce navigateur !
## Un protocole HTTP/HTTPS une Adresse
Pour pouvoir accéder à votre application `Web` il faudra lui donner une adresse qui devra utiliser un des 2 protoles de communication `HTTP` ou `HTTPS`, le 'S' signifiant sécuriser. Dans ce dernier tous les échanges de données entre le navigateur qui se trouve sur votre ordinateur et le serveur ou se trouve votre application Web est codé ... sinon c'est en clair. Dans notre cas cela n'a pas d'importance, en revanche dès que vous consulter des informations privées au travers d'un navigateur il faut vous assurer que vous utilisez le protocole `HTTPS` sinon arrêter immédiatement !
# Les Langages
## JavaScript
C'est le corps principal de ce tuto.
## HTML / CSS
Pour commencer ce cours il faut avoir des bases sur le langage HTML.
# L'environnement
Pour pouvoir développer sereinement vous avez besoin d'un environnement de travail sur votre ordinateur individuel que désormais j'appellerai votre Mac (désolé pour les possesseurs de PC).
Donc sur votre `Mac` il vous faudra installer les logiciels suivants : un `serveur Web local`, un `éditeur` et bien évidemment un `navigateur` et un `hébergeur`.
## L'Editeur : ATOM
Pour vous le choix est multiple, vous pouvez vous contenter de l'éditeur de texte de votre Mac ou même le bon vieux `vi`. Pour un choix plus sophistiqué il y a Xcode déjà présent sur le Mac, sinon il vous faudra en télécharger un autre et moi je vous conseille <a href="https://www.sublimetext.com/">Sublime Text</a> ou alors faite comme moi et prenez <a href="https://atom.io/">Atom</a>.
Je ne pense pas utile de vous expliquer comment installer ces logiciels ceci est très bien expliqué sur les sites des éditeurs.
Si vous optez pour Atom, pensez à un installer un plugin pour Javascript.
## Le serveur
Vous avez besoin d'un serveur local pour pouvoir lancer votre application dans le navigateur de votre Mac et ce en toute autonomie ou dans le langage web en mode local !
Sur Mac vous avez déjà un serveur Web grace à une version 2.7 de Python. Pour lancer le serveur Web c'est très simple on lance un mode `Terminal`.
{% highlight javascript %}
 <espace>
Terminal
{% endhighlight %}
et puis à l'invite du prompt (oui c'est comme cela que ça s'appelle)
{% highlight javascript %}
eCoucou / %
eCoucou / %python -m SimpleHTTPServer 8080
{% endhighlight %}
Cette commande aura pour action ce lancer un serveur Web localement sur le port 8080 dans le répertoire ou vous vous trouvez. Celà signifie désormais que si vous taper http://127.0.0.1:8080 dans votre navigateur favoris, ce dernier ouvrira le fichier index.html qui doit se trouver dans le répertoire ou vous avez exécutez précédemment le serveur Web !
Heusement vous avez déjà un éditeur de texte et donc vous pourrez très bientôt écrire le premier index.html et l'exécuter sur le votre Mac.
## L'hébergeur : GitHub
C'est gentil de pouvoir faire fonctionner votre application Web en mode local, mais pouvoir le consulter depuis n'importe où depuis n'importe quel ordinateur, téléphone, ... ce serait vraiment mieux !
Le plus simple et le moins cher (Gratuit) c'est <a href="https://github.com/">GitHub</a>. Rendez-vous sur leur site et créé vous un compte.
