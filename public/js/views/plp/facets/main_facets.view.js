define([
	'jquery',
	'backbone',
	'text!templates/plp/facets/main_facets.html', 
	'views/plp/main_plp.view',
	'views/plp/facets/section.view', 
	'models/plp/facets/panel.model', 
	'collections/plp/facets/section.collection'
	], 
	function(
		$, 
		Backbone,
		html, 
		MainPlpView, 
		SectionView, 
		PanelModel, 
		SectionCollection
		){
//return new constructor
	var MainFacetsView = MainPlpView.extend({			
		el: '#main-facets-view',

		template: _.template( html),
		
		selected: false,
		
		initialize: function(){
			
			console.log('MainFacetsView.initialize');

		
			//console.log(this.constructor.__super__.collection);
			this.collectionMap = new Object();
			window.cMap = this.collectionMap;
			//global event 
			App.vent.on('facetAdded', this.addFacet, this);
			App.vent.on('facetRemoved', this.removeFacet, this);

			this.model.on('change:onlineChecked', this.handleSortChanged, this);			
			//this.model.on('change:facets', this.updateFacets, this);

			this.model.on('change:sortOpen',this.displaySort, this);
			this.model.on('change:filterOpen',this.displayFilters, this);
			
			//used when the facets were updated on demand.
			this.collection.on('reset', this.facetsMenu, this);

			this.render();
			
		},	
		render: function(){
		  var view = this.$el.html(this.template());	
		  return view;
		},
		
		facetsMenu: function(e){
			
			if(this.selected == false){
				this.doFacets();
			}else if(this.selected == true){
				this.updateFacetsMenu();
			}
			
		},
		
		events: {
		'click #sort_show_button': 'handleSortMenuClick',
		'click #filter_show_button': 'handleFilterSortClick',
		'click #guest-rating': 'openRatings',
		'click #onlineFilter':'handleOnlineFilter',
		'click #apply_btn': 'handleApplyBtn'
		 },
		
		addFacet: function(facet){
			//alert('addFacet called');	
			
			//first update the facetRequest before the change event gets fired
			var facetRequest = this.model.get('facetRequest');
			//console.log('facetRequest: ' + facetRequest);
			facetRequest = Number(facetRequest + 1);
			//console.log(facetRequest);
			this.model.set('facetRequest', facetRequest );		
			//console.log(facet);	
			//console.log(this.model);
			var facets = _.clone(this.model.get('facets'));
			facets.push(facet);
			var facets = this.model.set('facets', facets);
			
		},
		
		removeFacet: function(facet){
			//alert('removeFacet called');			
			//console.log(facet);	

			var facets = _.clone(this.model.get('facets'));
			var facetToRemove = _.indexOf(facets, facet);
			
			if (facetToRemove != -1 ){	
				//console.log("Remove this facet: " + facetToRemove);
				var updatedFacets = facets.splice(facetToRemove, 1);
				//console.log(updatedFacets);
				this.model.set('facets', updatedFacets);	
			} 
			
			var facets = this.model.set('facets', facets);
			var index = this.model.get('facetRequest');
			//console.log(index);
			index++;
			//console.log(index);
			
			this.model.set('facetRequest', index++);
					
			//Backbone.history.navigate('!search/' + window.searchTerm + "/" + e ,{trigger:true});
			
		},
		
		updateFacets: function(e){
			
			//console.log('update the facets object or category');
			
			//console.log(e.changed);
			
			var request = this.model.get('facets');
			
			if (request.length > 0){				
				request = request.join();
				//make the request to the router to get the new product results
				Backbone.history.navigate('!search/' + window.searchTerm + "/" + request + "/" +  this.model.get('facetRequest'),{trigger:true});
				this.handleSortMenuClick();				
			}else{				
				//pass null if the facets object is empty  ... currently the router is based on order of params...
				Backbone.history.navigate('!search/' + window.searchTerm + "/" + null + "/" +  this.model.get('facetRequest'),{trigger:true});
				this.handleSortMenuClick();				
			}	
		},
		
		
		handleOnlineFilter: function(e){			
			//console.log('handle online filter');
			this.model.set('onlineChecked', !this.model.get('onlineChecked'));
			//model change event will fire the new sort filter for product list.
			//console.log(this.model.get('onlineChecked'));
		},
		
		handleSortChanged: function(e){	
			//console.log('handleSortChanged');
			if(this.model.get('onlineChecked')==true){	
				console.log('include online in the product list results');
			}else if(this.model.get('onlineChecked')==false){
				console.log("don't include online in the product list results");
			}	
		},
		
		handleApplyBtn: function(e){
			
			this.updateFacets();
			
		},

		handleSortMenuClick: function(e){
			this.model.set({sortOpen: !this.model.get("sortOpen")});
		},
		
		handleFilterSortClick: function(e){			
			this.model.set({filterOpen: !this.model.get("filterOpen")});			
		},
		
		displaySort: function(e){	
			console.log('MainFacets.displayMenu');
			if (this.model.get('sortOpen') == true){
				if (this.model.get('filterOpen') == true){
					$('.filter-panel').removeClass('contentShow');
					this.model.set({filterOpen: false, silent: true});
				}
				$('.sort-panel').addClass('contentShow');
			}else if(this.model.get('sortOpen') == false){
				$('.sort-panel').removeClass('contentShow');
			}			
		},
		
		displayFilters: function(e){	
			console.log('SortFilterModel.displayMenu');

			if (this.model.get('filterOpen') == true){
				$('.filter-panel').addClass('contentShow');
				if (this.model.get('sortOpen') == true){
					$('.sort-panel').removeClass('contentShow');
					this.model.set({sortOpen: false, silent: true});
				}

			}else if(this.model.get('filterOpen') == false){
				$('.filter-panel').removeClass('contentShow');
			}			
		},
		
		openRatings: function(e){
			$('#D_Rating').toggle();			
		},
		
		addCollection: function(menuItem, model){
			
			console.log('addCollection');
			
			if( this.collectionMap.hasOwnProperty(menuItem, model) ){
				//create the type					
				//console.log('already exists');

				this.collectionMap[menuItem].add(model);
				
			}else{
				this.collectionMap[menuItem] = new SectionCollection();
				this.collectionMap[menuItem].add(model);	
			}
						
		},
		
		doFacets: function(data){			
			console.log('doFacets');
			window.d = data;
			window.bucket = {};

			_.each(this.collection.models[0].attributes.FacetView[0].Entry,function(facet){	
				var title = String(facet.label);
				var headerId = title.split(' ').join('_');			
				headerId = headerId.replace(',','');	
				var checked = false;
				//console.log("FACETS OBJECT: ");
				window.facetsObj = this.model.get('facets');
				
				//console.log("endecaId: " + facet.ExtendedData[1].value);
				
				var eId = facet.ExtendedData[1].value;
				
				//test if the facet is already checked. pass the checked to the panel model
				//5zja3,5zjac,5zjaa,5zja8
				
				console.log(this.model.get('facets'));
				console.log('facets should be printed');
				if(_.indexOf(this.model.get('facets'),eId) == -1){
					//console.log('endeca id is not present');
					console.log("checked: " + checked);
					console.log('endecaId: ' + eId);
					checked = false;
				}else{
					console.log("checked: " + checked);
					checked = true;
				}
				
				var model;
				
				if( window.bucket.hasOwnProperty(facet.label) ){
					//create the type					
					//console.log('already exists');
					model = new PanelModel({
						checked: checked, 
						entryValue: facet.entryValue, 
						count: facet.count, 
						ExtendedData: facet.ExtendedData, 
						label: facet.label, 
						headerId: headerId
						});
					window.bucket[facet.label].push(model);

					console.log(model.get('checked'));
					//this.addCollection(facet.label, model);	
				}else{
					window.bucket[facet.label] = new Array();

		
					model = new PanelModel({checked: checked, entryValue: facet.entryValue, count: facet.count, ExtendedData: facet.ExtendedData, label: facet.label, headerId: headerId});
					window.bucket[facet.label].push(model);
					//this.addCollection(facet.label, model);		
				}
				
				checked = false;

			}, this);
			
			
			_.each(this.collection.models[0].attributes.RefineCategories[0].FacetView[0].Entry, function(category){
				
				//console.log("categories loop");
				//console.log(category.label);
				
					if( window.bucket.hasOwnProperty('Categories') ){				
						window.bucket['Categories'].push ( new PanelModel({entryValue: category.entryValue, count: category.count, ExtendedData: category.ExtendedData, label: category.label, headerId: "categories"}));
					}else{
				
				window.bucket['Categories'] = new Array();				
				window.bucket['Categories'].push ( new PanelModel({entryValue: category.entryValue, count: category.count, ExtendedData: category.ExtendedData, label: category.label, headerId: "categories"}));
	
								
			}
				
			});

				
				console.log("XXXXXXXXXXXXXXXXXXXXXXX");
				//console.log(this.collections);
				
			_.each(window.bucket, function(value, key){
				
				console.log('collections:');
				console.log(collection);
				console.log(key);
				
				if( key == "in store, online"){
					console.log('do something else with in store on line');
				}else{
							
				//guest_rating_collection.add(value);
				
				var collection = new SectionCollection(value, {reset: true});
				
				var view = new SectionView({collection: collection, title: key});
				view.render();
				}
					
			},this);
			
			this.selected = true;
			
			},
			
			
			updateFacetsMenu: function(e){
				console.log('updateFacetsMenu');
				_.each(this.collection.models[0].attributes.FacetView[0].Entry,function(facet){	
					var title = String(facet.label);
					var headerId = title.split(' ').join('_');			
					headerId = headerId.replace(',','');	


					var eId = facet.ExtendedData[1].value;

						console.log("updated EndecaID: " + eId);

						
						
					//	var c = new SectionCollection(facet);
						
						console.log(c.toJSON());

				}, this);
				
			}
		
	});
	
	return MainFacetsView;

});