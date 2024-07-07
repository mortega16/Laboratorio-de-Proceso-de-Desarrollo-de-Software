using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class Usuarios:BaseDTO
    {
        public string nombre { get; set; }  
        public string apellido1 { get; set; }
        public string apellido2 { get; set; }
        public string correo { get; set; }
        public string contrasenna { get; set; } 


    }
}
