/* Copyright 2015 Platforma Biznesu Sp. z o.o. all right reserved */

function QmsReservation(containerId)
{
	this.containerId = containerId;
	this.container = jQuery('#'+containerId);
	this.controllerUrl = '';
	this.useSynchronousCalls = false;
	this.impossibleText = tr('QMS_NO_RESERVATION_SLOTS');
	this.language = 'pl';
	
	this.displayPickerInline = true;
	
	this.timeInput = null;
	this.serviceInput = null;
	this.dateInput = null;
	this.captchaInput = null;
	this.messageDiv = null;
	this.submitButton = null;
	this.fomrKeyInput = null;
	this.emptyTimeInput = null;
	
	this.spinners = {};
	
	this.ERROR_CAPTCHA_NOT_MATCH = 452;
	this.ERROR_SLOT_TAKEN = 453;
	this.ERROR_RESERVATION_FAILED = 454;
	
	this.requestDelay = 500; //notify the user that something is updating
}


QmsReservation.prototype.init = function() {
	this.sendFormRequest();
}

QmsReservation.prototype.initFormEvents = function() {
	
	this.timeInput = this.container.find('#reservation-time');
	this.serviceInput = this.container.find('#reservation-service');
	this.dateInput = this.container.find('#reservation-date');
	this.datepickerContainer = this.container.find('#datepicker-container');
	this.datepickerLabel = this.container.find('.datepicker-icon-label');
	this.captchaInput = this.container.find('#reservation-captcha-text');
	this.formKeyInput = this.container.find('#form-key');
	this.submitButton = this.container.find('#send-reservation-button');
	this.messageDiv = this.container.find('#reservation-message');
	
	var form = this;
	this.serviceInput.change(function(){
		form.onServiceChanged();
	});
	
	this.initSpinners();
	
	this.initDatepicker();
	
	this.submitButton.click(function(){
		form.onSubmitClicked();
	});
	
	this.container.find('#reservation-captcha-image').click(function(){
		form.sendCaptchaReloadRequest();
	});
	
}

QmsReservation.prototype.initSpinners = function() {
	this.spinners['reservation-date'] = this.container.find('#reservation-date-spinner');
	this.spinners['reservation-time'] = this.container.find('#reservation-time-spinner');
}

QmsReservation.prototype.initDatepicker = function(availableDates) {
	if(!availableDates)
		availableDates = [];
	var form = this;
	var picker = this.displayPickerInline ? this.datepickerContainer : this.dateInput;
	
	picker.datepicker("destroy");
	picker.datepicker({
		dateFormat: 'yy-mm-dd',
		beforeShowDay: function(date){
	        var string = jQuery.datepicker.formatDate('yy-mm-dd', date);
	        return [ availableDates.indexOf(string) != -1 ]
	    }
	});

	picker.datepicker("refresh");
	
	
	picker.datepicker(jQuery.datepicker.regional[this.language]);
	
	this.dateInput.change(function(){
		form.onDateChanged();
	});
		
	
	if (this.displayPickerInline) {
		this.dateInput.hide();
		this.datepickerLabel.hide();
		//picker.datepicker();
		picker.change(function(){
				form.dateInput.val(jQuery(this).val());
				form.onDateChanged();
				console.debug('picker date changed');
		});
		
	}
	
	
	//

	
	
// for joomla datepicker:
//	this.dateInput.attr('onchange', 'jQuery(this).trigger("datechanged");');
//	this.dateInput.on('datechanged', function(){
//		form.onDateChanged();
//	});
}


//----------------------------------------------------------------------------------
//------------------------- AJAX request sending methods ---------------------------
//----------------------------------------------------------------------------------

QmsReservation.prototype.sendFormRequest = function() {
	
	var request = {
			'action': 'get_reservation_form'
	};
	
	this.postJSON(request, this.onFormReceived);
}

QmsReservation.prototype.sendAvailableDatesRequest = function(serviceId) {
	
	var request = {
			'action': 'get_available_dates',
			'args': {
				'service_id': serviceId
			}
	};
	
	//this.hideReservationFields();
	this.showSpinner('reservation-date');
	
	var form = this;
	setTimeout(function(){
		form.postJSON(request, form.onAvailableDatesReceived, form);
	}, form.requestDelay);
	
}

