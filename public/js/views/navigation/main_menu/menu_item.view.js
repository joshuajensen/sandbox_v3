define([
	'jquery',
	'backbone', 
	'lib/helper', 
	'text!templates/navigation/main_menu/menu_item.html'
	],
	function(
		$, 
		Backbone, 
		helper, 
		html
	){
	var MenuItemView = Backbone.View.extend({
		el: '#main-browse',
		template: _.template( html),
		initialize: function(){
			var view = this;
			console.log('initialize the menu_item view');
			this.render();

		},	
		render: function(){
			return this.$el.html(this.template());	
		},
		
		events: {'click #all-products':'toggleBrowse', 'click .main-menu':'updateMainMenuState'},

		updateMainMenuState: function(e){
			var view = this.el;
			var current = $(e.currentTarget);
			// find all menu items (elements that link to a new view)
			var menuItems = $(view).find('.main-menu.item');
			// find all parent items (elements that contain menu items)
			var menuParents = $(view).find('.main-menu.parent');
			var liHeight = $('.main-menu').height();
	        var ulTarget = current.find('ul').eq(0);
	        var children = ulTarget.find('li').length;
	        if(!current.attr('id')){
	            e.stopPropagation();
	        }
	        
	        if(current.attr('prevent')){
	            e.preventDefault();
	        }
	        menuItems.removeClass('active');
	        menuParents.removeClass('active');
	        current.addClass('active');
	        /** set height of the expanded ul */
	        ulTarget.css({'height': children * liHeight});
	        /** handle expanded menu that has already been opened being targeted again */
	        if(current.hasClass('parent')){
	        	if(current.hasClass('closed')){
	        		menuParents.addClass('closed').removeClass('open');
	            	current.addClass('open').removeClass('closed');
	            }
	            else{
	            	current.addClass('closed').removeClass('open');
	            }
	        }
	        if(current.hasClass('item closed')){
	        	menuParents.addClass('closed').removeClass('open');
	        }
	            
	        helper.ariaToggle(ulTarget);
	       

	        // if(current.hasClass('last') && !current.hasClass('now-loading')){
	        //     current.append('<div class=\'loading icon-icon_loading\' title=\'loading\' aria-hidden=\'true\'></div>'); 
	        //     $('.side-nav').addClass('disable');
	        //     current.addClass('now-loading');
	        //     setTimeout(function(){
	        //         current.find('.icon-icon_loading').remove(); 
	        //         $('.side-nav').removeClass('disable');
	        //         current.removeClass('now-loading');
	        //     }, 6000);
	        // }
	        // navigation.resizeFooter(300);
	        // ulTarget.attr('aria-hidden', 'false');
	    }

		
	});
	
	return MenuItemView;

});