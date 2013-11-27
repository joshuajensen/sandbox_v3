//Filename: ZipCodeValidator.js 
//Code to validate the ZipCode input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^\d{5}$/;

        //ZipCode Validator
        var ZipCodeValidator = function () {
        };

        ZipCodeValidator.prototype = new Validator();

        //validate the ZipCode
        ZipCodeValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            }
            else {
                return false;
            }
        };
        return ZipCodeValidator;
    }
);













