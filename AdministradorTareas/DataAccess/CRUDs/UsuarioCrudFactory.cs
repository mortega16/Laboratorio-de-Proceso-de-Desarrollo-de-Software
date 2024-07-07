using DTOs;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUDs
{
    public class UsuarioCrudFactory : CrudFactory
    {
        public UsuarioCrudFactory()
        {
            _dao = SqlDao.GetInstance();

        }
        public override void Create(BaseDTO baseDTO)
        {

            var usuario = baseDTO as Usuarios;

            var SqlOperation = new SqlOperation { ProcedureName = "CREAR_USUARIO" };
            SqlOperation.AddIntParam("cedula", usuario.id);
            SqlOperation.AddVarcharParam("nombre", usuario.nombre);
            SqlOperation.AddVarcharParam("apellido1", usuario.apellido1);
            SqlOperation.AddVarcharParam("apellido2", usuario.apellido2);
            SqlOperation.AddVarcharParam("correo", usuario.correo);
            SqlOperation.AddVarcharParam("contrasenna", usuario.contrasenna);

            _dao.ExecuteProcedure(SqlOperation);
        }

        public override void Delete(BaseDTO baseDTO)
        {
            throw new NotImplementedException();
        }

        public override List<T> RetrieveAll<T>()
        {
            throw new NotImplementedException();
        }
        public override T RetrieveById<T>(int id)
        {
            throw new NotImplementedException();
        }

        public Usuarios RetrieveByCedula(Usuarios usuario)
        {
            var sqlOperation = new SqlOperation() { ProcedureName = "MOSTRAR_USUARIO_POR_CEDULA"};
            sqlOperation.AddIntParam("cedula", usuario.id);
            var lstResults = _dao.ExecuteQueryProcedure(sqlOperation);
            if (lstResults.Count > 0)
            {     
                var row = lstResults[0];
                var usuarios = BuildUsuario(row);
                return usuarios;
            }

            return null;
        }

        public override List<T> RetrieveById<T>()
        {
            throw new NotImplementedException();
        }

        public override void Update(BaseDTO baseDTO)
        {
            var usuario = baseDTO as Usuarios;

            var SqlOperation = new SqlOperation { ProcedureName = "ACTUALIZAR_USUARIO" };
            SqlOperation.AddIntParam("cedula", usuario.id);
            SqlOperation.AddVarcharParam("nombre", usuario.nombre);
            SqlOperation.AddVarcharParam("apellido1", usuario.apellido1);
            SqlOperation.AddVarcharParam("apellido2", usuario.apellido2);
            SqlOperation.AddVarcharParam("correo", usuario.correo);
            SqlOperation.AddVarcharParam("contrasenna", usuario.contrasenna);

            _dao.ExecuteProcedure(SqlOperation);

        }


        private Usuarios BuildUsuario(Dictionary<string, object> row)
        {
            var usuarioARetornar = new Usuarios()
            {
                id = (int)row["cedula"],
                nombre = (string)row["nombre"],
                apellido1 = (string)row["apellido1"],
                apellido2 = (string)row["apellido2"],
                correo = (string)row["correo"],
                contrasenna = (string)row["password"]

            };
            return usuarioARetornar;
        }
    }
}
