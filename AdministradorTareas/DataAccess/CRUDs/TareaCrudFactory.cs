using DataAccess.DAOs;
using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUDs
{
    public class TareaCrudFactory : CrudFactory
    {
        public TareaCrudFactory()
        {
            _dao = SqlDao.GetInstance();

        }
        public override void Create(BaseDTO baseDTO)
        {
            var tarea = baseDTO as Tareas;
            var SqlOperation = new SqlOperation { ProcedureName = "CREAR_TAREA" };
            SqlOperation.AddIntParam("usuario", tarea.usuarioId);
            SqlOperation.AddDateTimeParam("vencimiento", tarea.vencimiento);
            SqlOperation.AddIntParam("prioridad", tarea.prioridad);
            SqlOperation.AddVarcharParam("descripcion", tarea.descripcion);
            SqlOperation.AddVarcharParam("titulo", tarea.titulo);

            _dao.ExecuteProcedure(SqlOperation);
        }

        public override void Delete(BaseDTO baseDTO)
        {
            var tarea = baseDTO as Tareas;
            var SqlOperation = new SqlOperation { ProcedureName = "ELIMINAR_TAREA" };
            SqlOperation.AddIntParam("id", tarea.id);

            _dao.ExecuteProcedure(SqlOperation);
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }

        public List<T> RetrieveByUser<T>(int id)
        {
            List<T> lstTareas = new();

            SqlOperation sqlOperation = new() { ProcedureName = "SELECCIONAR_TAREA_POR_USUARIO" };

            sqlOperation.AddIntParam("usuario", id);

            List<Dictionary<string, object>> lstResults = _dao.ExecuteQueryProcedure(sqlOperation);
            if (lstResults.Count > 0)
            {
                foreach (Dictionary<string, object> row in lstResults)
                {
                    Tareas tarea = BuildTarea(row);
                    lstTareas.Add((T)Convert.ChangeType(tarea, typeof(T)));
                }
            }
            return lstTareas;
        }

        public override T RetrieveById<T>(int id)
        {
            SqlOperation sqlOperation = new() { ProcedureName = "SELECCIONAR_TAREA_POR_ID" };

            sqlOperation.AddIntParam("id", id);

            List<Dictionary<string, object>> lstResults = _dao.ExecuteQueryProcedure(sqlOperation);
            if (lstResults.Count > 0)
            {
                Dictionary<string, object> row = lstResults[0];
                Tareas tareaToReturn = BuildTarea(row);
                return (T)(object)tareaToReturn;
            }
            else return (T)(object)null;
        }

        public override List<T> RetrieveById<T>()
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseDTO baseDTO)
        {
            var tarea = baseDTO as Tareas;
            var SqlOperation = new SqlOperation { ProcedureName = "ACTUALIZAR_TAREA" };
            SqlOperation.AddIntParam("id", tarea.id);
            SqlOperation.AddIntParam("usuario", tarea.usuarioId);
            SqlOperation.AddDateTimeParam("vencimiento", tarea.vencimiento);
            SqlOperation.AddIntParam("prioridad", tarea.prioridad);
            SqlOperation.AddVarcharParam("descripcion", tarea.descripcion);
            SqlOperation.AddVarcharParam("titulo", tarea.titulo);

            _dao.ExecuteProcedure(SqlOperation);
        }

        private Tareas BuildTarea(Dictionary<string, object> row)
        {
            Tareas tareaToReturn = new()
            {
                id = (int)row["id"],
                titulo = (string)row["titulo"],
                descripcion = (string)row["descripcion"],
                prioridad = (int)row["prioridad"],
                vencimiento = (DateTime)row["vencimiento"],
                usuarioId = (int)row["usuario"],
            };
            return tareaToReturn;
        }
    }
}
