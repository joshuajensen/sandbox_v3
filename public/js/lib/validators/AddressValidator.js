//Filename: AddressValidator.js 
//Code to validate the Address input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^[a-zA-Z0-9-, \/] ?([a-zA-Z0-9-,. \/]|[a-zA-Z0-9-,. \/] )*[a-zA-Z0-9-, \/]$/;

        //Address Validator
        var AddressValidator = function () {

        };
        AddressValidator.prototype = new Validator();

        //Validate The Address
        AddressValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            } else {
                return false;
            }
        };
        return AddressValidator;
    }
);













