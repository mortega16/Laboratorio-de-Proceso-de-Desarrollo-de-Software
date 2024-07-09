var tc = new TareaController();
var tc;

function TareaController() {
    this.ViewName = "Tareas";
    this.ApiService = "Tareas";

    this.InitView = function () {
        this.LoadTable();
    };



   
    this.LoadTable = function () {
        var ca = new ControlActions();
        var urlService = ca.GetUrlApiService(this.ApiService + "/SELECCIONAR_TAREA_POR_USUARIO?user=117487545");

        $("#tblTarea").
        ({
            "processing": true,
            "serverSide": false, // Change to true if you are doing server-side processing
            "ajax": {
                "url": urlService,
                "dataSrc": ""
            },
            "columns": [
                { "data": "titulo" },
                { "data": "descripcion" },
                { "data": "prioridad" },
                { "data": "vencimiento" },
                { "data": "id" }
            ]

        });
        $("#tblTarea tbody").on("click", "tr", function () {
            // Extraer la fila a la que se le dio clic
            var row = $(this).closest("tr");

            // Extraer la data del registro contenido en la fila
            var sedeData = $("#tblSede").DataTable().row(row).data();

            // Mapear los valores del objeto de datos con el formulario
            $("#idSede").val(sedeData.id);
            $("#InputNombre").val(sedeData.nombre);
            $("#InputDescripcion").val(sedeData.descripcion);
            $("#InputUbicacion").val(sedeData.ubicacion);
            $("#map-link").val(sedeData.link);

        });
    };

}



$(document).ready(function () {
    sc = new TareaController();
    sc.InitView();
});