var token;
var interval = 100;		// msec
var repeat = 50;		// n x interval = timeout ... 50 x 100 = 5000 msec de timeout ...
var cnt = 0;
var cpt_initial;

exports.action = function(data, callback, config_local, SARAH_local){
	if (typeof SARAH_local != 'undefined') {
		Config = config_local;
		SARAH = SARAH_local;
	}
	
	maConfig = Config.modules.SpeechReco_test;
		
	var util = require('util');
	console.log("BEFORE LOG: " + util.inspect(data, { showHidden: true, depth: null }));

	// valeur initiale du compteur ...
	cpt_initial = SARAH.context.SpeechReco.compteur;
	
	token = setInterval(function() {checkSpeechReco(SARAH, callback)}, interval);
	

}

function checkSpeechReco(SARAH, callback) {
	var new_cpt = SARAH.context.SpeechReco.compteur;
	
	if (new_cpt != cpt_initial) {
		// aurait-on trouvé ?
		// le code qui suit vient directement de la doc wiki de JPEncausse
	
		var search = SARAH.context.SpeechReco.lastReco;
		console.log ("Search: " + search);
		// data.dictation returne toute la phrase dite par l'utilisateur
		var rgxp = /Sarah recherche (.+) sur Wikipédia/i;

		// on s'assure que Google a bien compris
		var match = search.match(rgxp);
		if (!match || match.length <= 1){
			console.log("FAIL");
			clearInterval(token);
			return callback({'tts': "Je ne comprends pas"});
		}

		// on peut maintenant s'occuper des mots qui sont recherchés
		search = match[1];
		clearInterval(token);
		console.log("Cnt: " + cnt);
		return callback({'tts': "Tu veux chercher "+search+" sur Wikipédia"});
	} else {
		// pas encore trouvé ...
		// est-on en timeout ?
		cnt+= interval;
		if (cnt> interval * repeat) {
			// on arrête ici ...
			clearInterval(token);
			return callback ({'tts':"Google Chrome n'a pas répondu assez vite"});
		}
		
	}
}