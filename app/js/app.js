var app = angular.module('app', [ 
	'ngRoute',
	
	'sharedServices', 
	'sharedDirectives',
	'sharedControllers', 
	
	'bookControllers',
	'profileControllers',
	'readerControllers',
	'noteControllers'
	
]);


app.config(function($routeProvider, $httpProvider) {
			$routeProvider.when(URLS.home, {
				templateUrl : '/partials/home.html'
			}).when(URLS.login, {
				templateUrl : '/partials/login.html' ,
				controller : 'navigation'
			}).when(URLS.register, {
				templateUrl : '/partials/register.html',
				controller : 'navigation'
			}).when(URLS.forgotten_password, {
				templateUrl : '/partials/forgotten_password.html',
				controller : 'navigation'
			}).when(URLS.profilesView, {
				templateUrl : '/partials/profiles/view.html',
				controller: 'ProfileController'
			}).when(URLS.profilesEdit, {
				templateUrl : '/partials/profiles/edit.html',
				controller: 'ProfileController'										
			}).when(URLS.booksList, {
				templateUrl : '/partials/books/list.html',
				controller : 'BookController'
			}).when(URLS.booksSearch, {
				templateUrl : '/partials/books/search.html',
				controller: 'BookController'
			}).when(URLS.booksView, {
				templateUrl : '/partials/books/view.html',
				controller : 'BookController'
			}).when(URLS.booksEdit, {
				templateUrl : '/partials/books/edit.html',
				controller : 'BookController'
			}).when(URLS.booksCreate, {
				templateUrl : '/partials/books/create.html',
				controller : 'BookController'
			}).when(URLS.readersList, {
				templateUrl : '/partials/readers/list.html',
				controller: 'ReaderController'
			}).when(URLS.readersSearch, {
				templateUrl : '/partials/readers/search.html',
				controller: 'ReaderController'
			}).when(URLS.readersView, {
				templateUrl : '/partials/readers/view.html',
				controller: 'ReaderController'
			}).when(URLS.readersEdit, {
				templateUrl : '/partials/readers/edit.html',
				controller: 'ReaderController'					
			}).when(URLS.notesView, {
				templateUrl : '/partials/notes/view.html',
				controller: 'NoteController'					
			}).when(URLS.notesEdit, {
				templateUrl : '/partials/notes/edit.html',
				controller: 'NoteController'
			}).otherwise('/home');

			$httpProvider.defaults.withCredentials = "true";
			$httpProvider.defaults.useXDomain = true;
			// $http.headers.common["X-CSRFToken"]=$cookies['csrftoken'];
			// $httpProvider.defaults.headers.common = 'Content-Type: application/json';
			$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
			$httpProvider.interceptors.push('XSRFInterceptor');
						
		});

/*
	Error handler when server doesn't respond and for all http client and server errors
 */
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$location', '$rootScope', function($q, $location, $rootScope) {
       return {
         responseError: function(rejection) {
               if(rejection.status == 0) {
            	   $rootScope.currentReader = null;
//                   window.location = "#/";
            	   $location.path('/');
            	   alert("Connection with the server was lost.");
                   return;
               } else if(rejection.status > 399 && rejection.status < 600) {
            	   $rootScope.currentReader = null;
            	   $location.path('/');
            	   alert(rejection.statusText);
            	   return;
               }
               return $q.reject(rejection);
           }
       };
   }]);
}]);

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
app.factory('XSRFInterceptor', function() {
    var XSRFInterceptor = {
        request: function(config) {
            var token = readCookie('XSRF-TOKEN');
            if (token) {
                config.headers['X-XSRF-TOKEN'] = token;
            }
            return config;
        }
    };
    return XSRFInterceptor;
});

/*
 * Data initialization
 */
app.run(function (AppService) {
	AppService.init();
});



