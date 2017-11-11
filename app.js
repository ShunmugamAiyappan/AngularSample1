var app = angular.module('app', ['ngTable']);
app.controller('MainCtrl', ['$scope', '$http','ngTableParams' ,
    function ($scope, $http, ngTableParams) {
    var tableData = []
    //Table configuration
    $scope.tableParams = new ngTableParams({
        page: 1,
        count: 6,
        sorting: { userId: "desc" } 
        
    },{
        total:tableData.length,
        //Returns the data for rendering
        getData : function($defer,params){
            $http.get('https://jsonplaceholder.typicode.com/posts').then(function(response) {
                tableData = response.data;
                $defer.resolve(tableData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                params.total(tableData.length);
            });
        }
    });
}]);