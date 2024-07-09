
function refrescarPagina() {
    window.location.reload();
}
function TareaController() {
    this.ViewName = "Tareas";
    this.ApiService = "Tarea";

    this.InitView = function () {
        $("#btnCrearTarea").click(function () {
            var vc = new TareaController();
            vc.Create();
            setTimeout(function () {
                refrescarPagina();
            }, 2000);
        })
        $("#btnActualizarTarea").click(function () {
            var vc = new TareaController();
            vc.Update();
            setTimeout(function () {
                refrescarPagina();
            }, 2000);
        })
        $("#btnEliminarTarea").click(function () {
            var vc = new TareaController();
            vc.Delete();
            setTimeout(function () {
                refrescarPagina();
            }, 2000);
        })
        this.LoadTable();
    };



   
    this.LoadTable = function () {
        var ca = new ControlActions();
        cedula = localStorage.getItem("cedula");
        var urlService = ca.GetUrlApiService(this.ApiService + "/RetrieveByUser?user=" + cedula);

        var columns = [];
        columns[0] = { "data": "titulo" }
        columns[1] = { "data": "descripcion" }
        columns[2] = { "data": "prioridad" }
        columns[3] = {
            "data": "vencimiento",
            "render": function (data, type, row) {
                var date = new Date(data);
                return date.toLocaleDateString('es-ES');
            }
        };
        
        columns[4] = { "data": "id" }
        columns[5] = { "data": "estado" }

        $("#tblTarea").dataTable({
            "ajax": {
                "url": urlService,
                "dataSrc": ""
            },
            "columns": columns
        });

        $("#tblTarea tbody").on("click", "tr", function () {
            var row = $(this).closest("tr");
            var tarea = $("#tblTarea").DataTable().row(row).data();
            $("#tareaTitulo").val(tarea.titulo);
            $("#tareaDescripcion").val(tarea.descripcion);
            $("#tareaPrioridad").val(tarea.prioridad);
            var onlyDate = tarea.vencimiento.split("T");
            $("#tareaVencimiento").val(onlyDate[0]);
            $("#tareaId").val(tarea.id);
            $("#tareaEstado").val(tarea.estado);
        });

    };
    this.Create = function () {
        var tarea = {};
        cedula = localStorage.getItem("cedula");
        tarea.usuarioId = cedula;
        tarea.titulo = $("#tareaTitulo").val();
        tarea.descripcion = $("#tareaDescripcion").val();
        tarea.prioridad = $("#tareaPrioridad").val();
        tarea.vencimiento = $("#tareaVencimiento").val();
        tarea.estado = $("#tareaEstado").val();


        var ca = new ControlActions();

        var serviceRoute = this.ApiService + "/Create";
        ca.PostToAPI(serviceRoute, tarea, function () {
            console.log("tarea creada-->" + JSON.stringify(tarea));
        });
    }
    this.Update = function () {
        var tarea = {};
        cedula = localStorage.getItem("cedula");
        tarea.usuarioId = cedula;
        tarea.titulo = $("#tareaTitulo").val();
        tarea.descripcion = $("#tareaDescripcion").val();
        tarea.prioridad = $("#tareaPrioridad").val();
        tarea.vencimiento = $("#tareaVencimiento").val();
        tarea.id = $("#tareaId").val();
        tarea.estado = $("#tareaEstado").val();


        var ca = new ControlActions();

        var serviceRoute = this.ApiService + "/Update";
        ca.PutToAPI(serviceRoute, tarea, function () {
            console.log("tarea actualizado-->" + JSON.stringify(tarea));
        });
    }
    this.Delete = function () {
        var tarea = {};
        tarea.titulo = $("#tareaTitulo").val();
        tarea.descripcion = $("#tareaDescripcion").val();
        tarea.prioridad = $("#tareaPrioridad").val();
        tarea.vencimiento = $("#tareaVencimiento").val();
        tarea.id = $("#tareaId").val();
        tarea.estado = $("#tareaEstado").val();


        var ca = new ControlActions();

        var serviceRoute = this.ApiService + "/Delete";
        ca.DeleteToAPI(serviceRoute, tarea, function () {
            console.log("tarea borrado-->" + JSON.stringify(tarea));
        });
    }


}



$(document).ready(function () {
    sc = new TareaController();
    sc.InitView();
});