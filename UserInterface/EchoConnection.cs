using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using System.Data;
using System.Threading;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.AspNet.SignalR.Infrastructure;

namespace UserInterface
{
    public class EchoConnection : PersistentConnection
    {
        private static int _connections = 0;

        protected override async Task OnConnected(IRequest request, string connectionId)
        {
            Interlocked.Increment(ref _connections);
            await Connection.Send(connectionId, "Welcome, " + connectionId + "!");
            await Connection.Broadcast("New connection " + connectionId + ". Current visitors: " + _connections);
        }
        protected override Task OnDisconnected(IRequest request, string connectionId,bool asd)
        {
            Interlocked.Decrement(ref _connections);
            return Connection.Broadcast(connectionId + " closed. Current visitors: " + _connections);
        }

        protected override Task OnReceived(IRequest request, string connectionId, string data)
        {
            var message = connectionId + ">> " + data;
            return Connection.Broadcast(message);
        }

    }
}