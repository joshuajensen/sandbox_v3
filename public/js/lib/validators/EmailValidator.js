//Filename: EmailValidator.js 
//Code to validate the Email input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {

        var defaultFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //Email Validator
        var EmailValidator = function () {

        };
        EmailValidator.prototype = new Validator();

        //Validate The Email id
        EmailValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            }
            else {
                return false;
            }
        };

        return EmailValidator;
    }
);













