define([
	'jquery',
	'backbone', 
	'collections/plp/main_plp.collection',
	'text!templates/plp/products/main_products.html',
	'models/plp/products/product.model',
	'views/plp/products/product.view'
	],
	function($, Backbone, main_plp_collection, html, ProductModel, ProductView){

 	var MainProductsView = Backbone.View.extend({
	 tagName: 'ol',
     className: 'products',
	
	template: html,

		initialize: function () { 
			//console.log('initialize the main product view');

			this.collection = main_plp_collection;
			console.log('this el');
			console.log(this.template);
			console.log(this.el);
			_.bindAll(this,'render');
			this.collection.on('reset',this.addAllProducts,this);
			this.collection.on('add',this.addAllProducts,this);
			//this.render();   
	    },
	    render: function () {

			console.log('main products view render');
			
			console.log($('#main-products-view').html($(this.template).html(this.el)));

	        return $('#main-products-view').html($(this.template).html(this.el));
	    },
		addAllProducts: function(data){	
			this.removeAllProducts();
			_.each(this.collection.models[0].attributes.CatalogEntryView, function(product){
				//window.collection = this.collection;
				var model = new ProductModel(product);
				var view = new ProductView({model: model});
				$(this.el).append(view.render());
			}, this);	
			//this.render();    			
		},
		removeAllProducts: function(data){
			$(this.el).html("");
		}
	});
	
	var main_products_view = new MainProductsView();
	return main_products_view;
	
});