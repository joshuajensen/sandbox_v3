//Filename: SecurityCodeValidator.js 
//Code to validate the SecurityCode input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^\s*\d{3}\s*$/;

        //SecurityCode Validator
        var SecurityCodeValidator = function () {

        };
        SecurityCodeValidator.prototype = new Validator();
        //validate the SecurityCode
        SecurityCodeValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            }
            else {
                return false;
            }
        };
        return SecurityCodeValidator;
    }
);













