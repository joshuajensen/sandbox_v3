define([
	'jquery',
	'backbone'
	], 
	function(
		$, 
		Backbone
	){
	
	var SearchModel = Backbone.Model.extend({
		defaults: {
            searchTerm: '',
        },
	    initialize: function(){
	    	console.log('search model');
	    }        
	});

	return SearchModel;
		
});




