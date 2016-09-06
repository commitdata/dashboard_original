using System.Web.Http;
using slim_commit.Helpers;

namespace slim_commit.Controllers
{
    [CommitCorsPolicy]
    public class BaseApiController : ApiController
    {
    }
}
