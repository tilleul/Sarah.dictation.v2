Exp�rience avec SARAH et le moteur Speech Recognition de Google Chrome, 2e essai
================================================================================

Cette fois-ci le but est de pouvoir utiliser le Speech Recognition de Chrome avec les r�gles GARBAGE de Sarah (et donc SANS Google API et SANS la restriction � 50 utilisations par jour !)

Pr�requis
---------
- Sarah v3 (j'ai mis du code compatible v4 mais je n'ai pas test�)
- Google Chrome en derni�re version
- version r�cente de node.js (peut-�tre que la version livr�e avec Sarah suffit, je n'ai pas essay�)

Installation
------------
- copiez le contenu du r�pertoire plugins (et les deux plugins Sarah qu'il contient) dans le r�pertoire plugins de Sarah
- copiez le contenu du r�pertoire `serveur_https` quelque part sur votre disque dur
- dans une fen�tre DOS, acc�dez � ce r�pertoire et lancez `node speech_test.js`
- lancez Google Chrome et acc�dez � la page `https://127.0.0.1:4300` (<-- HTTPS !!)
- confirmez l'exception de s�curit�
- au besoin confirmez l'utilisation du micro
- lancez Sarah serveur et client
- dites "Sarah recherche histoire de France sur Wikip�dia" (ou n'importe quoi d'autre � rechercher)
- le plugin ne va pas r�ellement rechercher quoi que ce soit sur Wikip�dia mais aura reconnu (gr�ce � Google Chrome) ce que vous d�sireriez rechercher ...

Principe de fonctionnement
--------------------------
- le petit serveur node.js HTTPS est tr�s proche de la v1 de ces exp�riences sauf que lorsqu'une phrase est reconnue par google, elle est envoy�e telle quelle au plugin "SpeechReco" de Sarah
- le plugin SpeechReco ne fait rien (d'ailleurs il n'y a m�me pas de grammaire XML) sauf
  - incr�menter un compteur de phrases reconnues
  - stocker dans une variable Globale � tous les plugins la phrase reconnue
- normalement le plugin SpeechReco_test se d�clenche bien avant que Google ait fini la reconnaissance vocale car Sarah est (locale et) plus rapide.
- le plugin SpeechReco_test a une grammaire XML avec un GARBAGE mais SANS appel � Google API (dictation n'est pas utilis� et n'est m�me pas initialis� !)
- le plugin SpeechReco_test attend (jusqu'� 5 secondes) que Google Chrome ait activ� le plugin SpeechReco et utilise ensuite la m�me technique classique que celle utilis�e par JPEncausse dans la doc du wiki de Sarah

Avantages
---------
- PLUS DE LIMITATION A 50 UTILISATIONS !!
- vous pouvez utiliser le m�me principe (sans n�cessairement Garbage) pour r�cup�rer ce Chrome a compris A TOUT INSTANT ! 

Inconv�nients
-------------
- tributaire de Google Chrome (plantages ? comment les d�tecter, relancer Chrome, etc)
- d�pend de la qualit� de la connexion (vitesse, stabilit�, disponibilit� des serveurs Google etc)
- Chrome peut entendre la r�ponse de Sarah ou d'autres bruits et donc renvoyer quelques chose d'erron� (solution ? couper le micro ?)
- il faut (l�g�rement) r��crire les plugins qui utiliseraient la r�gle GARBAGE si on veut utiliser ce principe (il faut aussi r��crire le code de speech_test.js pour qu'il utilise un certificat SSL qui ne change pas � chaque lancement ... mais bon c'est une autre histoire)

