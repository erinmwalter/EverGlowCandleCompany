using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess.DbModels
{
    public class DbConnectionOptions
    {
        public const string Key = "DbConfiguration";
        public string ConnectionString { get; set; } = String.Empty;
    }
}
