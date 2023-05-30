using System;
using System.Collections.Generic;
using System.Data.SQLite;
using System.Text;

namespace CafeManagement.Data.Interface
{
    public interface IDBOperation
    {
        int ExecuteQuery(string query, List<SQLiteParameter> sqlParams);
    }
}
