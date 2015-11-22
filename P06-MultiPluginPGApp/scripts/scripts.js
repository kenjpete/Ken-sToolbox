//device ready function
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    //devicePlatform = CheckDevice();
    //$("#DivDevice").html("Device: " + devicePlatform);
    $("#DivFlashlight").show();
    $("#DivNetwork").show();

    document.getElementById("DivCapture").style.display = "block";

    document.getElementById("btnImage").addEventListener("click", function () {
        // start image capture
        navigator.device.capture.captureImage(captureSuccess, captureError, { limit: 3 });
    });
}

$(document).ready(function () {
    $(function () {
        var $menu = $('nav#menu'),
            $html = $('html, body');

        $menu.mmenu({
            dragOpen: true
        });

        $menu.find('li > a').on('click',
            function () {
                var href = $(this).attr('href');
                if (href.slice(0, 1) == '#') {
                    for (var num = 0; num <= 4; num++) {
                        var divNum = href.slice(1, 2);
                        if (num == divNum)
                            $("#Div" + num).show();
                        else
                            $("#Div" + num).hide();
                    }
                    $menu.one('closed.mm');
                }
            }
        );
    });
});



//Flashlight functions
$("#btnToggleLight").click(function () {
    if (this.value == "Turn Light ON") {
        TurnOnFlashLight();
        this.value = "Turn Light OFF"
    } else {
        TurnOffFlashLight();
        this.value = "Turn Light ON"
    }

});

function TurnOnFlashLight() {
    window.plugins.flashlight.switchOn();

}

function TurnOffFlashLight() {

    window.plugins.flashlight.switchOff();
}

// image capture callback
var captureSuccess = function (mediaFiles) {
    var i, path, len, html;
    html = "";
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        html += "<p>" + path + "</p>";
    }
    document.getElementById("DivOutput").innerHTML = html;
};

// image capture error callback
var captureError = function (error) {
    document.getElementById("DivOutput").innerHTML = 'Capture Error: ' + error.code;
};

//Get network info
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}
