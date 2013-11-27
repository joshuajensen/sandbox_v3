//Filename: GiftCardNumberValidator.js 
//Code to validate the GiftCardNumber input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^\d{14,15}$/;

        //GiftCard Number Validator
        var GiftCardNumberValidator = function () {

        };
        GiftCardNumberValidator.prototype = new Validator();

        //validate the GiftCardNumber
        GiftCardNumberValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            }
            else {
                return false;
            }
        };
        return GiftCardNumberValidator;
    }
);

