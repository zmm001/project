function AspNetComet(handler, publicToken, privateToken, onmessage, ontimeout, oncancelled, onerror)
{
    this.lastMessageId = 0;
    this.publicToken = publicToken;
    this.privateToken = privateToken;
    this.handler = handler;
    this.onmessage = onmessage;
    this.ontimeout = ontimeout;
    this.oncancelled = oncancelled;
    this.onerror = onerror;
    this.running = true;
}

AspNetComet.prototype.stopWaiting = function()
{
    this.running = false;
}

AspNetComet.prototype.startWaiting = function()
{
    this.running = true;
    this.waitForMessages();
}
        
AspNetComet.prototype.waitForMessages = function()
{
    var me = this;
    //
    //  ok, call the server channel handler
    $.ajax(
    {
        url: this.handler,
        type: "POST",
        data: { privateToken: this.privateToken, lastMessageId: this.lastMessageId },
        success: function(response)
        {
            var messages = $.evalJSON(response);
            if (messages != null && messages.length > 0)
            {
                var keepWaiting = me.running;
                for (var i = 0; i < messages.length; i++)
                {
                    var message = messages[i];
                    if (me.lastMessageId < message.mid)
                        me.lastMessageId = message.mid;

                    switch (message.n.toLowerCase())
                    {
                        case "timedout":
                            //  dont worry
                            me.ontimeout();
                            break;
                        case "cancelled":
                            //  dont worry about it, we have been cancelled
                            //  so dont continue
                            keepWaiting = false;
                            me.oncancelled();
                            break;
                        case "message":
                            me.onmessage(message.c);
                            break;
                    }
                }
                if (keepWaiting)
                    me.waitForMessages();
            }
        },
        error: function()
        {
            me.onerror();
        }
    });
}