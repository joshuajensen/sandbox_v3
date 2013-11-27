define([
	'jquery',
	'backbone',
	'text!templates/plp/facets/section.html',
	'views/plp/facets/panel.view',
	'text!templates/plp/facets/section_header.html', 
	'views/plp/facets/guest_rating_panel.view'
	], 
	function(
		$, 
		Backbone,
		html, 
		PanelView, 
		header_html, 
		GuestRatingPanelView
		){
//return new constructor
	var SectionView = Backbone.View.extend({
		
		defaults: {
			open: false,
			title: ""
		},
		
		tagName: 'li',

		//className: 'search-wrap',

		template: _.template( html ),
		
		headerTemplate: _.template( header_html ),
		
		initialize: function(){
			console.log('sectionview');
			var type = "";
						
			//console.log('SectionView.initialize');
			
			
			var headerId = this.collection.models[0].get('headerId');
				$(this.el).attr('id', headerId );
				
				if ( headerId == "guest_rating"){

					headerId = headerId.replace('_', ' ');

				}

				$(this.el).append(this.headerTemplate({title: headerId}));
			this.collection.each( function(value, key){
				
				if( headerId == "guest rating"){

					var panel_view = new GuestRatingPanelView({model: value});

				}else{
					
					var panel_view = new PanelView({model: value});
					
					//console.log(value);
					
					window.val = value;
					
				}

			$(this.el).children('#categValue').append(panel_view.render());

			},this);


			this.collection.on('add', this.saySomething, this);	

			
		},
		
		saySomething: function(e){
			
			console.log('COLLECTION CHANGED');
			
		},
		
		render: function(){
			

		  return $('#search_wrapper').append( $(this.el) );
		},
		
		events:{'click  #headerbutton': 'handleDisplaySections'},		
			selectRatings: function(e){	
		},
		
		handleDisplaySections: function(e){
			$(this.el).children('#categValue').toggle();			
		}
		
	});
	
	return SectionView;

});