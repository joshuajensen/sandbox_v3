//Filename: AlphanumericValidator.js 
//Code to validate the Promocode and Teammember Number input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^[A-Za-z0-9]+$/;

        //Alphanumeric Validator
        var AlphanumericValidator = function () {

        };
        AlphanumericValidator.prototype = new Validator();

        //Validate The Promocode and Teammember Number
        AlphanumericValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            } else {
                return false;
            }
        };
        return AlphanumericValidator;
    }
);













