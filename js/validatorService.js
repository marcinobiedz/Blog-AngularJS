var app = angular.module("blog");

app.service('validatorService',  function(){
	this.validate = function (title, text){
		return Boolean(title) && Boolean(text);
   	};
});