QmsReservation.prototype.sendReservationSlotsRequest = function(serviceId, dateString) {
	
	if(!this.validateServiceInput(serviceId) || !this.validateDateInput(dateString))
		return;
	
	var request = {
			'action': 'get_reservation_slots',
			'args': {
				'service_id': serviceId,
				'date': dateString
			}
	};
	
	var form = this;
	this.showSpinner('reservation-time');

	setTimeout(function(){
		form.postJSON(request, form.onSlotsReceived, form);
	}, form.requestDelay);
	
	
}

QmsReservation.prototype.sendReservationRequest = function() {
	var request = {
			'action': 'make_reservation',
			'args': {
				'form_key': this.formKeyInput.val(),
				'captcha_code': this.captchaInput.val(),
				'service_id': this.serviceInput.val(),
				'date': this.dateInput.val(),
				'time': this.timeInput.val()
			}
	};
	
	this.postJSON(request, this.onReservationSubmitted);
}


QmsReservation.prototype.sendCaptchaReloadRequest = function() {
	var request = {
			'action': 'generate_captcha'
	};
	
	this.postJSON(request, this.onNewCaptcha);
}


QmsReservation.prototype.postJSON = function(jsonData, callback, callbackContext) {
	
	if(callbackContext == undefined)
		callbackContext = this;
		
	jQuery.ajax({
		type: "POST",
		dataType: "json",
		url: this.controllerUrl,
		contentType: 'application/json',
		data: JSON.stringify(jsonData),
		
		success: function(response){
				if(response.status == 'success') {
					callback.bind(callbackContext,response)();
				}
				else
					this.showError(response.message, response.code);
				
			}.bind(this),
			
		error: function (xmlrequest, ajaxOptions, thrownError) {
	        this.showAjaxError(xmlrequest.responseText);
	      }.bind(this),
	      
		async: !this.useSynchronousCalls
	});
	
};



//----------------------------------------------------------------------------------
//-------------------------- AJAX response handling methods ------------------------
//----------------------------------------------------------------------------------


/**
 * We expect the following response:
 * 
{
"status": "success",
"data":[
            {
               "service_id": "<service id>",
               "label": "<service label>",
               "description": "<service descripion>"
            },
            {
               ...
            }
         ] 
}
 * 
 * 
 */
QmsReservation.prototype.onFormReceived = function(response) {

	if(!response.data) {
		console.error('empty respone data, aborting');
		return;
	}
	
	this.container.hide();
	this.container.html(response.data);
	this.container.fadeIn();
	this.initFormEvents();
	this.emptyTimeInput = this.timeInput.clone();
}

QmsReservation.prototype.onAvailableDatesReceived = function(response) {
	this.hideSpinner('reservation-date');
	
	if(!response.data) {
		console.error('empty respone data, aborting');
		return;
	}
	
	console.debug('available dates received');
	console.debug(response.data);
	
	this.initDatepicker(response.data);
	this.showReservationFields();
}

QmsReservation.prototype.onSlotsReceived = function(response) {
		
	this.hideSpinner('reservation-time');
	
	this.timeInput.html('');
	var slots = response.data;
	
	if(slots.length == 0) {
		var option = jQuery('<option></option>');
		option.attr('value', false);
		option.attr('disabled', true);
		option.attr('selected', true);
		option.text(this.impossibleText);
		this.timeInput.append(option);
		
	}
	else {

		for(var i=0; i<slots.length; i++) {
			var option = jQuery('<option></option>');
			option.attr('value', slots[i]);
			option.text(slots[i]);
			this.timeInput.append(option);
		}
		
	}
	

	this.timeInput.trigger('change');
}

QmsReservation.prototype.onReservationSubmitted = function(response) {
	this.container.html(response.data);
}

QmsReservation.prototype.onNewCaptcha = function(response) {
	this.formKeyInput.val(response.data.form_key);
	this.container.find('#reservation-captcha-image')
		.attr('src', 'data:image/png;base64,'+response.data.captcha_b64);
}

QmsReservation.prototype.onServiceChanged = function() {
	this.resetTimeInput();
	this.sendAvailableDatesRequest(this.serviceInput.val());
	//this.sendReservationSlotsRequest(this.serviceInput.val(), this.dateInput.val());
}

QmsReservation.prototype.onDateChanged = function() {
	console.debug('onDateChanged');
	this.sendReservationSlotsRequest(this.serviceInput.val(), this.dateInput.val());
}

