using System;
using System.Collections.Generic;
using System.Text;

namespace CafeManagement.DTO.DTO
{
    public class EmployeeDetail
    {
        public string id { get; set; }
        public string name { get; set; }
        public string email_address { get; set; }
        public int phone_number { get; set; }
        public string gender { get; set; }
        public int days_worked { get; set; }
        public string cafe { get; set; }
    }
}
