exports.action = function(data, callback, config_local, SARAH_local){
	if (typeof SARAH_local != 'undefined') {
		Config = config_local;
		SARAH = SARAH_local;
	}
	
	maConfig = Config.modules.SpeechReco;

	var util = require('util');
	console.log("Appel de SpeechReco avec data: " + util.inspect(data, { showHidden: true, depth: null }));

	SARAH.context.SpeechReco.lastReco = data.reco;
	SARAH.context.SpeechReco.compteur++;
	
	console.log("SpeechReco: " + util.inspect(SARAH.context.SpeechReco, { showHidden: true, depth: null }));
	
	callback({'tts': "ok"});
}

exports.init = function(SARAH_local) {
	if (typeof SARAH_local != 'undefined') {
		SARAH = SARAH_local;	
	}
	
	SARAH.context.SpeechReco = {
		'compteur': 0,
		'lastReco': ''
	}
	
}