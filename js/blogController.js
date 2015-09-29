var app = angular.module("blog", []);

app.controller("blogController", ['$scope', 'blogService', 'validatorService', function($scope, blogService, validatorService) {

    $scope.titleFilter = "";
    $scope.contentFilter = "";
    $scope.formMode = "NEW";

    $('.datepicker').datepicker();

    blogService.getPosts()
        .then(function(response) {
            $scope.postList = response.data;
        });

	$scope.addPost = function(){
        var post = {
            title: $scope.title,
            text: $scope.text,
            published_at: new Date(),
            tags: $scope.tags
        };

         if (validatorService.validate(post.title, post.text)) {
             blogService.addPost(post)
                .then(function(){
                     $scope.postList.push(post);
             });
        }
        $scope.title = "";
        $scope.text = "";
        $scope.tags = [];

  	};

    $scope.deletePost = function(post){
        var del = confirm("Are you sure you want to delete this post?");
        if(del) {
            var deletePostIndex = $scope.postList.indexOf(post);
            var delPost = {
                "delete_id": deletePostIndex
            };
            blogService.deletePost(delPost)
                .then(function(){
                    $scope.postList.splice(deletePostIndex,1);
                });
        }
    };

    $scope.editPost = function (post) {
        $scope.formMode = "EDIT";
        $scope.editedPostIndex = $scope.postList.indexOf(post);
        $scope.existingPosts = $scope.postList;
        $scope.postList = [post];
        $scope.text = post.text;
        $scope.title = post.title;
    };

    $scope.confirmEdit = function(){
        if (validatorService.validate($scope.title, $scope.text)) {
            var editedPost = {
                "post_id": $scope.editedPostIndex,
                "new_title": $scope.title,
                "new_text": $scope.text
            };
            blogService.editPost(editedPost)
                .then(function(){
                    $scope.existingPosts[$scope.editedPostIndex].title=$scope.title;
                    $scope.existingPosts[$scope.editedPostIndex].text=$scope.text;
                    $scope.postList = $scope.existingPosts;
                    $scope.formMode = "NEW";
                    $scope.title = "";
                    $scope.text = "";
                    $scope.existingPosts = null;
                    $scope.editedPostIndex = null;
                });
        }
    };

    $scope.cancelEdit = function (){
        $scope.formMode = "NEW";
        $scope.postList = $scope.existingPosts;
        $scope.title = "";
        $scope.text = "";
    };

}]);
