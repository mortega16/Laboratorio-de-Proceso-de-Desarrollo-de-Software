using CoreApp;
using DataAccess.CRUDs;
using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        [HttpGet]
        [Route("RetrieveById")]
        public ActionResult RetrieveByID(int id)
        {
            try
            {
                int t = id;
                var tm = new TareaManager();
                var tarea = tm.RetrieveById(t);

                return Ok(tarea);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet]
        [Route("RetrieveByUser")]
        public ActionResult RetrieveByUser(int user)
        {
            try
            {
                var tm = new TareaManager();
                List<Tareas> tareas = tm.RetrieveByUser(user);
                return Ok(tareas);
            } catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost]
        [Route("Create")]

        public ActionResult Create(Tareas tarea)
        {
            try
            {
                var tm = new TareaManager();
                tm.Create(tarea);
                return Ok(tarea);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut]
        [Route("Update")]

        public ActionResult Update(Tareas tarea)
        {
            try
            {
                var tm = new TareaManager();
                tm.Update(tarea);
                return Ok(tarea);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("Delete")]

        public ActionResult Delete(Tareas tarea)
        {
            try
            {
                var tm = new TareaManager();
                tm.Delete(tarea);
                return Ok(tarea);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
