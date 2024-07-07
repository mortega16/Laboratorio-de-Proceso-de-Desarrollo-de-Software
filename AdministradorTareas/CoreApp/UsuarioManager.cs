using DataAccess.CRUDs;
using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreApp
{
    public class UsuarioManager
    {

        public void Create(Usuarios usuario)
        {
            var uc = new UsuarioCrudFactory();

            var usuarioActual = uc.RetrieveByCedula(usuario);
            var usuarioActual2 = uc.RetrieveByCorreo(usuario);
            if (usuarioActual == null)
            {
                if (usuarioActual2 == null)
                {
                    uc.Create(usuario);
                }
                else
                {
                    throw new Exception("Ya existe un usuario con ese correo");

                }

            }
            else
            {
                throw new Exception("Ya existe un usuario con esa cedula");
            }

        }

        public Usuarios RetrieveByCedula(Usuarios u)
        {
            var uc = new UsuarioCrudFactory();
            var usuario = uc.RetrieveByCedula(u);

            return usuario;
        }
        public Usuarios VerificarCrendenciales(Usuarios u)
        {
            var uc = new UsuarioCrudFactory();
            var usuario = uc.VerificarCredenciales(u);

            if (usuario == null)
            {
                throw new Exception("Credenciales incorrectas.");
               

            }
            else
            {
                return usuario;
            }

            
        }

        
        public Usuarios RetrieveByCorreo(Usuarios u)
        {
            var uc = new UsuarioCrudFactory();
            var usuario = uc.RetrieveByCorreo(u);

            return usuario;
        }

        public void Update(Usuarios usuario)
        {
            var uc = new UsuarioCrudFactory();
            uc.Update(usuario);

        }
    }
}
