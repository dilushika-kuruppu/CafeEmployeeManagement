using CafeManagement.Data.Interface;
using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Text;
using System.Data;

namespace CafeManagement.Data.DataAccess
{
    public class DBOperation : IDBOperation
    {
        protected SQLiteConnection conn;

        private SQLiteConnection CreateConnection()
        {
            try
            {
                conn = new SQLiteConnection("data source=H:\\Assessment\\SQLite\\CafeManagement.db", true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return conn;
        }

        private void CloseConnection(SQLiteConnection conn)
        {
            try
            {
                if (conn != null)
                {
                    conn.Close();
                    conn.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int ExecuteQuery(string query, List<SQLiteParameter> sqlParams)
        {
            int result;
            try
            {
                foreach (SQLiteParameter sqlParam in sqlParams)
                {
                    query = query.Replace("@" + sqlParam.ParameterName, "'" + sqlParam.Value.ToString() + "'");
                }

                DBOperation dbo = new DBOperation();
                conn = dbo.CreateConnection();
                conn.Open();
                SQLiteCommand cmd = new SQLiteCommand(conn);
                cmd.CommandText = query;
                result = cmd.ExecuteNonQuery();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }
        }

        public int ExecuteQuery(string query)
        {
            int result;
            try
            {
                DBOperation dbo = new DBOperation();
                conn = dbo.CreateConnection();
                conn.Open();
                SQLiteCommand cmd = new SQLiteCommand(conn);
                cmd.CommandText = query;
                result = cmd.ExecuteNonQuery();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }
        }

        public IDataReader[] ExecuteQueryWithReader(string query, List<SQLiteParameter> sqlParams)
        {
            IDataReader[] result = new IDataReader[1];
            try
            {
                foreach (SQLiteParameter sqlParam in sqlParams)
                {
                    query = query.Replace("@" + sqlParam.ParameterName, "'" + sqlParam.Value.ToString() + "'");
                }

                DBOperation dbo = new DBOperation();
                conn = dbo.CreateConnection();
                conn.Open();
                SQLiteCommand cmd = new SQLiteCommand(conn);
                cmd.CommandText = query;
                result[0] = cmd.ExecuteReader();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                CloseConnection(conn);
            }
        }
    }
}
