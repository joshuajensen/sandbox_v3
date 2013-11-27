define([
	'jquery',
	'backbone', 
	'lib/helper', 
	'views/navigation/main_search/main_search.view',
	'views/navigation/main_menu/main_menu.view',  
	'text!templates/navigation/main_navigation.html', 
	'models/navigation/navigation.model', 
	'collections/navigation/categories.collection',
	
	], 
	function(
		$, 
		Backbone, 
		helper, 
		SearchView, 
		MenuView, 
		html, 
		NavigationModel, 
		categories_collection
	){
	var NavigationView = Backbone.View.extend({
		el: '#navigation',
		template: _.template(html),
		model: new NavigationModel(),
		search_view: new SearchView(),
		
		collection: categories_collection,
		
		initialize: function(){
			console.log('initialize the navigation view');
			// _.bindAll(this,'toggleNavModel','toggleSearchModel');
			if(helper.detectLegacy()){
				this.model.set({legacy : true});
			}
			
			var view = this,
				navCheck = view.model.get("navigation_active"), 
				searchCheck = view.model.get("search_active"),
				menuCheck = view.model.get("browse");

			this.model.on("change:navigation_active", function(){
				view.updateNav();
            });
            this.model.on("change:search_active", function(){
				view.updateSearch();
            }); 
            this.model.on("change:browse", function(){
				view.updateMenu();
            });
            this.updateMenu();
            
            $('html').addClass('loaded');
			 fontsLoaded = true;
		},	
		render: function(){
			this.$el.html(this.template());
		    this.assign(this.search_view, '.search-wrap');
		    this.assign(this.menu_view, '#nav');
		    return this;	
		},
		events: {
			'click .nav-trigger':'toggleNav',
			'click .search-trigger':'toggleSearch',
			'click #all-products':'toggleBrowse',
			'click #main_menu':'toggleBrowse',
		},
		assign: function(view, selector){
		    view.setElement(this.$(selector)).render();
		},
		toggleNav: function(){
			console.log('toggle nav model');
			this.model.toggle("navigation_active");
	    },
	    toggleSearch: function(){
	    	console.log('toggle search model');
			this.model.toggle("search_active");
	    },
	    toggleBrowse: function(){
	    	this.model.toggle("browse");
	    	console.log('tapped the categories browse');
	    },
		updateNav: function(){
			navCheck = this.model.get("navigation_active");
			console.log('navigation is '+navCheck);
			if(navCheck){
	    		this.showNav();
	    	}
	    	else{
	    		this.hideNav();	    		
    		}
		},
		updateSearch: function(){
			navCheck = this.model.get("navigation_active"), 
			searchCheck = this.model.get("search_active");
			console.log('search is '+searchCheck);
			if(searchCheck && !navCheck){
	    		this.showSearch();
	    	}
	    	else if(searchCheck && navCheck){
	    		this.showSearch();
	    		this.toggleNav();
	    	}
	    	else{
	    		this.hideSearch();
	    	}
		},
		updateMenu: function(){
			this.menu_view = new MenuView({browse: this.model.get("browse")});
			this.render();
		},
		showSearch: function(){
			console.log('search_show');
          	$('html').addClass('search-active');
          	$('.search-wrap').attr('aria-hidden', 'false');
      	},
      	hideSearch: function(){
	        $('html').removeClass('search-active');
	        $('.search-wrap').attr('aria-hidden', 'true'); 
	        // search.focusOut();
	    },
	    showNav: function(){
	        $('html').addClass('nav-active prevent');
	        $('body').scrollTop(0);
	        $('#searchTerm').blur();
	        this.model.set({"search_active": false});
	        helper.ariaToggle(['#nav','.main-content','.accessibility','.search-wrap']);
	        $('#header .nav-trigger').attr('title', 'hide navigation menu');
	        $('#home-nav-link').focus();
	        // navigation.resizeFooter();
	        this.detectTransistion();
	        
	    },
	    hideNav: function(e){
	        $('body').scrollTop(0);
	        $('html').removeClass('nav-active prevent');
	        // accessibility
	        helper.ariaToggle(['#nav','.main-content','.accessibility','.search-wrap']);
	        $('#header .nav-trigger').attr('title', 'show navigation menu');
	        // navigation.resetFooter();
	        // navigation.resetScroll();
	        this.detectTransistion();
	    },
	    detectTransistion: function(){
	    	$('html').removeClass('trans-fin');
	        setTimeout(function(){$('html').addClass('trans-fin')},300);
	    }
	    
	});
	
	return NavigationView;

});