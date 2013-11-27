define([
	'jquery',
	'backbone',  
	'text!templates/navigation/main_menu/main_browse/browse_node_child.html'
	], 
	function(
		$, 
		Backbone, 
		html
	){
	var BrowseNodeChildView = Backbone.Marionette.CompositeView.extend({
	    template: _.template(html),
	    tagName: "li",
	    className: "menu child",
	    initialize: function(){
	        this.collection = this.model.childnodes;
	    },
	    appendHtml: function(collectionView, itemView){
	    	// console.log(collectionView.$el)
	    	// collectionView.$el.append('<ul class=\'test\'></ul>');
	        collectionView.$("ul:first").append(itemView.el);
	    }
	});
	return BrowseNodeChildView;
});


