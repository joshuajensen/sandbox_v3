//Filename: DPCIValidator.js 
//Code to validate the product DPCI number input
define(
    ["validators/Validator"],

    function (Validator) {
        var defaultFormat = /^\d{3}-\d{2}-\d{4}$/;
        var defaultNumberFormat = /^\d{9}$/;
        var elevenDigitFormat = /^49\d{3}-\d{2}-\d{4}$/;
        var elevenDigitNumberFormat = /^49\d{9}$/;
        var replaceDashPattern = /\-/g;

        //DPCI Validator
        var DPCIValidator = function () {

        };
        DPCIValidator.prototype = new Validator();

        //validate
        DPCIValidator.prototype.validate = function (value) {
            return true;
        };

        //Checks the DPCI format
        DPCIValidator.prototype.format = function (value) {
            if (value == null) {
                return value;
            }
            value = value.trim();
            if (elevenDigitNumberFormat.test(value)) {
                return value.slice(2, 11);
            } else if (elevenDigitFormat.test(value)) {
                return value.slice(2, 13).replace(replaceDashPattern, '');
            } else if (defaultFormat.test(value)) {
                return value.replace(replaceDashPattern, '');
            } else if (defaultNumberFormat.test(value)) {
                return value;
            }
            return value;
        };
        return DPCIValidator;
    }
);