define([
	'jquery',
	'backbone'
	],
	function(
		$, 
		Backbone){
			
var MainPlpCollection = Backbone.Collection.extend({
	
	initialize: function(models,options){
		//console.log('Plp Collection');
		this.key = 'VxN5ngNqKEh64MHSx5hdAt3NYHySh1Fo';
		this.offset = 1;
		this.facetRequestId = 0;			
	},
	
	  sync: function(method, model, options){  
		console.log('plp_collection.sync');
		console.log(options);
	    options.timeout = 10000; 
	 	//options.data = {BrowseNodeId: 623501};
	    options.dataType = "jsonp"; 
		options.processData = true;
	 	options.type = 'GET';
	    options.url = model.url();

	    return Backbone.sync(method, model, options);
	},
	
	 url: function() {
		
			return "https://api.target.com/v2/products/search?&key="+ this.key;		
	 }
});

	var main_plp_collection = new MainPlpCollection(); 
	
	return main_plp_collection;
	
});