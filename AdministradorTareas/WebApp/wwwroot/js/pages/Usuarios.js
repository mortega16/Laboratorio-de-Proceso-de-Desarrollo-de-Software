function UsuarioController() {
    this.ViewName = "Usuarios";
    this.ApiService = "Usuario";

    //Metodo a ejecutar al incio de la vista
    this.InitView = function () {
        console.log("User view init!!");

        //Bind del click de boton create con la funcion correpondiente

        $("#btnRegistrar").click(function () {
            var vc = new UsuarioController();
            vc.Create();
        })
        $("#btnUpdate").click(function () {
            var vc = new UsuarioController();
            vc.Update();
        })
        $("#btnInicioSesion").click(function () {
            var vc = new UsuarioController();
            vc.InicioSesion();
        })


    }

    this.Create = function () {
        var usuario = {};
        usuario.id = $("#cedulaUsuario").val();
        usuario.correo = $("#correoUsuario").val();
        usuario.nombre = $("#nombreUsuario").val();
        usuario.apellido1 = $("#apellido1Usuario").val();
        usuario.apellido2 = $("#apellido2Usuario").val();
        usuario.contrasenna = $("#usuarioContraseña").val();


        var ca = new ControlActions();

        var serviceRoute = this.ApiService + "/Create";
        ca.PostToAPI(serviceRoute, usuario, function () {
            console.log("Usuario creado-->" + JSON.stringify(usuario));
        });
    }


    this.VerificarCrendenciales = function (correo, contrasenna,callback) {

        var ca = new ControlActions();

        var urlService = ca.GetUrlApiService("Usuario/VerificarCredenciales");

        $.ajax({
            type: "GET",
            url: urlService + "?correo=" + correo + "&contrasenna=" + contrasenna,

            success: function (usuario) {
                console.log(usuario)

                Swal.fire(
                    'Se ha iniciado sesion correctamente!',

                )
                setTimeout(function () {
                    window.location.href = "https://localhost:7103/";
                }, 2000);

            },

            error: function (xhr, status, error) {
                Swal.fire({
					icon: 'error',
                    title: 'Credenciales invalidos',
                })
                setTimeout(function () {
                    window.location.href = "https://localhost:7103/InicioSesion";
                }, 2000);
            }
        });

       
    }

    this.InicioSesion = function () {
        var usuario = {
            correo: $("#correoUsuario").val(),
            contraseña: $("#usuarioContraseña").val()
        };

        var vs = new UsuarioController();
        vs.VerificarCrendenciales(usuario.correo, usuario.contraseña)

     
  
    };





    this.Update = function () {
        var user = {};
        user.id = $("#UserId").val();
        user.name = $("#UserName").val();
        user.email = $("#UserEmail").val();
        user.department = $("#UserDepartment").val();
        user.role = $("#UserRole").val();
        user.birthdate = $("#UserBirthdate").val();


        var ca = new ControlActions();

        var serviceRoute = this.ApiService + "/Update";
        ca.PutToAPI(serviceRoute, user, function () {
            console.log("User update-->" + JSON.stringify(user));
        });
    }

}


$(document).ready(function () {
    var vc = new UsuarioController();
    vc.InitView();
})
