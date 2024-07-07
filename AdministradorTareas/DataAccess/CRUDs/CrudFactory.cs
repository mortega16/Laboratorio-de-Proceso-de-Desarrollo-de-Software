using DataAccess.DAOs;
using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.CRUDs
{
    public abstract class CrudFactory
    {

        protected SqlDao _dao;


        public abstract void Create(BaseDTO baseDTO);
        public abstract void Update(BaseDTO baseDTO);
        public abstract void Delete(BaseDTO baseDTO);
        public abstract List<T> RetrieveAll<T>();

        public abstract T RetrieveById<T>(int id);

        public abstract List<T> RetrieveById<T>();

    }
}
