
window.onload = function () {



    document.getElementById("btnCerrarSesion").addEventListener("click", function () {
        localStorage.removeItem("cedula");
        localStorage.removeItem("correo");
        localStorage.removeItem("nombre");
        localStorage.removeItem("apellido1");
        localStorage.removeItem("apellido2");
        localStorage.removeItem("contraseña");

        console.log("Sesión cerrada. rol eliminado del localStorage.");
    });


    const userData = localStorage.getItem('userData');
    const userInfoElement = document.getElementById('userInfo');

    if (userData) {
        const userDataObj = JSON.parse(userData);
        userInfoElement.innerHTML = `
                    <p>Cedula: ${userDataObj.cedula}</p>
                    <p>Nombre: ${userDataObj.nombre} ${userDataObj.apellido1} ${userDataObj.apellido2}</p>
                    <p>Correo: ${userDataObj.correo}</p>
                `;
    }

}

const userData = {

    cedula:localStorage.getItem("cedula"),
    correo:localStorage.getItem("correo"),
    nombre: localStorage.getItem("nombre"),
    apellido1: localStorage.getItem("apellido1"),
    apellido2: localStorage.getItem("apellido2"),

    
};




localStorage.setItem('userData', JSON.stringify(userData));
function UsuarioController() {
    this.ViewName = "Usuarios";
    this.ApiService = "Usuario";

    this.InitView = function () {
        console.log("User view init!!");


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
        if (localStorage.getItem("cedula") == null) {

            let userInfo = document.getElementById("userInfo");
            userInfo.classList.add('displayNone');
        }



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
            setTimeout(function () {
                window.location.href = "https://localhost:7103/InicioSesion";
            }, 2000);
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

                localStorage.setItem("cedula", usuario.id);
                localStorage.setItem("correo", usuario.correo);
                localStorage.setItem("nombre", usuario.nombre);
                localStorage.setItem("apellido1", usuario.apellido1);
                localStorage.setItem("apellido2", usuario.apellido2);
                localStorage.setItem("contraseña", usuario.contraseña);

                Swal.fire(
                    'Se ha iniciado sesion correctamente!',

                )
                setTimeout(function () {
                    window.location.href = "https://localhost:7103/Tareas";
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
