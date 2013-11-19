Backbone.Repository
===================

Repository plugin for Backbone

Early development - not ready for production!
---------------------------------------------

### Usage examples:

    var UserRepository = Backbone.Repository.extend({
        modelType: User,
        collectionType: UserCollection
    });
    var userRepo = new UserRepository();

    // fetching data
    var users = userRepo.findAll();
    var user = userRepo.find(1);
    var employees = userRepo.findBy({group:'employee'});
    var admin = userRepo.findOneBy({group:'admin'});

    // insert new model
    var modelData = {
        username: 'ljenkins'
    };
    // uses jQuery promises
    var creatingUser = userRepo.insert(users, modelData);
    $.when(creatingUser).done(function (response) {});

    // update existing model
    var updatingUser = userRepo.update(user, modelData);
    $.when(updatingUser).done(function (response) {});

    // remove a model
    var removingUser = userRepo.remove(user);
    $.when(removingUser).done(function (response) {});
