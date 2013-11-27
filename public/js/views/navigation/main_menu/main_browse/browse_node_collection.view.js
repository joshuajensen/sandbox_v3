define([
	'jquery',
	'backbone',
	'views/navigation/main_menu/main_browse/browse_node_child.view'
	], 
	function(
		$, 
		Backbone, 
		BrowseNodeChildView
	){
	var BrowseNodeCollectionView = Backbone.Marionette.CollectionView.extend({
	    tagName: "ul",
	    className: "parent-branch",
	    itemView: BrowseNodeChildView
	});
	return BrowseNodeCollectionView;
});