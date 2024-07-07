using CoreApp;
using DataAccess.CRUDs;
using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
       

        [HttpGet]
        [Route("RetrieveByCedula")]
        public ActionResult RetrieveByCedula(int cedula)
        {
            try
            {
                var u = new Usuarios { id = cedula };

                var um = new UsuarioManager();
                var usuario = um.RetrieveByCedula(u);

                return Ok(usuario);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
       
        [HttpPost]
        [Route("Create")]

        public ActionResult Create(Usuarios usuario)
        {
            try
            {
                var um = new UsuarioManager();
                um.Create(usuario);
                return Ok(usuario);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

    }
}
