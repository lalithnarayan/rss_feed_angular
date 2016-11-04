'use strict';
var myApp = angular.module("myapp", []).config(function() {});

myApp.controller("myController", ['$scope', '$http', 'FeedFetchService', '$filter', '$timeout', function($scope, $http, Feed, $filter, $timeout) {
    $scope.buttonText = "Get Feed";
    $scope.model = {};
    $scope.allUsers = [];
    var baseURL, finalURL;
    $scope.timeSpent = 0;

    $scope.addCard = function() {

        Feed.parseFeed('https://www.reddit.com/.rss').then(function(res) {
            $scope.feeds = res.data.responseData.feed.entries;
            $scope.buttonText = "Refresh Feed";
        });
    };

    $scope.deleteFeed = function(index) {
        $scope.feeds.splice(index, 1);
    };



    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
        $scope.clock = new Date().toISOString(); // get the current time
        $scope.timeSpent++;
        $timeout(tick, $scope.tickInterval); // reset the timer
    }

    // Start the timer
    $timeout(tick, $scope.tickInterval);


}]);


myApp.factory('FeedFetchService', ['$http', function($http) {
    return {
        parseFeed: function(url) {
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

myApp.filter("trustAsHtml", ['$sce', function($sce) {
    return function(htmlCode) {

        return $sce.trustAsHtml(htmlCode);
    }
}]);

myApp.filter("spliceText", function($sce) {
    return function(text) {
        var splicedText = text.slice(3);
        return splicedText
    }
});


myApp.filter("secondsToDateTime", function() {
    return function(seconds) {
        var d = new Date(0, 0, 0, 0, 0, 0, 0);
        d.setSeconds(seconds);
        return d;
    };
});
