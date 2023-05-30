using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CafeManagement.Business.Employee;
using CafeManagement.DTO.DTO;

namespace CafeManagement.API.Controllers
{
    public class EmployeeController : ApiController
    {
        [HttpPost]
        [Route("employee")]
        public HttpResponseMessage CreateEmployee([FromBody] EmployeeDetail employee)
        {
            try
            {
                EmployeeOperation cafOpr = new EmployeeOperation();
                var getResponse = cafOpr.CreateEmployeeDetail(employee);
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }

        [HttpPut]
        [Route("employee")]
        public HttpResponseMessage UpdateEmployee([FromBody] EmployeeDetail employee)
        {
            try
            {
                EmployeeOperation cafOpr = new EmployeeOperation();
                var getResponse = cafOpr.UpdateEmployeeDetail(employee);
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }

        [HttpDelete]
        [Route("employee")]
        public HttpResponseMessage DeleteEmployee()
        {
            try
            {
                EmployeeOperation cafOpr = new EmployeeOperation();
                var getResponse = cafOpr.DeleteEmployeeDetail();
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }

        [HttpGet]
        [Route("employees")]
        public HttpResponseMessage Employees(string cafe)
        {
            try
            {
                EmployeeOperation empOpr = new EmployeeOperation();
                var getResponse = empOpr.GetEmployeeDetail(cafe);
                return Request.CreateResponse(HttpStatusCode.OK, getResponse);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message + ex.StackTrace);
            }
        }
    }
}
