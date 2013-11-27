// FileName : MapHelper.js


define(
    ["jquery", "tgt_mob"],

    function ($, TGT_MOB) {

        idleTimer = null;
        idleState = false;
        idleWait = TGT_MOB.Config.timeoutIntervel * 1000;


        var TimeoutHelper = function () {
        };

        TimeoutHelper.prototype.init = function () {

            $('*').bind('mousemove keydown scroll click', this.settimeout);

            $("body").trigger("click");
        };

        TimeoutHelper.prototype.settimeout = function () {

            clearTimeout(idleTimer);

            if (idleState == true) {
                // Reactivated event
                console.log("Welcome Back.");
            }

            idleState = false;

            idleTimer = setTimeout(function () {

                // Idle Event
                console.log("You've been idle for " + idleWait / 1000 + " seconds.");
                idleState = true;
                window.location.href = "#login/sessionExpire";
            }, idleWait);
        };

        TimeoutHelper.prototype.hold = function () {
            clearTimeout(idleTimer);
            idleState = false;
            $('*').unbind('mousemove keydown scroll click', this.settimeout);
        }

        return TimeoutHelper;
    }
);