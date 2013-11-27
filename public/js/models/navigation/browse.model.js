define([
	'jquery',
	'backbone'
	], 
	function(
		$, 
		Backbone
	){
	
	var BrowseModel = Backbone.Model.extend(
		{
		defaults: {
            index: '',
            element: ''
        },
		initialize: function(attributes, options) {
			console.log('browse model');
		},
		toggle: function(attr){
			if(this.get(attr) == false){
				this.set(attr, true);
			}
			else{
				this.set(attr, false);
			}
		}
		
      	
	});
	
	return BrowseModel;
		
});

