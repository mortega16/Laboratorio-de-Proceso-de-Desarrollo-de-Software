using DataAccess.CRUDs;
using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreApp
{
    public class TareaManager
    {
        public void Create(Tareas tarea)
        {
            var tc = new TareaCrudFactory();
            tc.Create(tarea);
        }
        public void Update(Tareas tarea)
        {
            var tc = new TareaCrudFactory();
            tc.Update(tarea);
        }
        public void Delete(Tareas tarea) 
        {
            var tc = new TareaCrudFactory();
            tc.Delete(tarea);
        }

        public Tareas RetrieveById(int tarea) 
        { 
            var tc = new TareaCrudFactory ();
            return tc.RetrieveById<Tareas>(tarea);
        }

        public List<Tareas> RetrieveByUser(int user)
        {
            var tc = new TareaCrudFactory();
            return tc.RetrieveByUser<Tareas>(user);
        }
    }
}
