define([
	'jquery',
	'backbone'
	], 
	function(
		$, 
		Backbone
	){
	
	var NavigationModel = Backbone.Model.extend(
		{
		defaults: {
            legacy: false,
			navigation_active: false,
			search_active: false,
			browse: false
        },
		initialize: function(attributes, options) {
			console.log('navigation model');
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
	
	return NavigationModel;
		
});

