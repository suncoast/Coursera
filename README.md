# CourseraAngular

### Start Browser-Sync
browser-sync start -server -directory --files "**/*"

### L10 Protecting Dependency Injection from Minification 

DIController.$inject = ['$scope', '$filter']



### L13 Filters


### L15 $digest & $apply

$scope.$digest
$scope.$apply
$timeout

### L16 2-way, 1-way and 1-time binding

2way: ng-model
1-way: {{prop}}
1-time: {{:: prop}}

### L18 Filtered ng-repeat

$index in ng-repeat

"item in collection | fiilter : searchString"

### L19 Constoller as syntax

1. Property can mask parent object
2. Object will not mask parent object
3. Constroller as Syntax will not mask parent object. 

HTML
 <div ng-controller='MyController2 as **ctrl1**'>
      value: {{ ctrl1.value }}
 </div>

 JS

function MyController2() {
  **var ctrl1 = this**;
  ctrl1.value = 1;
}


### L20 Custom Services

1. Controller should not have business logic and should not share data with other controllers.
2. Service is sington and can share data between multiple controllers
````
angular.module('app',[])
.controller('ctrl',Ctrl)
.service('customService',CustomerService);

function CustomerService {
    var srevice = this;
    ... 
    // Expose data or fucntion by service.xxx
}
````
### L21 Custom service factory
````
angular.module('app',[])
.controller('ctrl',Ctrl)
.factory('customService',CustomerService);
````
Return function:
````
function CustomerService() {
    var factory = fucntion (){
        return new SomeService();
    };
    return factory;
}

var someSrv= CustomerService();
````
Return object literal
````
function CustomerService() {
    var factory = {
        getSomeService:fucntion (){
            return new SomeService();
        }
    };
    return factory;
}

var someSrv= CustomerService.getSomeservice();
````
### L22 Custom Services with .provider()
````
angular.module('app',[])
.controller('ctrl',Ctrl)
.provider('Service',ServiceProvider)
.config(Config);

function ServiceProvider(){
    var provider = this;
    provider.config = {...};
    provider.$get = function () {
        var service = new service(provider.config.prop);
        return service;
    };
}
````
To configure a service, it must be injected into the function passed into the .config() function with the extra string "Provider" appended to the String name the provider was declared with. (passed into .provider as the first argument).


### L24 ng-if, ng-show and ng-hide
ng-if will remove the div from DOM
ng-hide/ng-show will not remove the div from DOM, but just show or hide the div
(display: none !important)

