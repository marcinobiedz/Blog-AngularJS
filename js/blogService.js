var app = angular.module("blog");

app.factory('blogService', function($http) {
    var path = 'http://private-79b25-blogtt.apiary-mock.com';

    return {
        getPosts: function() {
            return $http.get(path+'/posts');
        },
        addPost: function(post) {
            return $http.post(path+'/posts', post);
        },
        deletePost: function(post) {
            return $http.delete(path+'/posts', post);
        },
        editPost: function(post) {
            return $http.put(path+'/posts', post);
        }
    };
});