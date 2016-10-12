# Project initialization

npm install
bower install

# Launch Project

gulp Launch -> launch project on port 8080



/////////////////////////////////////
////////// GLOBAL WORKFLOW //////////
/////////////////////////////////////

La première étape est de récupérer votre identifiant. C'est un paramètre obligatoire pour l'ensemble des méthodes de l'API.

La seconde étape est la récupération d'une partie, différente en mode versus et en mode practice (respectivement NextGame et NewGame). Cette méthode vous donne l'identifiant de la partie à laquelle vous allez jouer. C'est le second paramètre obligatoire pour une partie des méthodes de l'API.

Une fois la partie démarrée, il suffit de la jouer par une répétition des étapes suivantes :

Demander le statut de la partie et attendre son tour
Demander l'état du plateau (éventuellement le dernier coup joué)
Jouer son coup
Vous avez la possibilité, à tout moment durant une partie, de demander le nom de l'équipe à laquelle vous êtes opposé et le dernier coup joué.