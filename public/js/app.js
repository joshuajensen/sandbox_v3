define([
	'jquery', 
	'backbone', 
	'marionette', 
	'underscore', 
	'modernizr', 
	'routes/router', 
	'views/navigation/main_navigation.view',
	"collections/plp/main_plp.collection",
	'views/plp/main_plp.view',
	"views/plp/products/main_products.view"
	],
    function (
	$, 
	Backbone, 
	Marionette, 
	_, 
	Modernizr,
	AppRouter, 
	NavigationView,  
	main_plp_collection,
	MainPlpView,
	main_products_view 	
	) {
		
			 'use strict';

        var app = new Backbone.Marionette.Application();

		//for testing facets to be removed...
		window.searchTerm = "bike";

        app.addInitializer(function () {
	
			console.log("MARIONETTE");
			
			console.log("Main Products View");
			
			console.log(main_products_view);
			
			console.log('XXXXX');
	
			app.page = {};
			app.view = {};
	         
			console.log('Initialize the Navigation');
			var fontsLoaded = false;
												
				$(document).ready(function(){
				var navigation_view = new NavigationView();
				
				
				setTimeout(function(){ /*if content doesn't load within 1.5 seconds, force icon font to display*/
	               if(!fontsLoaded){
	                   $('html').addClass('loaded');
	               }
	           }, 1500);
				
				
				
									 	
	        	});


			
		});

		app.on('initialize:after', function(){

			console.log("AFTER INITIALIZATION");
			console.log(this);

			//initialize the products list collection
			app.main_plp_collection = main_plp_collection;

			//initialize the main_plp_view			
			app.page.main_plp_view = new MainPlpView();

			//--initialize each subview
			app.view.main_products_view = main_products_view;

			// --facets disabled for now...
			
			
			//for now.... a currentpage will keep track ...  of ....
			
			app.currentpage = "not yet an application";


			//initialize the router

			app.router = new AppRouter();

		});
		
		
		

		


		return app;

});

