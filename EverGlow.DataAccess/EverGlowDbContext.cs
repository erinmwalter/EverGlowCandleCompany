using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverGlow.DataAccess
{
    public class EverGlowDbContext
    {
        private readonly IConfiguration _config;
        private readonly string? _connString;

        public EverGlowDbContext(IConfiguration config)
        {
            _config = config;
            _connString = _config.GetConnectionString("EverGlowConnString");
        }

        public IDbConnection CreateConnection() => new SqlConnection(_connString);
    }
}
