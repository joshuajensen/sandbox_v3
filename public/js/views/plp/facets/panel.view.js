define(['jquery',
'backbone',
'text!templates/plp/facets/panel.html'
], 
	function($, Backbone,html, GuestRatingModel, router){
//return new constructor
	var PanelView = Backbone.View.extend({
		
		tagName: 'li',

		template: _.template( html),
		
		initialize: function(){
			
			//console.log('PanelView.initialize');
			
			this.model.on('change:checked', this.displayCheck, this);
			this.displayCheck();		
	
		},	
		render: function(){
			var view = this.$el.html(this.template(this.model.toJSON()));	
		  	return view;
		},
		
		events: {'click': 'checked'},

		checked: function(e){
			this.model.set('checked', !this.model.get('checked'));	
		},
		
		displayCheck: function(e){

				if(this.model.get('checked')==true){
					
					$(this.el).children('span').last().addClass('icon-icon_checkmark');
					$(this.el).addClass('temp-check');
					
					
				}else {
				
					$(this.el).children('span').last().removeClass('icon-icon_checkmark');
					$(this.el).removeClass('temp-check');
				}
			
		}		
		
	});
	
	return PanelView;

});