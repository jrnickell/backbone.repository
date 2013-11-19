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
    var usersRequest = userRepo.findAll();
    var userRequest = userRepo.find(1);
    var employeesRequest = userRepo.findBy({group:'employee'});
    var adminRequest = userRepo.findOneBy({group:'admin'});
    // jQuery promises
    $.when(usersRequest).done(function (response) {
        var view = new UsersListView({collection: response});
        // etc...
    });

    // insert new model
    var modelData = {
        username: 'ljenkins'
    };
    // jQuery promises
    var creatingUser = userRepo.insert(users, modelData);
    $.when(creatingUser).done(function (response) {});

    // update existing model
    var updatingUser = userRepo.update(user, modelData);
    $.when(updatingUser).done(function (response) {});

    // remove a model
    var removingUser = userRepo.remove(user);
    $.when(removingUser).done(function (response) {});
