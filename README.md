Backbone.Repository
===================

Repository plugin for Backbone

**Early development - not ready for production!**

### Usage

Fetch models or collections using the built-in methods, or create your own:

    // extending Backbone.Repository
    var UserRepository = Backbone.Repository.extend({
        modelType: User,
        collectionType: UserCollection
    });

    // create an instance
    var userRepo = new UserRepository();

    // fetch data
    var findingUsers = userRepo.findAll();

    // uses jQuery promises
    $.when(findingUsers).done(function (response) {
        var view = new UsersListView({collection: response});
        // etc...
    });

Use criteria to filter a result:

    // fetch data
    var findingUser = userRepo.findOneBy({username: 'wmozart'});

    // uses jQuery promises
    $.when(findingUser).done(function (response) {
        var view = new UserDetailView({model: response});
        // etc...
    });

Save new models with a collection or stand-alone, and update existing models:

    // new model data
    var modelData = {
        username: 'ljenkins'
    };

    // add to an existing collection
    var savingUser = userRepo.insert(this.userCollection, modelData);
    $.when(savingUser).done(function (response) { /* code stuff */ });

    // persist or update a model
    var savingUser = userRepo.save(this.user, modelData);
    $.when(savingUser).done(function (response) { /* code stuff */ });

    // remove a model from persistence and any collections
    var removingUser = userRepo.remove(this.user);
    $.when(removingUser).done(function (response) { /* code stuff */ });
