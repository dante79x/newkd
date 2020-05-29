var translations = {
		
		QMS_SERVICE_NAME: 'Nazwa usługi',
		QMS_COUNT_WAITING: 'Liczba oczekujących',
		QMS_AVG_WAITING_TIME: 'Średni czas oczekiwania',
		QMS_NO_APPLICANTS: 'Brak oczekujących',
                QMS_NO_DATA: 'Brak danych',
                QMS_DEPARTMENT_NAME: 'Nazwa działu',
                QMS_LAST_CALL_TICKET: 'Ostatnio wezwany',
                QMS_LAST_TICKET_NOT_EXIST: 'Brak',
                QMS_TICKET_LEFT: 'Pozostało biletów'
		
		
}



//------------------------------------------------------------

if(!window._translations)
	window._translations = {};

for (var key in translations) { window._translations[key] = translations[key]; }

if(typeof(window.tr) === 'undefined') {
	console.debug('creating tr function');
	window.tr = function (key) {	
		if(translations[key] != undefined)
			return translations[key];
		return key;
	}
}