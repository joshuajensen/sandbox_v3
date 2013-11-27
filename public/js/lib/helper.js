define(['jquery','backbone'], 
    function($, Backbone){
helper = {
    /** @searchUrl searches the current url for passed in string, returns true if the string is detected*/
    searchUrl: function(string){
        var url = window.location.href;
        var findString = url.search(string);
        if(findString == -1){
            return false;
        }
        return true;
    },
    /** @getDPR returns the value of the current device's device pixel ratio, for use in determining the appropriate assets size to request */
    getDPR: function(){
        var dpr = 1;
        if(window.devicePixelRatio !== undefined){
            dpr = window.devicePixelRatio;
        } 
        return dpr;
    },
    /** @isSecure checks if the current session is through http or https. returns true if current on a secure page */
    isSecure: function(){
        if(window.location.protocol == "https:"){
            return true;
        }
        return false;
    },
    /** @isPrivateBrowse checks to see if local storage is available, if this fucntion returns true we can assume the user has safari private browse mode enabled*/
    isPrivateBrowse: function(){ 
        var storageTestKey = 'sTest',
            storage = window.sessionStorage;
        try {
            storage.setItem(storageTestKey, 'test');
            storage.removeItem(storageTestKey);
            return false;
        } catch (e) {
            if (e.code == DOMException.QUOTA_EXCEEDED_ERR && storage.length == 0) {
                return true;
            } 
            else {
                return false;
                throw e;
            }
        }
    },
    /** @detectLegacy retruns true if the UA string matches any of the known devices that do not support @fontface*/
    detectLegacy: function(){
        if (!!navigator.userAgent.match(/(Android (2.0|2.1|2.2|2.3|2.3.3|4.0.3))|(Nokia)|(Opera (Mini|Mobi))|(w(eb)?OSBrowser)|(UCWEB)|(Windows Phone)|(XBLWP)|(ZuneWP)|(Firefox)/) || navigator.userAgent.search('Android 2.3') != -1) {
            return true;
        } 
        return false;
    },
    /** @ariaToggle accepts an array of elements (for example: helper.ariaToggle(['#nav','.main-content']); 
        and will invert the current value of the element's aria-hidden attribute. also accepts a "flag" arg, expecting either
        true or false to manually toggle the aria hidden attr*/
    ariaToggle: function(array, flag){ 
        for(i=0; i<array.length; i++){
            var el = $(array[i]);
            var aria = el.attr('aria-hidden');
            if(aria == "undefined" || aria == "" || aria == null){
                el.attr('aria-hidden', 'false');
                aria = el.attr('aria-hidden');
                if(aria == "undefined" || aria == "" || aria == null){console.log('one of the defined aria elements does not exist'); return;}
            } 
            if(flag != null || flag != "undefined"){
                el.attr('aria-hidden', flag)
            }
            else{
                (aria == "true") ? el.attr('aria-hidden', 'false'):el.attr('aria-hidden', 'true');
            }
            
        }
    },
	parseQueryString: function (queryString) {
        var params = {};
        if (queryString) {
            _.each(
                _.map(decodeURI(queryString).split(/&/g), function (el, i) {
                    var aux = el.split('='), o = {};
                    if (aux.length >= 1) {
                        var val = undefined;
                        if (aux.length == 2)
                            val = aux[1];
                        o[aux[0]] = val;
                    }
                    return o;
                }),
                function (o) {
                    _.extend(params, o);
                }
            );
        }
        return params;
    }
     
};

return helper;

});