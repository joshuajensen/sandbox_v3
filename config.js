requirejs.config({
	 //enforceDefine: true,
    baseUrl: "<%-baseURL%>",
    paths: {	     
		  "views": "../views",
		  "models":  "../models",
		  "collections":  "../collections",
		  "templates": "../templates",
		  "routes":  "../routes",
		  "packages": "../packages",
		   "lib": "../lib",
			"app": "../app",
			"marionette": "./backbone.marionette"
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
		  modernizr: {
		    exports: 'Modernizr'
		  },
	    marionette : {
	      deps : ['jquery', 'underscore', 'backbone'],
	      exports : 'Marionette'
	    }

	 },
	waitSeconds:5000
});

