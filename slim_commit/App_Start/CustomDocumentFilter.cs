using Swashbuckle.Swagger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.OData.Routing;

namespace slim_commit.App_Start
{

    public class CustomDocumentFilter : IDocumentFilter
    {
        public void Apply(SwaggerDocument swaggerDoc, SchemaRegistry schemaRegistry, IApiExplorer apiExplorer)
        {
            var thisAssemblyTypes = Assembly.GetExecutingAssembly().GetTypes().ToList();
            var controllers = Assembly.GetExecutingAssembly().GetTypes().Where(type => typeof(ApiController).IsAssignableFrom(type));
            var odataRoutes = GlobalConfiguration.Configuration.Routes.Where(a => a.GetType() == typeof(ODataRoute)).ToList();
            var route = odataRoutes.FirstOrDefault() as ODataRoute;
            foreach (Type controller in controllers)
            {
                string name = controller.Name.Replace("Controller", "");
                if (swaggerDoc.paths.Keys.Contains("/Api/" + name))
                {
                    swaggerDoc.paths["/Api/" + name].get = null;
                }
            }
        }
    }
    [AttributeUsage(AttributeTargets.Method)]
    public sealed class SwaggerOperationAttribute : Attribute
    {
        public SwaggerOperationAttribute(string operationId)
        {
            this.OperationId = operationId;
        }

        public string OperationId { get; private set; }
    }

    public class SwaggerOperationNameFilter : IOperationFilter
    {
        public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            operation.operationId = apiDescription.ActionDescriptor
            .GetCustomAttributes<SwaggerOperationAttribute>()
                .Select(a => a.OperationId)
                .FirstOrDefault();
        }
    }

    public class MultipleOperationsWithSameVerbFilter : IOperationFilter
    {
        /*public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
        {
            if (operation.parameters != null)
            {
                foreach (var parameter in operation.parameters)
                {
                    if (parameter.schema != null && parameter.schema.type == "boolean")
                    {
                        parameter.type = "boolean";
                    }
                }
            }
        }*/
        public void Apply(
             Operation operation,
             SchemaRegistry schemaRegistry,
             ApiDescription apiDescription)
        {
            if (operation.parameters != null)
            {
                operation.operationId += "By";
                foreach (var parm in operation.parameters)
                {
                    operation.operationId += string.Format("{0}", parm.name);
                }
            }
        }
    }
}