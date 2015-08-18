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
- dites "Sarah recherche histoire de France sur Wikip�dia"

Principe de fonctionnement
--------------------------
- le petit serveur node.js HTTPS est tr�s proche de la v1 de ces exp�riences sauf que lorsqu'une phrase est reconnue par google, elle est envoy�e telle quelle au plugin "SpeechReco" de Sarah
- le plugin SpeechReco ne fait rien (d'ailleurs il n'y a m�me pas de grammaire XML) sauf
--* incr�menter un compteur de phrases reconnues
--* stocker dans une variable Globale � tous les plugins la phrase reconnue
- normalement le plugin SpeechReco_test se d�clenche bien avant que Google ait fini la reconnaissance vocale car Sarah est (locale et) plus rapide.
- le plugin SpeechReco_test a une grammaire XML avec un GARBAGE mais SANS appel � Google API (dictation n'est m�me pas initialis�)
- le plugin SpeechReco_test attend (jusqu'� 5 secondes) que Google Chrome ait activ� le plugin SpeechReco et utilise ensuite la m�me technique classique que celle utilis�e par JPEncausse dans la doc du wiki de Sarah
