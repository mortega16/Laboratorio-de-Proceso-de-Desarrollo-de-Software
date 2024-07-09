using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class Tareas:BaseDTO
    {
        
        public int usuarioId { get; set; }
        public DateTime vencimiento { get; set; }   
        public int prioridad { get; set; }  
        public string descripcion {  get; set; }    
        public string titulo { get; set; }

        public string estado { get; set; }


    }
}
