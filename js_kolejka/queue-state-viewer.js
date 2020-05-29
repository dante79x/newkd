

function QueueStateViewer (summaryQueueContainerId) {
	
	this.summaryQueueContainerId = summaryQueueContainerId;
	this.summaryQueueContainer = jQuery('#'+summaryQueueContainerId);
	this.controllerUrl = '';
	this.useSynchronousCalls = false;
	this.timer = null;
	this.lastResponseString = '';
	this.trimResult;
	this.emptyAvgTimeString = '--';
}



QueueStateViewer.prototype.postJSON = function(jsonData, callback, callbackContext) {
	
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
					this.showError(response.message);
				
			}.bind(this),
			
		error: function (xmlrequest, ajaxOptions, thrownError) {
	        this.showAjaxError(xmlrequest.responseText);
	      }.bind(this),
	      
		async: !this.useSynchronousCalls
	});
	
};


QueueStateViewer.prototype.sendDataUpdateRequest = function() {
	var request = {
                        'action': 'get_summary_queue',
			'args': {
				
			}
	};
	this.postJSON(request, this.onSendDataUpdateResponse);
}

QueueStateViewer.prototype.onSendDataUpdateResponse = function(response) {
	var responseString = JSON.stringify(response);
	if(this.lastResponseString == responseString) //nothing changed
		return;
	
	this.lastResponseString = responseString;

	var view = this.generateResponse(response.data);
	this.summaryQueueContainer.html(view);
}

QueueStateViewer.prototype.generateResponse = function(data) {
	
        return this.summaryQueueTable(data);
	
}

QueueStateViewer.prototype.summaryQueueTable = function(data) {
        if(Object.keys(data).length <= 0) {
		var noData = jQuery('<div></div>');
		noData.addClass('no-applicants');
		noData.append(tr('QMS_NO_DATA'));
		
		return noData;
		
	}
        
        var summaryTable = jQuery('<table></table>');
        
        var summaryTh = jQuery('<tr></tr>');
        if("department_name" in data[Object.keys(data)[0]][0]) { summaryTh.append('<th>'+tr('QMS_DEPARTMENT_NAME')+'</th>');}
        if("service_name" in data[Object.keys(data)[0]][0]) { summaryTh.append('<th>'+tr('QMS_SERVICE_NAME')+'</th>');}
        if("waiting" in data[Object.keys(data)[0]][0]) { summaryTh.append('<th>'+tr('QMS_COUNT_WAITING')+'</th>');}
        if("previous_ticket" in data[Object.keys(data)[0]][0]) { summaryTh.append('<th>'+tr('QMS_LAST_CALL_TICKET')+'</th>');}
        if("tickets_left" in data[Object.keys(data)[0]][0]) { summaryTh.append('<th>'+tr('QMS_TICKET_LEFT')+'</th>');}
        
        summaryTable.append(summaryTh);
	
	summaryTable.addClass('table-striped table waiting-list tabledisplaytemplate');
        
        for(var i in data) {
            var numberOfDepartmentServices = Object.keys(data[i]).length;
            var iterator = 0;
            for(var j in data[i]) {
                iterator = iterator + 1;
                if(typeof data[i][j] !== "object")
                        continue;
                    
                var tableTr = jQuery('<tr></tr>');
                if("department_name" in data[i][j]) {
                    var departmentName = jQuery('<td rowspan="' + numberOfDepartmentServices + '"></td>');
                    departmentName.append(data[i][j].department_name);
                    if(iterator === 1)
                        tableTr.append(departmentName);
                }
                if("service_name" in data[i][j]) {
                    var serviceName = jQuery('<td></td>');
                    serviceName.append(data[i][j].service_name);
                    tableTr.append(serviceName);
                }
                if("waiting" in data[i][j]) {
                    var waiting = jQuery('<td></td>');
                    waiting.append(data[i][j].waiting ? data[i][j].waiting : 0);
                    tableTr.append(waiting);
                }
                if("previous_ticket" in data[i][j]) {
                    var previousTicket = jQuery('<td></td>');
                    previousTicket.append(data[i][j].previous_ticket ? data[i][j].previous_ticket : tr('QMS_LAST_TICKET_NOT_EXIST'));
                    tableTr.append(previousTicket);
                }
                if("tickets_left" in data[i][j]) {
                    var ticketsLeft = jQuery('<td rowspan="' + numberOfDepartmentServices + '"></td>');
                    ticketsLeft.append(data[i][j].tickets_left);
                    if(iterator === 1)
                        tableTr.append(ticketsLeft);
                }
                
		if(!this.trimResult)
			summaryTable.append(tableTr);
		
		else if (i < this.trimResult) 
                        summaryTable.append(tableTr);
            }
	}

	
	return summaryTable;
}


QueueStateViewer.prototype.startAutoRefresh = function(interval) {
	this.sendDataUpdateRequest();
	this.timer = setInterval(function() {
		this.sendDataUpdateRequest();
	}.bind(this), interval);
}

QueueStateViewer.prototype.showError = function(message) {
	console.error('error: '+message);
};


QueueStateViewer.prototype.showAjaxError = function(message) {
	console.error('transmission error: '+message);
};

