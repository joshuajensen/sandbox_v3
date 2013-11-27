define(function (require) {
        app = require('../app');
		app.start();
		
		//start the history
		Backbone.history.start({root: "/"});

});




