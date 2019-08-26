# Coursera AngularJS Notes

### Start Browser-Sync
browser-sync start -server -directory --files "**/*"

### L10 Protecting Dependency Injection from Minification 
````
DIController.$inject = ['$scope', '$filter']
````


### L13 Filters


### L15 $digest & $apply

1. $scope.$digest
2. $scope.$apply
3. $timeout

### L16 2-way, 1-way and 1-time binding

1. 2-way: ng-model
2. 1-way: {{prop}}
3. 1-time: {{:: prop}}

### L18 Filtered ng-repeat
````
$index in ng-repeat
````
````
"item in collection | fiilter : searchString"
````
### L19 Constoller as syntax

1. Property can mask parent object
2. Object will not mask parent object
3. Constroller as Syntax will not mask parent object. 

**HTML**:
````
 <div ng-controller='MyController2 as **ctrl1**'>
      value: {{ ctrl1.value }}
 </div>
````
 **JS**:
````
function MyController2() {
  **var ctrl1 = this**;
  ctrl1.value = 1;
}
````

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

Register factory with controller

````
angular.module('app',[])
.controller('ctrl',Ctrl)
.factory('customService',CustomerService);
````
Define factory to return function:
````
function CustomerService() {
    var factory = fucntion (){
        return new SomeService();
    };
    return factory;
}

var someSrv= CustomerService();
````
Define factory to return object literal
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


### L23 ng-if, ng-show and ng-hide

1. ng-if will remove the div from DOM
2. ng-hide/ng-show will not remove the div from DOM, but just show or hide the div
(display: none !important)


### L24 Promises and $q 

````
fucntion asyncFunc() {
    var deferred = **$q.defer()**;

    if(...) { deferred.resolve(result); }
    else { deferred.reject(error); }
    return deferred.promise;
}
````

````
var promise = sync Function();
promise.then(function(result) {
    // do something with result
},
function (error) {
    // do something with error
});
````

````
$q.all([promise1, promise2])
.then(function(result) {
    // do something with result
})
.catch(function(error) {
    // handle error
});
````

### L25 $http service

````
$http({
    method: "GET,
    url: "http://someurl",
    params: { param1: "value1" } // value get url eoncoded automatically, so don't put params in the url.

    ...
}).then(
    function success(response) {
        // do something with response.data
    },
    function error(response) {
        // do something with error response
    }
);
````

### L26 Directives:Dynamic HTML

````
angular.module('app',[])
.controller('MyCtrl', MyCtrl)
.directive('myTag', MyTag); // MyTag is the Directive Definition Objedct (DDO)

MyTag.$inject = [...]
function MyTag(...) {
    var ddo = {
        template: 'Hello World!'
        ...
    };
    return ddo;
}
````
Name match in the html: ````<my-tag></my-tag>```` with in code: myTag

### L27 Restrict Property in Custom Directives

1. Use 'E' for element when directive has content along with possible behavior
2. Use 'A' for attribute when directive has no content and only extends the behaviors of host element 

### L28 Directive's isolated Scope: "=" and "@"

**=attributeMame** : bi-directional binding with HTML template attribute named 'attributeMame'
**=** : bi-directional binding with the same named attribute in HTML template (denormalized name) e.g. my-prop
**=?** : attbiute is optional
**@**: one-way binding, the outter DOM property changes impact the inner directive property, but inner changes to the property myProp does not impact outter attribute value.

````
fucntion MyDirective() {
    var ddo = {
        scope: {
            myProp: '=attributeName' // HTML template attibute name
            myProp1: '='
        }
        ...
    };
    return ddo;
}
````

````
<my-directive my-prop="outterProp"></my-directive>
````

### L29 Using controllers inside directives

````
fucntion MyDirective() {
    var ddo = {
        scope: {
            myProp: '<' // Oneway binding, watches only the parent property, not the property inside directive
        },
        controller: ControllerFunction,
        bindToController: true, // Attach declated scope properties to controller instance instead of directly to $scope
        controllerAs: 'myCtrl', // Use 'myCtrl' in template to refer to controller instance
        templateUrl: 'template.html'
    };
    return ddo;
}
````
**Note:** 
1. one-way binding "<" is preferred to save resource instead of two-way binding with "=".
2. one-way binding can not prevent innder directive logic change the perperty of passed-in object and imapct the outter property. As oject is passed as reference. 

### L30  Directive APIs, Manipulating the DOM, and transclude

Parent controller manapulates the data, not the inner directive. Innder directive can call a method passed-in as reference from parent controller.

directive:
````
function MyDirective(){
    var ddo = {
        scope: {
            myMethod: '&method'
        },
        ...
        templateUrl: 'template.html'
    };
    return ddo;
}
````

controller's html:
````
<div ng-controller = "Controller as ctrl">
    <my-directive method = "ctrl.method(myArg)">        
    </my-directive>
</div>
````

directive's template html:
````
<button ng-click = "dirCtrl.myMethod({myArg:'v1'});">
    Remove Item
</button>
````

### L31 Manipulating the DOM with link
1. DOM manipulation is usually done inside the link function
2. Link function does not support injection, inject them into directive instead. 

Declare Link Function
````
function MyDirective(){
    var ddo = {
        scope: {...},
        **link: LinkFunction**,
        ...
        templateUrl: 'template.html'
    };
    return ddo;
}

function LinkFunction(scope, element, attrs, contrllers) {

}
````
1. scope is the exact $scope inside directive's controller
2. element repsents the top level element of the directive. It is either jqLite oject or JQuery object( if jQuery is included)

### L32 Using Directive’s transclude to Wrap Other Elements

1. Set transclude to true
````
function MyDirective(){
    var ddo = {
        scope: {...},
        transclude: true,
        ...
        templateUrl: 'template.html'
    };
    return ddo;
}
````
2. Wrap some parent content 
Interpolation will be done in the parent controller's context, not the directive's context.
````
<my-directive>   
     {{ctrl.someProp}}     
</my-directive>
````

3. ng-transclude to place wrapped content
````
<div ng-transclude></div>
````