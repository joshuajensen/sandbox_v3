//Filename: QuantityValidator.js 
//Code to validate the Quantity input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^(0?[1-9]|[1-9][0-9])$/;

        //Quantity Validator
        var QuantityValidator = function () {

        };
        QuantityValidator.prototype = new Validator();

        //validate the Quantity
        QuantityValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return value;
            } else {
                return false;
            }
        };
        return QuantityValidator;
    }
);


