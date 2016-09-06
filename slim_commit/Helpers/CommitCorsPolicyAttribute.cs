using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace slim_commit.Helpers
{
    /// <summary>
    /// Custom CORS Policy Providers for this Web Api application
    /// </summary>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
    public class CommitCorsPolicyAttribute : Attribute , ICorsPolicyProvider    
    {
        private readonly CorsPolicy _policy;

        /// <summary>
        /// Constructor
        /// </summary>
        public CommitCorsPolicyAttribute()
        {
            // Create a CORS policy.
            _policy = new CorsPolicy
            {
                AllowAnyMethod = true,
                AllowAnyHeader = true,
                AllowAnyOrigin = true // we can set this to false, if we want to add only fwe allowed origins
            };

            // Add allowed origins.
            // _policy.Origins.Add("http://dashboard-ng2.azurewebsites.net"); 
        }

        public Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            return Task.FromResult(_policy);
        }
    }
}