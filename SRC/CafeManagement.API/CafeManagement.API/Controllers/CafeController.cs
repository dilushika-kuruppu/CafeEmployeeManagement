using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CafeManagement.Business.Cafe;
using CafeManagement.DTO.DTO;

namespace CafeManagement.API.Controllers
{
    public class CafeController : ApiController
    {
        [HttpPost]
        [Route("cafe")]
        public HttpResponseMessage CreateCafe([FromBody] Cafe cafe)
        {
            try
            {
                CafeOperation cafOpr = new CafeOperation();
                var getResponse = cafOpr.CreateCafeDetail(cafe);
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }

        [HttpPut]
        [Route("cafe")]
        public HttpResponseMessage UpdateCafe([FromBody] Cafe cafe)
        {
            try
            {
                CafeOperation cafOpr = new CafeOperation();
                var getResponse = cafOpr.UpdateCafeDetail(cafe);
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }

        [HttpDelete]
        [Route("cafe")]
        public HttpResponseMessage DeleteCafe()
        {
            try
            {
                CafeOperation cafOpr = new CafeOperation();
                var getResponse = cafOpr.DeleteCafeDetail();
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }

        [HttpGet]
        [Route("cafes")]
        public HttpResponseMessage Cafes([FromUri] string location)
        {
            try
            {
                CafeOperation cafOpr = new CafeOperation();
                var getResponse = cafOpr.GetCafeDetail(location);
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }
    }
}
