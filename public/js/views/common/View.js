// Filename: views/common/View.js
// Base model for all tgt_mob views 
// the core functionalities of registering to events,
// rendering of composite views 
// model binding etc, are done here 
define(
    ["jquery", "backbone", "hammer"],

    function ($, Backbone, Hammer) {

        var delegateEventSplitter = /^(\S+)\s*(.*)$/;
        var viewOptions = ['hammerEvents', 'hammerOptions'];

        var View = Backbone.View;
        var delegateEvents = View.prototype.delegateEvents;
        var undelegateEvents = View.prototype.undelegateEvents;


        //Default Composite View Model to be used across the screens
        var View = Backbone.View.extend({
            isRendered: false,
            parentView: null,

            //Sets the associated model
            setModel: function (model) {
                var prevModel = this["model"];
                this.stopListening(prevModel);
                if (model != null) {
                    this.listenTo(model, "refresh", this.onModelRefresh);
                }
                this["model"] = model;
            },

            //Gets the associated model
            getModel: function () {
                return this["model"];
            },

            //Handles the model refresh to be overridden
            onModelRefresh: function () {

            },

            //updates the model
            updateModel: function () {

            },

            //Renders the view
            render: function () {
                this.performRenderCycle();
                this.delegateEvents();
                _.each(this.subViews, function (subView) {
                    subView.performRenderCycle();
                    subView.delegateEvents();
                });
                this.isRendered = true;
            },

            performRenderCycle: function () {
                this.preRender();
                this.postRender();
            },

            //Adds the sub view
            addSubView: function (id, view) {
                view.parentView = this;
                if (!this.subViews[id]) {
                    this.subViews[id] = view;
                }
            },

            //Removes the sub view
            removeSubView: function (subView) {
                subView.undelegateEvents();
                subView.undelegateHammerEvents();
                subView.dispose();
                subView = null;
            },

            //Remove all sub views
            removeAllSubViews: function () {
                _.each(this.subViews, function (subView) {
                    subView.undelegateEvents();
                    subView.undelegateHammerEvents();
                    subView.dispose();
                    subView = null;
                });
                this.subViews = {};
            },

            //dispose
            clearPage: function () {
                this.removeAllSubViews();
                this.dispose();
                this.undelegateEvents();
            },

            //shows the view
            show: function () {
                this.$el.show();
            },

            //hides the view
            hide: function () {
                this.$el.hide();
            },

            // Hammer Integration Starts

            constructor: function (options) {
                options = options || {};
                _.extend(this, _.pick(options, viewOptions));
                Backbone.View.prototype.constructor.apply(this, arguments);
            },

            _hammered: false,

            undelegateEvents: function () {
                this.undelegateHammerEvents();
                return undelegateEvents.apply(this, arguments);
            },

            undelegateHammerEvents: function () {
                if (this._hammered) {
                    this.hammer().off('.hammerEvents' + this.cid);
                }
                return this;
            },

            delegateEvents: function () {
                delegateEvents.apply(this, arguments);
                this.delegateHammerEvents();
                return this;
            },

            delegateHammerEvents: function (events) {
                var options = _.defaults(this.hammerOptions || {}, Backbone.hammerOptions);
                if (!(events || (events = _.result(this, 'hammerEvents')))) return this;
                this.undelegateHammerEvents();
                for (var key in events) {
                    var method = events[key];
                    if (!_.isFunction(method)) method = this[events[key]];
                    if (!method) continue;

                    var match = key.match(delegateEventSplitter);
                    var eventName = match[1], selector = match[2];
                    eventName += '.hammerEvents' + this.cid;
                    method = _.bind(method, this);
                    if (selector === '') {
                        this.hammer(options).on(eventName, method);
                    } else {
                        this.hammer(options).on(eventName, selector, method);
                    }
                }
                return this;
            },

            hammer: function (options) {
                this._hammered = true;
                return this.$el.hammer(options);
            }
            // Hammer Integration Ends
            ,
            preRender: function () {
                this.renderView();
            },
            postRender: function () {
            },

            clearNotNeededPages: function (newSubViewsDefinition) {
                var oldSubViewArr = Object.keys(this.subViews);
                for (var i = 0; i < oldSubViewArr.length; i++) {
                    if (!newSubViewsDefinition[oldSubViewArr[i]]) {
                        this.removeSubView(this.subViews[oldSubViewArr[i]]);
                        delete this.subViews[oldSubViewArr[i]];
                    }
                }
            }

        });
        return View;
    }
);

