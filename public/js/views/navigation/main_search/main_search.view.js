define([
	'jquery',
	'backbone',
	'text!templates/navigation/main_search/main_search.html',
	'models/navigation/search.model',
	], 
	function(
		$, 
		Backbone, 
		html, 
		SearchModel
	){
//return new constructor
	var SearchView = Backbone.View.extend({
		template: _.template( html),
		model: new SearchModel(),
		initialize: function(){
			console.log('initialize the search view');
			$(this.el).attr("aria-hidden",true);
			this.render();
		},	
		render: function(){
		  return this.$el.html(this.template());	
		},
		
		events: {'blur #searchTerm': 'search_hide', 'click .cancel-search':'search_hide', 'submit form':'runSearch', 'keyup #searchTerm': 'updateModel' },
		
		search_hide: function(){
          //navigation.searchState = false;
          $('html').removeClass('search-active');
          $('.search-wrap').attr('aria-hidden', 'true'); 
          this.search_focusOut();
      },

		search_focusOut: function(){
          $('html').removeClass('search-focused');
          $('#typeahead-contain').hide();
          $('#typeahead-contain ul').html('');
          if(this.legacy){
              $('html').removeClass('androidsearch');
          }
          //$('#searchTerm').blur();
      },
      updateModel: function(){
      	var term = this.$el.find('#searchTerm').val().replace(/\s/g, '+');
      	
      	this.model.set({searchTerm: term})
      	console.log(this.model.get("searchTerm"))
      },
      runSearch: function(e){
      	e.preventDefault();
      	Backbone.history.navigate('!search/'+this.model.get("searchTerm"), true);
      }

		
	});
	
	return SearchView;

});