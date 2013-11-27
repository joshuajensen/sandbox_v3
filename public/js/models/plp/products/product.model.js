define(['jquery','backbone'], 
function($, Backbone){
	
	var ProductModel = Backbone.Model.extend(
		{
			
		testvar: 'billy',

		initialize: function(attributes, options) {
	
		} 
	});
	
	return ProductModel;
		
});

