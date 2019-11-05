using System.Web.Cors;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Cors;
using Owin;

namespace UserInterface
{
    public static class Startup
    {
        public static void Configuration(IAppBuilder app)
        {

            app.MapSignalR("/realtime", new HubConfiguration() { });

            GlobalHost.DependencyResolver.Register(typeof(IUserIdProvider),() => new CookiesUserIdProvider());
        }

    }
}
