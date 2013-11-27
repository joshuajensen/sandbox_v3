define([
	"views/plp/facets/main_facets.view",
	'models/plp/facets/facets.model'
	], function ( 
		MainFacetsView, 
		FacetsModel
		) {
	
	var AppRouter = Backbone.Router.extend({
		
		initialize: function(){
			
			console.log('initialize the router');
		},
		
		
		
		routes: {
			"":                       		"home",  
			"!nav/:browsenode":        		"nav",
			"!search/:keywords/:facets":  	"search",
			"!search/:keywords":  	"search",
			"!mobile/:categories":   		"mobile"
		},
		mobile: function( categories ) {
			console.log(categories);
			console.log('navigation');
			//console.log(navigation);
		},

		
		home: function(){
			console.log('home page');

			  var url = '/home';			
			$.ajax({ 
			  type: "GET",   
			  dataType: "html",
			  cache: true,
			  url: url,
			  error: function(){
					console.log('there was an error loading your html');
			      },
				success: function(data){
					$('#main').html(data);
					
					app.currentpage = "home";
				}
			}); 
		}, 
		search: function(keywords, facets){
			console.log('SEARCH');
			console.log("FACETS");
			console.log(facets);
				var promise = app.main_plp_collection.fetch({
					reset:true,
					data:{searchTerm: keywords, facets: facets}				
				});
				
				
				$.when(promise).then(function(){
					
					console.log('promise');
					
					console.log(promise);
					
					//create a cleanup method for facets and products
					
					
						if($('#main').children('#main-products-view').length > 0){

							console.log("main products view should be added to dom");
							console.log($('#main').children('#main-products-view'));
							app.view.main_products_view.render();


						}else{
							
							console.log('home page is still attached to the dom');
							app.page.main_plp_view.render();
							app.currentpage = "plp";
							app.view.main_products_view.render();
							

						}			

				});
				
		  }

	});
		/*var app_router = new AppRouter();
		 //Backbone.history.start({pushState: true, root:'/' });
	    Backbone.history.start({ root:'/' }); */

  return AppRouter;

});