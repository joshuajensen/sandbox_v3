define(['jquery','backbone','text!templates/plp/products/product.html'], 
	function($, Backbone,html){
//return new constructor
	var ProductView = Backbone.View.extend({
		tagName: 'li',
		template: _.template( html),
		initialize: function(){
		},	
		render: function(){
		console.log('render product view');
		console.log(this.el);
		console.log(this.model);
		return	this.$el.html(this.template(this.model.toJSON()));	
		},
	});
	
	return ProductView;

});