define(['jquery','backbone'],
	function($, Backbone){

	var Categories = Backbone.Collection.extend({
		initialize: function(models,options){
			console.log('Categories Collection');
			this.key = 'VxN5ngNqKEh64MHSx5hdAt3NYHySh1Fo';	
			this.fetch();	
		},
		

		sync: function(method, model, options){  
		    options.timeout = 10000; 
		    options.dataType = "jsonp"; 
			options.processData = true;
		 	options.type = 'GET';
		    options.url = this.url();
			console.log(options);
		    return Backbone.sync(method, model, options);
		},
		
		url: function() {
			return "http://api.target.com/v2/products/categories/5?key="+ this.key;		
		},
		parse: function(response) {
			console.log('colection of categories')
			console.log(response.childnodes);
		    return response.childnodes;
		}
	});
	var categories_collection = new Categories(); 

	
	return categories_collection;
	
});