QmsReservation.prototype.onSubmitClicked = function() {
	if(!this.validateForm())
		return;
	
	this.submitButton.disabled = true;
	this.showMessage(tr('QMS_SENDING_RESERVATION_REQUEST'), 'info');

	
	this.sendReservationRequest();
}

//----------------------------------------------------------------------------------
//-------------------------------- 'private' methods -------------------------------
//----------------------------------------------------------------------------------

QmsReservation.prototype.resetTimeInput = function() {
	this.timeInput.html(this.emptyTimeInput.html());
}

QmsReservation.prototype.validateForm = function() {
	
	var serviceError = this.container.find('.reservation-service-error');
	serviceError.hide();
	
	var dateError = this.container.find('.reservation-date-error');
	dateError.hide();
	
	var timeError = this.container.find('.reservation-time-error');
	timeError.hide();
	
	if(!this.validateServiceInput()) {
		serviceError.html(tr('QMS_INVALID_SERVICE'));
		serviceError.show();
		return false;
	}
	
	if(!this.validateDateInput()) {
		dateError.html(tr('QMS_INVALID_DATE'));
		dateError.show();
		return false;
	}
	
	if(!this.validateTimeInput()) {
		timeError.html(tr('QMS_INVALID_TIME'));
		timeError.hide();
		return false;
	}

	return true;
}

QmsReservation.prototype.validateServiceInput = function(value) {
	
	if(value === undefined)
		value = this.serviceInput.val();
	
	return parseInt(value) > 0 &&
		/^[0-9]+$/.test(value);
}

QmsReservation.prototype.validateDateInput = function(value) {
	if(value === undefined)
		value = this.dateInput.val();
	
	return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value);
}

QmsReservation.prototype.validateTimeInput = function() {
	return this.timeInput &&
		/^[012][0-9]\:[0-9]{2}$/.test(this.timeInput.val());
}


QmsReservation.prototype.showError = function(message, errorCode) {
	console.error('qms error ('+errorCode+'): '+message);
	
	this.submitButton.disabled = false;
	
	switch(parseInt(errorCode)) {
	case this.ERROR_SLOT_TAKEN:
		this.showMessage(tr('QMS_SLOT_ALREADY_TAKEN'), 'danger');
		break;
	case this.ERROR_RESERVATION_FAILED:
		this.showMessage(tr('QMS_RESERVATION_FAILED'), 'danger');
		break;
	case this.ERROR_CAPTCHA_NOT_MATCH:
		var captchaError = this.container.find('.reservation-captcha-error');
		captchaError.html(tr('QMS_WRONG_CAPTCHA'));
		captchaError.show();
		this.showMessage('');
		this.sendCaptchaReloadRequest();
		break;
	default:;
	}
	
};


QmsReservation.prototype.showAjaxError = function(message) {
	console.error('transmission error: '+message);

	this.container.html(tr('QMS_RESERVATIONS_NOT_AVAILABLE'));
};

QmsReservation.prototype.showMessage = function(message, divClass) {
	
	var div = jQuery('<div></div>');
	div.html(message);
	
	if(divClass)
		div.addClass(divClass);
	
	this.messageDiv.html(div);
	
	
	if(message == "")
		this.messageDiv.hide();
	else
		this.messageDiv.show();
}

QmsReservation.prototype.hideReservationFields = function() {
	jQuery('.reservation-fields-container').fadeOut();
}

QmsReservation.prototype.showReservationFields = function() {
	jQuery('.reservation-fields-container').fadeIn();
}

QmsReservation.prototype.showSpinner = function(spinnerName) {
	if(!spinnerName)
		spinnerName = 'reservation-time';
	
	switch(spinnerName) {
	case 'reservation-time':
		this.timeInput.hide();
		break;
	case 'reservation-date':
		this.dateInput.hide();
		this.datepickerContainer.hide();
		break;
	}
	
	
	this.spinners[spinnerName].fadeIn();
}

QmsReservation.prototype.hideSpinner = function(spinnerName) {
	if(!spinnerName)
		spinnerName = 'reservation-time';

	switch(spinnerName) {
	case 'reservation-time':
		this.timeInput.fadeIn();
		break;
	case 'reservation-date':
		this.dateInput.fadeIn();
		this.datepickerContainer.fadeIn();
		break;
	}
	
	this.spinners[spinnerName].hide();
}




