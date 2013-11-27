define([
	'jquery',
	'backbone',
	'text!templates/plp/main_plp.html', 
	'collections/plp/main_plp.collection'
	], 
	function(
		$, 
		Backbone,
		html, 
		main_plp_collection
		){
//return new constructor
	var MainPlpView = Backbone.View.extend({
		
		el: '#main',
		
		collection: main_plp_collection,

		template: _.template( html),
		
		initialize: function(){
			console.log('initialize the main plp view');
			this.render();
		},	
		render: function(){
		   var view = this.$el.html(this.template());	
		   return view;
		},
		
		events: { }
		
	});
	
	return MainPlpView;

});