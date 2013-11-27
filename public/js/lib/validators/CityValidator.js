//Filename: CityValidator.js 
//Code to validate the City input
define(
    ["jquery", "validators/Validator", "page"],

    function ($, Page, Validator) {
        var defaultFormat = /^[a-zA-z ] ?([a-zA-z ]|[a-zA-z ] )*[a-zA-z ]$/;

        //CityValidator
        var CityValidator = function () {

        };
        CityValidator.prototype = new Validator();

        //Validate The City
        CityValidator.prototype.validate = function (value) {
            if (defaultFormat.test(value)) {
                return true;
            } else {
                return false;
            }
        };
        return CityValidator;
    }
);













