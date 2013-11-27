define(['jquery','backbone'], 
function($, Backbone){
	
	var FacetsModel = Backbone.Model.extend(
		{
						
		defaults: {
			sortOpen: false,
			filterOpen: false,
			onlineChecked: true,
			inStore: true,
			facets: [],
			category: "",
			facetRequest: "0"			
		},

	});
	
	return FacetsModel;
		
});