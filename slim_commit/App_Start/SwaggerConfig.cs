using System.Web.Http;
using Swashbuckle.Application;
using System.Linq;
using System.Web;
using slim_commit;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace slim_commit
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration 
                .EnableSwagger(c =>
                    {
                        c.SingleApiVersion("v1", "slim_commit");
                        c.DocumentFilter<slim_commit.App_Start.CustomDocumentFilter>();
                        c.UseFullTypeNameInSchemaIds();
                        c.IgnoreObsoleteActions();
                        c.ResolveConflictingActions(apiDescriptions => apiDescriptions.FirstOrDefault());
                       
                    })
                .EnableSwaggerUi(c =>
                    {
                        c.InjectJavaScript(thisAssembly, "slim_commit.Scripts.swagger.basic-auth.js");
                    });
        }
    }
}
