'use strict';

angular.module('core').controller("CarouselCtrl",["$scope","$timeout",function($scope,$timeout){
    $scope.interval = 5000,
    $scope.slides = [        
        {image:"modules/core/img/skills/Github.png",link:"https://github.com",name:"Github"},
        {image:"modules/core/img/skills/Angular.png",link:"https://angularjs.org",name:"AngularJS"},
        {image:"modules/core/img/skills/Linux.png",link:"https://en.wikipedia.org/wiki/Linux",name:"Linux"},
        {image:"modules/core/img/skills/NodeJS.png",link:"https://nodejs.org/",name:"NodeJS"},
        {image:"modules/core/img/skills/MongoDB.png",link:"https://www.mongodb.org/",name:"MongoDB"},
        {image:"modules/core/img/skills/Express.png",link:"http://expressjs.com/",name:"Express"},
        {image:"modules/core/img/skills/Grunt.png",link:"http://gruntjs.com",name:"Grunt Taskrunner"},
        {image:"modules/core/img/skills/PHP.png",link:"http://www.php.net",name:"PHP"},
        {image:"modules/core/img/skills/MySQL.png",link:"https://www.mysql.com/",name:"MySQL"},
        {image:"modules/core/img/skills/Bower.png",link:"http://bower.io",name:"Bower Package Manager"},
        {image:"modules/core/img/skills/NPM.png",link:"https://www.npmjs.com",name:"NPM Package Manager"},
        {image:"modules/core/img/skills/Ruby.png",link:"https://www.ruby-lang.org/",name:"Ruby"},
        {image:"modules/core/img/skills/HTML.png",link:"http://dev.w3.org/html5/html-author",name:"HTML5"},
        {image:"modules/core/img/skills/CSS.png",link:"http://www.w3.org/Style/CSS/Overview.en.html",name:"CSS3"},
        {image:"modules/core/img/skills/Bootstrap.png",link:"http://getbootstrap.com",name:"Bootstrap"},
        {image:"modules/core/img/skills/Yeoman.png",link:"http://yeoman.io",name:"Yeoman"},
        {image:"modules/core/img/skills/jQuery.png",link:"https://jquery.com",name:"jQuery"},
        {image:"modules/core/img/skills/Git.png",link:"https://git-scm.com",name:"Git"},
        {image:"modules/core/img/skills/Bitcoin.png",link:"https://bitcoin.org/",name:"Bitcoin"}];
        
        // not including chrome or photoshop
    
    var c = $scope.slides.length;
    $scope.getSecondIndex = function(a) {
        return a-c >= 0 ? a-c : a
    }
}]);