var services = angular.module('services', ['ngResource']);

services.factory('Subscriber', function() {
    var state = {};
    return { theSubscriber: state };
});

services.factory('Subscribers', ['$resource', function($resource){
    return $resource('/api/subscribers/:email');
}]);

services.factory('Teams', ['$resource', function($resource){
    return $resource('/api/teams', null);
}]);
