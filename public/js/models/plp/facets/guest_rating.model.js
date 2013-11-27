define(['jquery','backbone'], 
function($, Backbone){
	
	var GuestRatingModel = Backbone.Model.extend(
		{			
		initialize: function(attributes, options) {			
			console.log('guest_rating model initialized');
			//console.log('this.attributes');
			//console.log(this.attributes);
		}		
	});
	
	return GuestRatingModel;
		
});