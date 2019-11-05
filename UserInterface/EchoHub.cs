using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.IO;
using System.Web.Mvc;
using System.Net;
using BLL_Business_Logic_Layer_;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;
using UserInterface.Models;

namespace UserInterface
{
    public class EchoHub : Hub
    {
        private VendorBs vendorobj;
        private UserBs userobj;

        private static int _visitors = 0;
        
        //private static ConcurrentDictionary<string, UserData> _users = new ConcurrentDictionary<string, UserData>();
        public EchoHub()
        {
            vendorobj = new VendorBs();
            userobj = new UserBs();
        }
        public override async Task OnConnected()
        {
            Interlocked.Increment(ref _visitors);
            
            
            await Clients.User("vendor").Message("! Total visitors: " + _visitors);
            await Clients.Caller.Message("Hey, welcome!");
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            Interlocked.Decrement(ref _visitors);
            return Clients.User("vendor").Message("Current visitors: " + _visitors);
        }
        public Task Join(int[] allowners)
        {
            var name = Context.User.Identity.Name;
            int uid = userobj.GetUid(name);
            int x = 0;
            foreach (int item in allowners)
            {
                if(item == uid)
                {
                    x++;
                };
            }
            if(x == 1)
            {
                return Groups.Add(Context.ConnectionId, "hasorder");
            }
            if(x == 0)
            {
                return Groups.Remove(Context.ConnectionId, "hasorder");
            }
            return null;
        }
        public Task Leave(string GoingToSell)
        {
            return Groups.Remove(Context.ConnectionId, GoingToSell);
        }
        public Task MessageToGroup(string text)
        {
            return Clients.Group("hasorder").Message(text);
        }

        public Task Broadcast(int message)
        {
            string a =null;
            if (message == 2)
            {
                a = "vendor";
            }
            if (message == 3)
            {
                a = "consumer";
            }
            if (message == 4)
            {
                a = "guest";
            }
            return Clients.User("vendor").Message("a "+ a + " just joined the group");
            //return Clients.All.Message(Context.ConnectionId + "> " + message);
        }
        public Task Checkout(int[] vids)
        {
            var name = Context.User.Identity.Name;
            int[] arr = new int[vids.Length];
            //foreach (int vid in vids)
            //{
            //    int uid = vendorobj.GetUidByVid(vid);
            //    userobj.Uname(uid);
            //}
            for(int i=0; i<vids.Length; i++)
            {
                arr[i] = vendorobj.GetUidByVid(vids[i]);
            }

            //return Groups.Add(Context.ConnectionId, GoingToSell);
            //return Clients.User("vendor").Message("a " + " just joined the group");
            return Clients.All.Isorder(arr);
        }

    }
}