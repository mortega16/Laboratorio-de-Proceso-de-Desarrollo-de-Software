
function ControlActions() {
	//Ruta base del API
	this.URL_API = "https://localhost:7098/api/"; 

	this.GetUrlApiService = function (service) {
		return this.URL_API + service;
	}

	this.GetTableColumsDataName = function (tableId) {
		var val = $('#' + tableId).attr("ColumnsDataName");

		return val;
	}

	this.FillTable = function (service, tableId, refresh) {

		if (!refresh) {
			columns = this.GetTableColumsDataName(tableId).split(',');
			var arrayColumnsData = [];


			$.each(columns, function (index, value) {
				var obj = {};
				obj.data = value;
				arrayColumnsData.push(obj);
			});
			//Esto es la inicializacion de la tabla de data tables segun la documentacion de 
			// datatables.net, carga la data usando un request async al API
			$('#' + tableId).DataTable({
				"processing": true,
				"ajax": {
					"url": this.GetUrlApiService(service),
					dataSrc: ''
				},
				"columns": arrayColumnsData
			});
		} else {
			//RECARGA LA TABLA
			$('#' + tableId).DataTable().ajax.reload();
		}

	}
	this.PostToAPIWithFormData = function (serviceUrl, data, callback) {
		$.ajax({
			type: "POST",
			url: serviceUrl,
			data: data,
			contentType: false, // No establecer Content-Type
			processData: false, // No procesar datos
			success: callback
		});
	}


	this.GetSelectedRow = function () {
		var data = sessionStorage.getItem(tableId + '_selected');

		return data;
	};

	this.BindFields = function (formId, data) {
		console.log(data);
		$('#' + formId + ' *').filter(':input').each(function (input) {
			var columnDataName = $(this).attr("ColumnDataName");
			this.value = data[columnDataName];
		});
	}

	this.GetDataForm = function (formId) {
		var data = {};

		$('#' + formId + ' *').filter(':input').each(function (input) {
			var columnDataName = $(this).attr("ColumnDataName");
			data[columnDataName] = this.value;
		});

		console.log(data);
		return data;
	}


	/* ACCIONES VIA AJAX, O ACCIONES ASINCRONAS*/

	this.PostToAPI = function (service, data, callBackFunction) {

		$.ajax({
			type: "POST",
			url: this.GetUrlApiService(service),
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				if (callBackFunction) {
					Swal.fire({
						title: '<span class="nunito-title">Completado</span>',
						html: 'Proceso Exitoso',
						timer: 200000,
						icon: 'success',
						showCancelButton: false,
						confirmButtonColor: "#4BBF73",
						confirmButtonText: '<button class="cajaBtnGeneralUniversalbtnDirecto">Ok</button>'
						})
					callBackFunction(data);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {

				var responseJson = jqXHR.responseJSON;
				var message = jqXHR.responseText;

				if (responseJson) {
					var errors = responseJson.errors;
					var errorMessages = Object.values(errors).flat();
					message = errorMessages.join("<br/> ");
				}
				Swal.fire({
					title: '<span class="nunito-title">Error</span>',
					html: 'Ha ocurrido un error',
					timer: 200000,
					icon: 'error',
					showCancelButton: false,
					confirmButtonColor: "#f27474",
					confirmButtonText: '<button class="cajaBtnGeneralUniversalbtnDirectoError">Ok</button>'
				})
			}
		});
	};
	

	this.PutToAPI = function (service, data, callBackFunction) {
		var jqxhr = $.put(this.GetUrlApiService(service), data, function (response) {
			var ctrlActions = new ControlActions();

			Swal.fire({
				title: '<span class="nunito-title">Completado</span>',
				html: 'Proceso Exitoso',
				timer: 200000,
				icon: 'success',
				showCancelButton: false,
				confirmButtonColor: "#4BBF73",
				confirmButtonText: '<button class="cajaBtnGeneralUniversalbtnDirecto">Ok</button>'
			})

			if (callBackFunction) {
				callBackFunction(response);
			}

		})
			.fail(function (response) {
				var data = response.responseJSON;
				var errors = data.errors;
				var errorMessages = Object.values(errors).flat();
				message = errorMessages.join("<br/> ");
				Swal.fire({
					title: '<span class="nunito-title">Error</span>',
					html: 'Ha ocurrido un error',
					timer: 200000,
					icon: 'error',
					showCancelButton: false,
					confirmButtonColor: "#f27474",
					confirmButtonText: '<button class="cajaBtnGeneralUniversalbtnDirectoError">Ok</button>'
				})
			})
	};

	this.DeleteToAPI = function (service, data, callBackFunction) {
		var jqxhr = $.delete(this.GetUrlApiService(service), data, function (response) {
			var ctrlActions = new ControlActions();
			Swal.fire({
				title: '<span class="nunito-title">Completado</span>',
				html: 'Proceso Exitoso',
				timer: 200000,
				icon: 'success',
				showCancelButton: false,
				confirmButtonColor: "#4BBF73",
				confirmButtonText: '<button class="cajaBtnGeneralUniversalbtnDirecto">Ok</button>'
			})

			if (callBackFunction) {
				callBackFunction(response);
			}
		})
			.fail(function (response) {
				var data = response.responseJSON;
				var errors = data.errors;
				var errorMessages = Object.values(errors).flat();
				message = errorMessages.join("<br/> ");
				Swal.fire({
					title: '<span class="nunito-title">Error</span>',
					html: 'Ha ocurrido un error',
					timer: 200000,
					icon: 'error',
					showCancelButton: false,
					confirmButtonColor: "#f27474",
					confirmButtonText: '<button class="cajaBtnGeneralUniversalbtnDirectoError">Ok</button>'
				})
			})
	};

	this.GetToApi = function (service, callBackFunction) {
		var jqxhr = $.get(this.GetUrlApiService(service), function (response) {
			console.log("Response " + response);
			if (callBackFunction) {
				callBackFunction(response);
			}

		});
	}
	this.PostToAPIWithFormData = function (serviceUrl, data, callback) {
		$.ajax({
			type: "POST",
			url: serviceUrl,
			data: data,
			contentType: false, // No establecer Content-Type
			processData: false, // No procesar datos
			success: callback
		});
	}

	this.PutToAPIWithFormData = function (serviceUrl, data, callback) {
		$.ajax({
			type: "PUT",
			url: serviceUrl,
			data: data,
			contentType: false, // No establecer Content-Type
			processData: false, // No procesar datos
			success: callback
		});
	}

}

//Custom jquery actions
$.put = function (url, data, callback) {
	if ($.isFunction(data)) {
		type = type || callback,
			callback = data,
			data = {}
	}
	return $.ajax({
		url: url,
		type: 'PUT',
		success: callback,
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
}

$.delete = function (url, data, callback) {
	if ($.isFunction(data)) {
		type = type || callback,
			callback = data,
			data = {}
	}
	return $.ajax({
		url: url,
		type: 'DELETE',
		success: callback,
		data: JSON.stringify(data),
		contentType: 'application/json'
	});
}