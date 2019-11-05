using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UserInterface
{
    public class CookiesUserIdProvider : IUserIdProvider
    {
        public string GetUserId(IRequest request)
        {
            if (request == null)
                throw new ArgumentNullException("request");
            Cookie cookie;
            if (request.Cookies.TryGetValue("username", out cookie))
            {
                return cookie.Value;
            }
            else
            {
                return null;
            }
        }
    }
}