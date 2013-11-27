define([
	'jquery',
	'backbone',  
	'text!templates/navigation/main_menu/main_browse/browse_node.html'
	], 
	function(
		$, 
		Backbone, 
		html
	){
	var BrowseNodeView = Backbone.Marionette.CompositeView.extend({
	    template: _.template(html),
	    tagName: "li",
	    className: "menu parent",
	});
	return BrowseNodeView;
});

