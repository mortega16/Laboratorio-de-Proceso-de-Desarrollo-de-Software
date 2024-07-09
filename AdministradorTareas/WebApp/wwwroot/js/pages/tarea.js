

function TareaController() {
    this.ViewName = "Tareas";
    this.ApiService = "Tareas";

    this.InitView = function () {
        this.LoadTable();
    };



   
    this.LoadTable = function () {
        var ca = new ControlActions();
        var urlService = ca.GetUrlApiService(this.ApiService + "/SELECCIONAR_TAREA_POR_USUARIO?user=117487545");

        var columns = [];
        columns[0] = { "data": "titulo" }
        columns[1] = { "data": "descripcion" }
        columns[2] = { "data": "prioridad" }
        columns[3] = { "data": "vencimiento" }
        columns[4] = { "data": "id" }

        $("#tblTarea").dataTable({
            "ajax": {
                "url": urlService,
                "dataSrc": ""
            },
            "columns": columns
        });

    };


}



$(document).ready(function () {
    sc = new TareaController();
    sc.InitView();
});