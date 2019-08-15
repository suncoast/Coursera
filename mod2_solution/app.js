(function () {
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController (ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.toBuyItems;
        toBuy.bought = function(index) {
            ShoppingListCheckOffService.bought(index);
        };


    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController (ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.items = ShoppingListCheckOffService.getalreadyBoughtItems();
    }

    function ShoppingListCheckOffService () {
        var service = this;

        // Use service variable to expose data to controller
        service.toBuyItems = [
            { name : 'cookies', quantity : 10 },
            { name : 'chips', quantity : 8 },
            { name : 'milk', quantity : 5 },
            { name : 'bread', quantity : 2 },            
            { name : 'apple', quantity : 5 },
        ];

        // Use service function to expose data to congtroller
        var alreadyBoughtItems = [];
        service.getalreadyBoughtItems = function () {
            return alreadyBoughtItems;
        };

        service.bought = function(index) {
            var item = service.toBuyItems[index];
            service.toBuyItems.splice(index, 1);
            alreadyBoughtItems.push(item);
        };

    }
})();