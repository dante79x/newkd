
var translations = {
		QMS_NO_RESERVATION_SLOTS: 'No free reservation hours',
		QMS_SENDING_RESERVATION_REQUEST: 'Making the reservation, please wait...',
		QMS_SLOT_ALREADY_TAKEN: 'Choosen reservation time has been already taken by someone else. Please try again.',
		QMS_RESERVATION_FAILED: 'Reservation failed. Please try again.',
		QMS_WRONG_CAPTCHA: 'Wrong CAPTCHA code. Please try again.',
		QMS_INVALID_SERVICE: "Please choose the service first",
		QMS_INVALID_DATE: "Wrong date",
		QMS_INVALID_TIME: "Wrong time",
		QMS_RESERVATIONS_NOT_AVAILABLE: "Reservations not available"
}


//------------------------------------------------------------

if(!window._translations)
	window._translations = {};

for (var key in translations) { window._translations[key] = translations[key]; }

if(!window.tr)
	window.tr = function tr(key) {
		if(translations[key] != undefined)
			return translations[key];
		return key;
	}

