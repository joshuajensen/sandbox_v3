//Filename: AccessCodeValidator.js 
//Code to validate the AccessCode input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^\s*\d{8}\s*$/;

        //AccessCode Validator
        var AccessCodeValidator = function () {

        };
        AccessCodeValidator.prototype = new Validator();

        //Validate The AccessCode
        AccessCodeValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            }
            else {
                return false;
            }
        };
        return AccessCodeValidator;
    }
);













