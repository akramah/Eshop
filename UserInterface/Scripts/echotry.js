$(function () {
    var connection = $.connection("/realtime/echo");
    connection.logging = true;

    connection.received(function (data) {
        $("body").append(data + "<br />");
    });

    connection.error(function (err) {
        alert("Uups! It seems there is a problem. \n" +
            "Error: " + err.message);
    });

    connection.start().done(function () {
        $("#send").click(function () {
            connection.send($("#text").val());
            $("#text").val("").focus();
        });
    });
});
