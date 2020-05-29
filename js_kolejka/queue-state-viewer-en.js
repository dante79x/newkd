var translations = {
		

		QMS_SERVICE_NAME: 'Service name',
		QMS_COUNT_WAITING: 'Count waiting',
		QMS_AVG_WAITING_TIME: 'Average waiting time',
		QMS_NO_APPLICANTS: 'No applicants',
                QMS_NO_DATA: 'No data',
                QMS_DEPARTMENT_NAME: 'Department name',
                QMS_LAST_CALL_TICKET: 'Last call',
                QMS_LAST_TICKET_NOT_EXIST: 'No ticket',
                QMS_TICKET_LEFT: 'Tickets left'

		
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