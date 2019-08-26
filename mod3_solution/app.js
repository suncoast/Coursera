(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)    
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var ctrl = this;
        ctrl.found = [];
        ctrl.hasSearched = false;
        
        ctrl.getMatchedItems = function(searchTerm) {
            ctrl.hasSearched = true;            
            if(!searchTerm) {
                ctrl.found = [];
                console.log("Empty search Term ");
                return;
            }
            ctrl.isLoading= true;
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
                ctrl.found = response;
                console.log("Returned: " + response.length + " items");
                ctrl.isLoading = false;
              })
              .catch(function (error) {
                console.log("Error in getMatchedItems: " + error);
                ctrl.isLoading = false;
              });
        };
        
        ctrl.onRemove = function(Index) {
            ctrl.found.splice(Index, 1);
        };
    }

 
    MenuSearchService.$inject=['$http','ApiBasePath'];
    function MenuSearchService ($http, ApiBasePath) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                // process result and only keep items that match
                var items = response.data.menu_items.filter(item => item.description.includes(searchTerm));                        
                // return processed items
                return items;         
            }).catch(function (error) {
                console.log("Error getting menu items: " + error);
            });            
        };        
    } 
    
    
    function FoundItemsDirective() {
        var ddo = {
          templateUrl: 'foundItems.html',
          scope: {
            items: '<',
            onRemove: '&',
            hasSearched: '<',
            isLoading: '<'
          },
          controller: FoundItemsDirectiveController,
          controllerAs: 'list',
          bindToController: true
        };
      
        return ddo;
      }

      function FoundItemsDirectiveController() {
        var list = this;
      
        list.showEmptyWarning = function () {
            return (!!list.items && list.items.length > 0) || (!list.hasSearched)? false: true;
        };
      }

})();