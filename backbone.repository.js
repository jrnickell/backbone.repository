// Backbone.Repository
// -------------------
// v0.1.0
//
// Copyright (c)2013 John Nickell
// Distributed under MIT license
(function (root, factory) {

    if (typeof define == 'function' && define.amd) {
        // AMD
        define(['backbone', 'jquery', 'underscore'], factory);
    } else if (typeof exports == 'object') {
        // Node
        module.exports = factory(require('backbone'), require('jquery'), require('underscore'));
    } else {
        // Browser globals
        factory(root.Backbone, root.jQuery, root._);
    }

})(this, function (Backbone, $, _) {

    "use strict";

    // Backbone.Repository constructor
    var Repository = Backbone.Repository = function (options) {
        options || (options = {});
        // Allows setting modelType at runtime
        if (options.modelType) {
            this.modelType = options.modelType;
        }
        // Allows setting collectionType at runtime
        if (options.collectionType) {
            this.collectionType = options.collectionType;
        }
    };

    // Add Repository methods
    _.extend(Repository.prototype, {

        // Default model type
        modelType: Backbone.Model,

        // Default collection type
        collectionType: Backbone.Collection,

        // Backbone.Repository.findAll
        // ---------------------------
        // Fetches the collection
        //
        // param object parameters Additional data to send
        //
        // returns jQuery.Promise
        findAll: function (parameters) {
            var collection = new this.collectionType();

            return this._fetch(collection, parameters);
        },

        // Backbone.Repository.find
        // ------------------------
        // Fetches a single model by ID
        //
        // param integer id         The model id
        // param object  parameters Additional data to send
        //
        // returns jQuery.Promise
        find: function (id, parameters) {
            var model = new this.modelType({id: id});

            return this._fetch(model, parameters);
        },

        // Backbone.Repository.findBy
        // --------------------------
        // Fetches a set of models by search criteria
        //
        // param object  criteria   Attributes to match
        // param object  parameters Additional data to send
        // param boolean first      True to return the first match only
        //
        // returns jQuery.Promise
        findBy: function (criteria, parameters, first) {
            var defer = $.Deferred();
            var promise = defer.promise();
            var collection = new this.collectionType();
            collection.fetch({
                success: function (data, response, options) {
                    if (first) {
                        defer.resolve(data.findWhere(criteria));
                    } else {
                        defer.resolve(data.where(criteria));
                    }
                },
                error: function (data, response, options) {
                    defer.resolve(response.responseJSON);
                },
                data: parameters
            });

            return promise;
        },

        // Backbone.Repository.findOneBy
        // -----------------------------
        // Fetches a single model by search criteria
        //
        // param object criteria   Attributes to match
        // param object parameters Additional data to send
        //
        // returns jQuery.Promise
        findOneBy: function (criteria, parameters) {
            return this.findBy(criteria, parameters, true);
        },

        // Backbone.Repository.insert
        // --------------------------
        // Persists a new model to the collection
        //
        // param Backbone.Collection collection The collection instance
        // param object              data       The model attributes
        //
        // returns jQuery.Promise
        insert: function (collection, data) {
            var defer = $.Deferred();
            var promise = defer.promise();
            var model = collection.create(data, {
                wait: true,
                success: _.bind(this._deferSuccess, defer),
                error: _.bind(this._deferError, defer)
            });

            return promise;
        },

        // Backbone.Repository.update
        // --------------------------
        // Updates an existing model
        //
        // param Backbone.Model model The model instance
        // param object         data  The model attributes
        //
        // returns jQuery.Promise
        update: function (model, data) {
            var defer = $.Deferred();
            var promise = defer.promise();
            model.save(data, {
                wait: true,
                success: _.bind(this._deferSuccess, defer),
                error: _.bind(this._deferError, defer)
            });

            return promise;
        },

        // Backbone.Repository.remove
        // --------------------------
        // Removes a model from persistance
        //
        // param Backbone.Model model The model instance
        //
        // returns jQuery.Promise
        remove: function (model) {
            var defer = $.Deferred();
            var promise = defer.promise();
            model.destroy({
                wait: true,
                success: _.bind(this._deferSuccess, defer),
                error: _.bind(this._deferError, defer)
            });

            return promise;
        },

        // Handles server read operation
        // internal
        // returns jQuery.Promise
        _fetch: function (object, parameters) {
            var defer = $.Deferred();
            var promise = defer.promise();
            object.fetch({
                success: _.bind(this._deferSuccess, defer),
                error: _.bind(this._deferError, defer),
                data: parameters
            });

            return promise;
        },

        // Resolves a deferred response after a success
        // internal
        // returns void
        _deferSuccess: function (data, response, options) {
            this.resolve(data);
        },

        // Resolves a deferred response after an error
        // internal
        // returns void
        _deferError: function (data, response, options) {
            this.resolve(response.responseJSON);
        }

    });

    // Add Backbone extend method
    Repository.extend = Backbone.Model.extend;

    // Return Repository constructor
    return Repository;

});
