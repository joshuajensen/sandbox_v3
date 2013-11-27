define(['jquery','backbone'],
	function($, Backbone){

var SectionCollection = Backbone.Collection.extend({

	initialize: function(models,options){
		//console.log('SectionCollection ');
			
	},
	comparator: function( collection ){
	  return( collection.get( 'label' ) );
	},
	
	fetch: function(options) {
      options = options ? _.clone(options) : {};

	  console.log('Section Collection Fetch');

      var collection = this;
	
        var method = options.reset ? 'reset' : 'set';
        collection[method](localresponse, options);

        collection.trigger('sync', collection, resp, options);
 
      wrapError(this, options);
      return 
    },

});
	
	return SectionCollection;
	
});