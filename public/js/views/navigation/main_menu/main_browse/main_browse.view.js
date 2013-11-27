define([
	'jquery',
	'backbone', 
	'lib/helper', 
	'collections/navigation/categories.collection', 
	'text!templates/navigation/main_menu/main_browse/main_browse.html',
	'views/navigation/main_menu/main_browse/browse_node_collection.view',
	'views/navigation/main_menu/main_browse/browse_node.view',
	'models/navigation/browse.model'
	], 
	function(
		$, 
		Backbone, 
		helper, 
		categories_collection, 
		html, 
		BrowseNodeCollectionView, 
		BrowseNodeView,
		BrowseModel
	){
//return new constructor
	var MenuItemView = Backbone.View.extend({
		el: '#main-browse',
		template: _.template(html),
		collection: categories_collection,
		model: new BrowseModel(),
		initialize: function(){
			var view = this;

			
			console.log('initialize main browse view');
			this.model.on("change:element", function(){
				view.runCompositeView(view.model.get('element'), view.model.get('index'));
			});

			//add condition for headless browser before calling this.render();
			this.render();
		},	
		render: function(){
			this.$el.html(this.template());
			this.buildTopLevel();
			return this;	
		},
		events: {'click #main_menu':'updateMenu', 'click .parent':'buildChildren'},
	 	buildTopLevel: function(){
	 		// todo: check for local storage first
	 		var view = this.$el;
			this.collection.each(function(model) {
			    var item = new BrowseNodeView({ model: model});
			    view.append(item.render().el);
			});
	 	},
	 	buildChildren: function(e){
	 		var target = $(e.currentTarget);
	 		var i = target.index();
	 		e.stopPropagation();
	        
	        // todo: set model instead
	        this.model.set('index', i);
	        this.model.set('element', target);
	 		
	 	},
	    runCompositeView: function(target, index){
	    	//to do: pull model/collection out of this view
	    	this.$el.find('.cat-active').removeClass('cat-active');	   
	    	console.log(target);
	        target.addClass('cat-active');
	  		var BrowseNodeModel = Backbone.Model.extend({
			    initialize: function(){
			        var childnodes = this.get("childnodes");
			        if (childnodes){
			            this.childnodes = new BrowseNodeCollection(childnodes);
			            this.unset("childnodes");
			        }
			    }        
			});
	  		var BrowseNodeCollection = Backbone.Collection.extend({
			    model: BrowseNodeModel
			});
	  		var tree = new BrowseNodeCollection(this.collection.models[index].attributes.childnodes);
			var treeView = new BrowseNodeCollectionView({
			    collection: tree
			});
			treeView.render();
			target.append(treeView.el);

			// localStorage.setItem('browse', treeView.el.toString());
	    },
	    //to do: fix/refactor statelogic
	    stateLogic: function(e){
	    	e.stopPropagation();
	    	var current = $(e.currentTarget);
	        this.$el.find('.cat-active').removeClass('cat-active');
	        current.addClass('cat-active');
	        if(current.attr('class').match('ancestor') != null){
	            current.find('.ancestor').removeClass('ancestor');
	            current.removeClass('ancestor');
	            current.find('.not-active').removeClass('not-active');
	        }
	        else{
	            current.parent().parent().addClass('ancestor');
	        }
	        current.siblings().addClass('not-active');
	        if(!current.hasClass('last')){
	            current.siblings().removeClass('open'); 
	            current.addClass('open');
	            current.parent().parent().removeClass('open');
	        }
	    }	
	});
	return MenuItemView;

});