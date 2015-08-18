Expérience avec SARAH et le moteur Speech Recognition de Google Chrome, 2e essai
================================================================================

Cette fois-ci le but est de pouvoir utiliser le Speech Recognition de Chrome avec les règles GARBAGE de Sarah (et donc SANS Google API et SANS la restriction à 50 utilisations par jour !)

Prérequis
---------
- Sarah v3 (j'ai mis du code compatible v4 mais je n'ai pas testé)
- Google Chrome en dernière version
- version récente de node.js (peut-être que la version livrée avec Sarah suffit, je n'ai pas essayé)

Installation
------------
- copiez le contenu du répertoire plugins (et les deux plugins Sarah qu'il contient) dans le répertoire plugins de Sarah
- copiez le contenu du répertoire `serveur_https` quelque part sur votre disque dur
- dans une fenêtre DOS, accédez à ce répertoire et lancez `node speech_test.js`
- lancez Google Chrome et accédez à la page `https://127.0.0.1:4300` (<-- HTTPS !!)
- confirmez l'exception de sécurité
- au besoin confirmez l'utilisation du micro
- lancez Sarah serveur et client
- dites "Sarah recherche histoire de France sur Wikipédia" (ou n'importe quoi d'autre à rechercher)
- le plugin ne va pas réellement rechercher quoi que ce soit sur Wikipédia mais aura reconnu (grâce à Google Chrome) ce que vous désireriez rechercher ...

Principe de fonctionnement
--------------------------
- le petit serveur node.js HTTPS est très proche de la v1 de ces expériences sauf que lorsqu'une phrase est reconnue par google, elle est envoyée telle quelle au plugin "SpeechReco" de Sarah
- le plugin SpeechReco ne fait rien (d'ailleurs il n'y a même pas de grammaire XML) sauf
  - incrémenter un compteur de phrases reconnues
  - stocker dans une variable Globale à tous les plugins la phrase reconnue
- normalement le plugin SpeechReco_test se déclenche bien avant que Google ait fini la reconnaissance vocale car Sarah est (locale et) plus rapide.
- le plugin SpeechReco_test a une grammaire XML avec un GARBAGE mais SANS appel à Google API (dictation n'est pas utilisé et n'est même pas initialisé !)
- le plugin SpeechReco_test attend (jusqu'à 5 secondes) que Google Chrome ait activé le plugin SpeechReco et utilise ensuite la même technique classique que celle utilisée par JPEncausse dans la doc du wiki de Sarah

Avantages
---------
- PLUS DE LIMITATION A 50 UTILISATIONS !!
- vous pouvez utiliser le même principe (sans nécessairement Garbage) pour récupérer ce Chrome a compris A TOUT INSTANT ! 

Inconvénients
-------------
- tributaire de Google Chrome (plantages ? comment les détecter, relancer Chrome, etc)
- dépend de la qualité de la connexion (vitesse, stabilité, disponibilité des serveurs Google etc)
- Chrome peut entendre la réponse de Sarah ou d'autres bruits et donc renvoyer quelques chose d'erroné (solution ? couper le micro ?)
- il faut (légèrement) réécrire les plugins qui utiliseraient la règle GARBAGE si on veut utiliser ce principe (il faut aussi réécrire le code de speech_test.js pour qu'il utilise un certificat SSL qui ne change pas à chaque lancement ... mais bon c'est une autre histoire)

