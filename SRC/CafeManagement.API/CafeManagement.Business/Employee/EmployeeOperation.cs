using System;
using System.Collections.Generic;
using System.Text;
using CafeManagement.Data.DataAccess;
using System.Data.SQLite;

namespace CafeManagement.Business.Employee
{
    public class EmployeeOperation
    {
        public string CreateEmployeeDetail(DTO.DTO.EmployeeDetail employee)
        {
            try
            {
                var empId = "UI" + employee.id;
                employee.id = empId;

                var getQuery = SqlQueryStringReader.GetQueryStringById("CreateEmployee", "Employee");

                List<SQLiteParameter> sqlParams = new List<SQLiteParameter>();
                sqlParams.Add(new SQLiteParameter("id", employee.id));
                sqlParams.Add(new SQLiteParameter("name", employee.name));
                sqlParams.Add(new SQLiteParameter("email_address", employee.email_address));
                sqlParams.Add(new SQLiteParameter("phone_number", employee.phone_number));
                sqlParams.Add(new SQLiteParameter("gender", employee.gender));
                sqlParams.Add(new SQLiteParameter("cafe", employee.cafe));

                DBOperation dbo = new DBOperation();
                dbo.ExecuteQuery(getQuery, sqlParams);
                var successMessage = "Employee record successfully added.";
                return successMessage;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string UpdateEmployeeDetail(DTO.DTO.EmployeeDetail employee)
        {
            try
            {
                var getQuery = SqlQueryStringReader.GetQueryStringById("UpdateEmployee", "Employee");

                List<SQLiteParameter> sqlParams = new List<SQLiteParameter>();
                sqlParams.Add(new SQLiteParameter("id", employee.id));
                sqlParams.Add(new SQLiteParameter("name", employee.name));
                sqlParams.Add(new SQLiteParameter("email_address", employee.email_address));
                sqlParams.Add(new SQLiteParameter("phone_number", employee.phone_number));
                sqlParams.Add(new SQLiteParameter("gender", employee.gender));

                DBOperation dbo = new DBOperation();
                dbo.ExecuteQuery(getQuery, sqlParams);
                var successMessage = "Employee record successfully updated.";
                return successMessage;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string DeleteEmployeeDetail()
        {
            try
            {
                var getQuery = SqlQueryStringReader.GetQueryStringById("DeleteEmployee", "Employee");

                DBOperation dbo = new DBOperation();
                dbo.ExecuteQuery(getQuery);
                var successMessage = "Employee record(s) successfully deleted.";
                return successMessage;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DTO.DTO.EmployeeDetail> GetEmployeeDetail(string cafe)
        {
            List<DTO.DTO.EmployeeDetail> employeeDetails = new List<DTO.DTO.EmployeeDetail>();
            try
            {
                var getQuery = SqlQueryStringReader.GetQueryStringById("GetAllEmployeeDetails", "Employee");

                List<SQLiteParameter> sqlParams = new List<SQLiteParameter>();
                sqlParams.Add(new SQLiteParameter("id", cafe));

                DBOperation dbo = new DBOperation();
                var dataReaders = dbo.ExecuteQueryWithReader(getQuery, sqlParams);
                var reader = dataReaders[0];

                while (reader.Read())
                {
                    DTO.DTO.EmployeeDetail employeeDetail = new DTO.DTO.EmployeeDetail()
                    {
                        id = reader["id"].ToString(),
                        name = reader["name"].ToString(),
                        email_address = reader["email_address"].ToString(),
                        phone_number = Convert.ToInt32(reader["phone_number"].ToString()),
                        days_worked = Convert.ToInt32(reader["days_worked"].ToString()),
                        cafe = reader["cafe"].ToString()
                    };
                    employeeDetails.Add(employeeDetail);
                }
                return employeeDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
