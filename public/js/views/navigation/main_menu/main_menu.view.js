define([
	'jquery',
	'backbone', 
	'views/navigation/main_menu/menu_item.view', 
	'views/navigation/main_menu/main_browse/main_browse.view', 
	'text!templates/navigation/main_menu/main_menu.html'
	], 
	function(
		$, 
		Backbone, 
		MenuItemView, 
		MenuBrowseView, 
		html
	){
	var MenuView = Backbone.View.extend({
		template: _.template(html),	
		initialize: function(options){
			console.log('initialize the menu view');
			$(this.el).attr("aria-hidden",true);
			$(this.el).attr("role","navigation");
			this.browse = options.browse;
		},	
		render: function(){
			console.log('the navigation model browse is set to '+this.browse)
			console.log(this.$el.html(this.template()))
			this.$el.html(this.template());
			if(this.browse){
				var menu_browse = new MenuBrowseView();
			}
			else{
				var menu_item = new MenuItemView();
			}
			return this;
		},
		events: { }
	});
	return MenuView;
});


