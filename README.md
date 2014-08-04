Backbone.Repository
===================

Repository plugin for Backbone

### Usage

Fetch models or collections using the built-in methods, or create your own:

    // Extending Backbone.Repository
    var UserRepository = Backbone.Repository.extend({
        modelType: User,
        collectionType: UserCollection
    });

    // Create an instance
    var userRepo = new UserRepository();

    // Fetch data
    var findingUsers = userRepo.findAll();

    // Uses jQuery promises
    $.when(findingUsers)
        .done(function (response) {
            var view = new UsersListView({ collection: response });
            // etc...
        })
        .fail(function (response) {
            var jsonReponse = $.parseJSON(response);
            // etc...
        });

Use criteria to filter a result:

    // Fetch data
    var findingUser = userRepo.findOneBy({ username: 'wmozart' });

    // Uses jQuery promises
    $.when(findingUser)
        .done(function (response) {
            var view = new UserDetailView({ model: response });
            // etc...
        })
        .fail(function (response) {
            var jsonResponse = $.parseJSON(response);
            // etc...
        });

Save new models with a collection or stand-alone, and update or remove existing models:

    // New model data
    var modelData = {
        username: 'ljenkins'
    };

    // Add to an existing collection
    var userCollection = this.userCollection;
    var savingUser = userRepo.insert(userCollection, modelData);
    $.when(savingUser)
        .done(function (response) { /* success */ })
        .fail(function (response) { /* error */ });

    // Persist or update a model
    var user = new User();
    var savingUser = userRepo.save(user, modelData);
    $.when(savingUser)
        .done(function (response) { /* success */ })
        .fail(function (response) { /* error */ });

    // Remove a model from persistence and any collections
    var user = this.user;
    var removingUser = userRepo.remove(user);
    $.when(removingUser)
        .done(function (response) { /* success */ })
        .fail(function (response) { /* error */ });
