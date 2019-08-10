(function () {
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController', LunchCheckController);
    
    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope){
        $scope.CheckLunch = function (){
            if($scope.lunch) {
                var lunchItems = $scope.lunch.split(',');
                lunchItems = lunchItems.filter(value => Object.keys(value.trim()).length !==0);
                console.log(lunchItems.length);
                if (lunchItems.length >3) {
                    $scope.LunchCheckResult = "Too much!"; 
                    $scope.messageStyle={'color': 'green'};   
                }
                else {
                    $scope.LunchCheckResult = "Enjoy!";
                    $scope.messageStyle={'color': 'green'};
                }
            } else {
                $scope.LunchCheckResult = "Please enter data first";
                $scope.messageStyle={'color': 'red'};
            }
        };
    }
})();