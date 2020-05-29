
var translations = {
		QMS_NO_RESERVATION_SLOTS: 'Brak wolnych terminów',
		QMS_SENDING_RESERVATION_REQUEST: 'Trwa rezerwowanie terminu, proszę czekać...',
		QMS_SLOT_ALREADY_TAKEN: 'Wybrany termin właśnie został zarezerwowany przez kogoś innego. Ponów próbę rezerwacji z inną godziną.',
		QMS_RESERVATION_FAILED: 'Wystąpił nieoczekiwany błąd podczas dokonywania rezerwacji. Spróbuj ponownie.',
		QMS_WRONG_CAPTCHA: 'Błędny kod. Spróbuj ponownie.',
		QMS_INVALID_SERVICE: "Proszę wybrać usługę.",
		QMS_INVALID_DATE: "Niewłaściwa data",
		QMS_INVALID_TIME: "Niewłaściwy czas",
		QMS_RESERVATIONS_NOT_AVAILABLE: "Brak możliwości dokonania rezerwacji."
}


function tr(key) {
	if(translations[key] != undefined)
		return translations[key];
	return key;
}

