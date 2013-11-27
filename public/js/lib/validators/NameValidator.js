//Filename: NameValidator.js 
//Code to validate Name input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^[a-zA-Z\ ]+$/;

        //Name Validator
        var NameValidator = function () {
        };
        NameValidator.prototype = new Validator();

        //Validate the Name
        NameValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            } else {
                return false;
            }
        };
        return NameValidator;
    }
);













