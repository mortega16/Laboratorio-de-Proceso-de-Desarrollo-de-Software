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
            if (usuarioActual == null)
            {
                uc.Create(usuario);
            }
            else
            {
                throw new Exception("Un usuario con esa cedula ya existe ");
            }

        }

        public Usuarios RetrieveByCedula(Usuarios u)
        {
            var uc = new UsuarioCrudFactory();
            var usuario = uc.RetrieveByCedula(u);

            return usuario;
        }
    }
}
