//Filename: PhoneNumberValidator.js 
//Code to validate the PhoneNumber input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^\d{10}$/;

        //PhoneNumber Validator
        var PhoneNumberValidator = function () {

        };

        PhoneNumberValidator.prototype = new Validator();

        //validate the  PhoneNumber
        PhoneNumberValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            } else {
                return false;
            }
        };
        return PhoneNumberValidator;
    }
);