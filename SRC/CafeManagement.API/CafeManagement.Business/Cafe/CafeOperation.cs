using CafeManagement.Data.DataAccess;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Data.SQLite;

namespace CafeManagement.Business.Cafe
{
    public class CafeOperation
    {
        public string CreateCafeDetail(DTO.DTO.Cafe cafe)
        {
            try
            {
                var guId = System.Guid.NewGuid();
                cafe.id = guId.ToString();

                var getQuery = SqlQueryStringReader.GetQueryStringById("CreateCafe", "Cafe");

                List<SQLiteParameter> sqlParams = new List<SQLiteParameter>();
                sqlParams.Add(new SQLiteParameter("id", cafe.id));
                sqlParams.Add(new SQLiteParameter("name", cafe.name));
                sqlParams.Add(new SQLiteParameter("description", cafe.description));
                sqlParams.Add(new SQLiteParameter("logo", cafe.logo));
                sqlParams.Add(new SQLiteParameter("location", cafe.location));

                DBOperation dbo = new DBOperation();
                dbo.ExecuteQuery(getQuery, sqlParams);
                var successMessage = "Cafe record successfully added.";
                return successMessage;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string UpdateCafeDetail(DTO.DTO.Cafe cafe)
        {
            try
            {
                var getQuery = SqlQueryStringReader.GetQueryStringById("UpdateCafe", "Cafe");

                List<SQLiteParameter> sqlParams = new List<SQLiteParameter>();
                sqlParams.Add(new SQLiteParameter("id", cafe.id));
                sqlParams.Add(new SQLiteParameter("name", cafe.name));
                sqlParams.Add(new SQLiteParameter("description", cafe.description));
                sqlParams.Add(new SQLiteParameter("logo", cafe.logo));
                sqlParams.Add(new SQLiteParameter("location", cafe.location));

                DBOperation dbo = new DBOperation();
                dbo.ExecuteQuery(getQuery, sqlParams);
                var successMessage = "Cafe record successfully updated.";
                return successMessage;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string DeleteCafeDetail()
        {
            try
            {
                var getQuery = SqlQueryStringReader.GetQueryStringById("DeleteCafe", "Cafe");

                DBOperation dbo = new DBOperation();
                dbo.ExecuteQuery(getQuery);
                var successMessage = "Cafe record(s) successfully deleted.";
                return successMessage;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<DTO.DTO.CafeDetail> GetCafeDetail(string location)
        {
            List<DTO.DTO.CafeDetail> cafeDetails = new List<DTO.DTO.CafeDetail>();
            try
            {
                var getQuery = "";
                if (location == "")
                {
                    getQuery = SqlQueryStringReader.GetQueryStringById("GetAllCafeDetails", "Cafe");
                }
                else
                {
                    getQuery = SqlQueryStringReader.GetQueryStringById("GetCafeDetails", "Cafe");
                }

                List<SQLiteParameter> sqlParams = new List<SQLiteParameter>();
                sqlParams.Add(new SQLiteParameter("location", location));

                DBOperation dbo = new DBOperation();
                var dataReaders = dbo.ExecuteQueryWithReader(getQuery, sqlParams);
                var reader = dataReaders[0];

                while (reader.Read())
                {
                    DTO.DTO.CafeDetail cafeDetail = new DTO.DTO.CafeDetail()
                    {
                        id = reader["id"].ToString(),
                        name = reader["name"].ToString(),
                        description = reader["description"].ToString(),
                        logo = reader["logo"].ToString(),
                        location = reader["location"].ToString(),
                        employees = Convert.ToInt32(reader["employees"].ToString())
                    };
                    cafeDetails.Add(cafeDetail);
                }
                return cafeDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
