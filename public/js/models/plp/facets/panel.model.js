define(['jquery','backbone'], 
function($, Backbone){
	
	var PanelModel = Backbone.Model.extend(
		{
			
			defaults: {
				checked: false,
				entryValue: "",
				count: "",
				label: ""
			},

		initialize: function(attributes, options) {
			
			//console.log('panelModel');
			
			//console.log('attributes');
			
			if (attributes.headerId == "categories"){
				//console.log('change the attributes so entryValue is the label');
				this.set('entryValue', attributes.label);
			}

			this.on('change:checked', this.handleFacetsChange, this);

		},
		
		handleFacetsChange: function(e){
			
			var obj = this.get('ExtendedData');
			//console.log("Endeca ID: " + this.get('ExtendedData')[1].value);
			console.log(this.get('ExtendedData')[1].value);
	
			var f = this.get('ExtendedData')[1].value;
	
			if(this.get('checked')==true){
				App.vent.trigger('facetAdded', f);
			}else if(this.get('checked')==false){
				App.vent.trigger('facetRemoved', f);
			}
	
		}
	});
	
		return PanelModel;
		
});