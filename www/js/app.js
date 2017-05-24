/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {


    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        ons.setDefaultDeviceBackButtonListener(function() {
            if (navigator.notification.confirm("Quer mesmo sair?",
                function(index) {
                    if (index == 1) { // OK button
                        navigator.app.exitApp(); // Close the app
                    }
                }
            ));
        });

        // Open any external link with InAppBrowser Plugin
        $(document).on('click', 'a[href^=http], a[href^=https]', function(e){

            e.preventDefault();
            var $this = $(this);
            var target = $this.data('inAppBrowser') || '_blank';

            window.open($this.attr('href'), target);

        });

        // Initialize Push Notifications
        // Uncomment the following initialization when you have made the appropriate configuration for iOS - http://goo.gl/YKQL8k and for Android - http://goo.gl/SPGWDJ
        app.initPushwoosh();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');

        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // Register device for Push Notifications
    initPushwoosh: function() {
        var pushNotification = window.plugins.pushNotification;

        if(device.platform == "Android") {
            registerPushwooshAndroid();
        }
        if (device.platform == "iPhone" || device.platform == "iOS") {
            registerPushwooshIOS();
        }
    }

};

(function() {
    var app = angular.module('sensationApp', ['onsen.directives', 'ngTouch', 'ngSanitize', 'angular-carousel', 'google-maps'.ns(), 'appLocalStorage', 'LocalStorageModule', 'ui.map', 'ui.event', 'nvd3']);

    app.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.cache = false;

    }]);

    // Home Controller
    app.controller('HomeController', function($scope, Data) {

        $scope.items = Data.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            Data.selectedItem = selectedItem;
            $scope.appNavigator.pushPage(selectedItem.page, {title: selectedItem.title, animation: 'slide'});
        }

    });

    // Menu Controller
    app.controller('MenuController', function($scope, MenuData) {

        $scope.items = MenuData.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            MenuData.selectedItem = selectedItem;

            $scope.menu.setMainPage(selectedItem.page, {closeMenu: true})

        }

    });

    // Plugins Controller
    app.controller('PluginsController', function($scope, PluginsData) {
        $scope.items = PluginsData.items;

        $scope.showDetail = function(index){
            var selectedItem = $scope.items[index];
            PluginsData.selectedItem = selectedItem;
            $scope.myNavigator = myNavigator.pushPage('plugins/' + selectedItem.page, {title: selectedItem.title, animation: 'slide'});

        }

    });

    // Parameters Controller
    app.controller('ParametersController', function($scope) {
        var page = $scope.appNavigator.topPage;
        $scope.param1 = page.options.param1;
    });

    // Map Controller
    app.controller('MapController', function($scope, MapData) {

        $scope.windowOptions = false;

        $scope.onClick = function () {
        this.windowOptions = !this.windowOptions;
        };

        $scope.closeClick = function () {
        this.windowOptions = false;
        };

        $scope.map = MapData.map;

        console.log($scope.map);



    });

    // Contact Controller
    app.controller('ContactController', function($scope) {

        $scope.submitForm = function() {

            window.plugin.email.open({
                to:      ['vinicio@i9techsolucoes.com.br'],
                cc:      ['daianecaroline1@hotmail.com'],
                bcc:     ['vinicio@sistemaxi.com.br'],
                subject: $scope.telefone,
                body:    $scope.message
            });

        };

    });

    // News Controller
    app.controller('NewsController', function($scope, $http, NewsData) {

        $scope.news = [];

        var getData = function ($done) {

            $http({method: 'GET', url: NewsData.url}).
            success(function(data, status, headers, config) {

                if ($done) { $done(); }

                $scope.news = data.result;
                $scope.letterLimit = NewsData.letterLimit;

            }).
            error(function(data, status, headers, config) {

                if ($done) { $done(); }

            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.news[index];
        NewsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('new.html', selectedItem);
        }

        // getNews() function()
        $scope.getNews = function() {
            // Filter News by $scope.search
            return $scope.news.filter(function(item) {

                // Filter News by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter News by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getNews();
        var selectedItem = items[index];
        NewsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('new.html', selectedItem);
        }

    });

    // New Controller
    app.controller('NewController', function($scope, NewsData) {
        $scope.item = NewsData.selectedItem;
     });

    // Products Controller
    app.controller('ProductsController', function($scope, $http, ProductsData) {

        var getData = function ($done) {

            $http({method: 'GET', url: ProductsData.url}).
            success(function(data, status, headers, config) {

                if ($done) { $done(); }

                $scope.products = data.result;
                $scope.letterLimit = ProductsData.letterLimit;


            }).
            error(function(data, status, headers, config) {

                if ($done) { $done(); }

            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.products[index];
        ProductsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('product.html', selectedItem);
        }

    });

      // Icones Controller
    app.controller('IconesController', function($scope, $http, IconesData) {

        var getData = function ($done) {

            $http({method: 'GET', url: IconesData.url}).
            success(function(data, status, headers, config) {

                if ($done) { $done(); }

                $scope.Icones = data.result;
                $scope.letterLimit = IconesData.letterLimit;


            }).
            error(function(data, status, headers, config) {

                if ($done) { $done(); }

            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.icones[index];
        IconesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('product.html', selectedItem);
        }

    });

      // icone Controller
    app.controller('IconeController', function($scope, ProductsData) {
        $scope.item = IconesData.selectedItem;
     });

    // Product Controller
    app.controller('ProductController', function($scope, ProductsData) {
        $scope.item = ProductsData.selectedItem;
     });

    // Posts Controller
    app.controller('PostsController', function($scope, $http, PostsData, NoticiasitemData) {

        var pullHook = document.getElementById('pull-hook');

        pullHook.addEventListener('changestate', function(event) {
            var message = '';

            switch (event.state) {
                case 'initial':
                    message = 'Puxe para Atualizar';
                    break;
                case 'preaction':
                    message = 'Atualizando...';
                    break;
                case 'action':
                    message = 'Atualizando...';
                    break;
            }

            pullHook.innerHTML = message;
        });

        pullHook.onAction = function(done) {
            $('.carrolsel-hide').hide();
            $('.loading').show();
            getData();
                        setTimeout(done, 500);





        };

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PostsData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;


                $scope.Posts = [];



                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                    $('.carrolsel-hide').show();
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 20;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PostsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('post.html', selectedItem);
        }

    });

    // Post Controller
    app.controller('PostController', function($scope, PostsData, $sce) {
        $scope.item = PostsData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });
    // Posts Controller
    app.controller('MaisNoticiasController', function($scope, $http, PostsData, NoticiasitemData) {

        $scope.feeds_categories = [];

    $http.get('feeds-categories.json').success(function(response) {
        $scope.feeds_categories = response;
    });


        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PostsData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;


                $scope.Posts = [];



                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 20;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PostsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('post.html', selectedItem);
        }

    });

    // Post Controller
    app.controller('MaisNoticiaController', function($scope, PostsData, $sce) {
        $scope.item = PostsData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });


      /////////////////////////////////////vinnnnyyycontroler /////////////////////////////////////////


// Gallery Controller
    app.controller('GaleriaController', function($scope, GalleryData) {

        var items = GalleryData.items;

        function addSlides(target) {
            angular.forEach(items,function(item,index){
                target.push({
                    label: item.label,
                    picture: item.src,
                    location: item.location,
                    item: (index + 1)
                });
            });
         };

        $scope.slides = [];
        addSlides($scope.slides);

    });



      // Roupas Controller
    app.controller('RoupasController', function($scope, $http, RoupasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: RoupasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        RoupasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/roupa.html', selectedItem);
        }



    });

    // Post Controller
    app.controller('RoupaController', function($scope, RoupasData, $sce) {
        $scope.item = RoupasData.selectedItem;


         $scope.roupasimg = RoupasData.selectedItem.custom_fields.listfy_imagemrpf;
         $scope.roupamasc = RoupasData.selectedItem.custom_fields.listfy_roupamasc;
         $scope.roupainf = RoupasData.selectedItem.custom_fields.listfy_roupainf;
         $scope.imagemace = RoupasData.selectedItem.custom_fields.listfy_imagemace;
         $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
         $scope.slidesobre = RoupasData.selectedItem.custom_fields.listfy_slidesobre;        

         $scope.roupasdsc = RoupasData.selectedItem.custom_fields.listfy_descricaorpf;

         $scope.bannerrp = RoupasData.selectedItem.custom_fields.listfy_bannerrp;




        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }






    });

    // Roupas Controller
    app.controller('ParceirosController', function($scope, $http, ParceirosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ParceirosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ParceirosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/parceiro.html', selectedItem);
        }



    });

    // Post Controller
    app.controller('ParceiroController', function($scope, ParceirosData, $sce) {
        $scope.item = ParceirosData.selectedItem;


         $scope.roupasimg = ParceirosData.selectedItem.custom_fields.listfy_imagemrpf;
         $scope.roupamasc = ParceirosData.selectedItem.custom_fields.listfy_roupamasc;
         $scope.roupainf = ParceirosData.selectedItem.custom_fields.listfy_roupainf;
         $scope.imagemace = ParceirosData.selectedItem.custom_fields.listfy_imagemace;
         $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
         $scope.slidesobre = ParceirosData.selectedItem.custom_fields.listfy_slidesobre;        

         $scope.roupasdsc = ParceirosData.selectedItem.custom_fields.listfy_descricaorpf;

         $scope.bannerrp = ParceirosData.selectedItem.custom_fields.listfy_bannerrp;




        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }






    });






// Acessorios controler
     app.controller('AcessoriosController', function($scope, $http, AcessoriosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AcessoriosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AcessoriosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/acessorio.html', selectedItem);
        }



    });

    // Acessorio Controller
    app.controller('AcessorioController', function($scope, AcessoriosData, $sce) {
        $scope.item = AcessoriosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AcessoriosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AcessoriosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }






    });


// Animais controler
     app.controller('AnimaisController', function($scope, $http, AnimaisData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AnimaisData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AnimaisData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/animal.html', selectedItem);
        }



    });

    // Animal Controller
    app.controller('AnimalController', function($scope, AnimaisData, $sce) {
        $scope.item = AnimaisData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AnimaisData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AnimaisData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }






    });


    // Variedades controler
     app.controller('VariedadesController', function($scope, $http, VariedadesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: VariedadesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        VariedadesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/variedade.html', selectedItem);
        }



    });

    // VariedadesData Controller
    app.controller('VariedadeController', function($scope, VariedadesData, $sce) {
        $scope.item = VariedadesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = VariedadesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = VariedadesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Floriculturas controler
     app.controller('FloriculturasController', function($scope, $http, FloriculturasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: FloriculturasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        FloriculturasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/floricultura.html', selectedItem);
        }



    });

    // Floricultura Controller
    app.controller('FloriculturaController', function($scope, FloriculturasData, $sce) {
        $scope.item = FloriculturasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = FloriculturasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = FloriculturasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Papelarias controler
     app.controller('PapelariasController', function($scope, $http, PapelariasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PapelariasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PapelariasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/lojas/papelaria.html', selectedItem);
        }



    });

    // papelaria Controller
    app.controller('PapelariaController', function($scope, PapelariasData, $sce) {
        $scope.item = PapelariasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = PapelariasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = PapelariasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Distribuidoras controler
     app.controller('DistribuidorasController', function($scope, $http, DistribuidorasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: DistribuidorasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        DistribuidorasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/alimentos/distribuidora.html', selectedItem);
        }



    });

    // distribuidora Controller
    app.controller('DistribuidoraController', function($scope, DistribuidorasData, $sce) {
        $scope.item = DistribuidorasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = DistribuidorasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = DistribuidorasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // Mercados controler
     app.controller('MercadosController', function($scope, $http, MercadosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: MercadosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        MercadosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/alimentos/mercado.html', selectedItem);
        }



    });

    // Mercado Controller
    app.controller('MercadoController', function($scope, MercadosData, $sce) {
        $scope.item = MercadosData.selectedItem;

         $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = MercadosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = MercadosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Padarias controler
     app.controller('PadariasController', function($scope, $http, PadariasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PadariasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PadariasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/alimentos/padaria.html', selectedItem);
        }



    });

    // Padaria Controller
    app.controller('PadariaController', function($scope, PadariasData, $sce) {
        $scope.item = PadariasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = PadariasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = PadariasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Padarias controler
     app.controller('LanchesController', function($scope, $http, LanchonetesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: LanchonetesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        LanchonetesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/alimentos/lanchonete.html', selectedItem);
        }



    });

    // Padaria Controller
    app.controller('LancheController', function($scope, LanchonetesData, $sce) {
        $scope.item = LanchonetesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = LanchonetesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = LanchonetesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });



     

    // Açougues controler
     app.controller('AcouguesController', function($scope, $http, AcouguesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AcouguesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AcouguesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/alimentos/acougue.html', selectedItem);
        }



    });

    // Açougue Controller
    app.controller('AcougueController', function($scope, AcouguesData, $sce) {
        $scope.item = AcouguesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AcouguesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AcouguesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Salões controler
     app.controller('SaloesController', function($scope, $http, SaloesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: SaloesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        SaloesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/estetica/salao.html', selectedItem);
        }



    });

    // Salao Controller
    app.controller('SalaoController', function($scope, SaloesData, $sce) {
        $scope.item = SaloesData.selectedItem;
  
        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = SaloesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = SaloesData.selectedItem.custom_fields.listfy_slidesobre;
        $scope.slideservico = SaloesData.selectedItem.custom_fields.listfy_slideservicos;

        $scope.estetica = SaloesData.selectedItem.custom_fields.listfy_servicoestetica;
        $scope.depilacao = SaloesData.selectedItem.custom_fields.listfy_servicodepilacao;
        $scope.sobrancelha = SaloesData.selectedItem.custom_fields.listfy_servicounha;
        $scope.unha = SaloesData.selectedItem.custom_fields.listfy_descricaounha;
        $scope.cabelo = SaloesData.selectedItem.custom_fields.listfy_servicocabelo;
        $scope.maquiagem = SaloesData.selectedItem.custom_fields.listfy_servicomaquiagem;
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }
        

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Esteticas controler
     app.controller('EsteticasController', function($scope, $http, EsteticasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: EsteticasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        EsteticasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/estetica/estetica.html', selectedItem);
        }



    });

    // Estetica Controller
    app.controller('EsteticaController', function($scope, EsteticasData, $sce) {
        $scope.item = EsteticasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = EsteticasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = EsteticasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Podologia controler
     app.controller('PodologiasController', function($scope, $http, PodologiasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PodologiasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PodologiasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/estetica/podologia.html', selectedItem);
        }



    });

    // Podologia Controller
    app.controller('PodologiaController', function($scope, PodologiasData, $sce) {
        $scope.item = PodologiasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = PodologiasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = PodologiasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Barbearias controler
     app.controller('BarbeariasController', function($scope, $http, BarbeariasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: BarbeariasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        BarbeariasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/estetica/barbearia.html', selectedItem);
        }



    });

    // Barbearia Controller
    app.controller('BarbeariaController', function($scope, BarbeariasData, $sce) {
        $scope.item = BarbeariasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = BarbeariasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = BarbeariasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Cosmeticos controler
     app.controller('CosmeticosController', function($scope, $http, CosmeticosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: CosmeticosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        CosmeticosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/estetica/cosmetico.html', selectedItem);
        }



    });

    // Cosmetico Controller
    app.controller('CosmeticoController', function($scope, CosmeticosData, $sce) {
        $scope.item = CosmeticosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = CosmeticosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = CosmeticosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Farmacias controler
     app.controller('FarmaciasController', function($scope, $http, FarmaciasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: FarmaciasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        FarmaciasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/saude/farmacia.html', selectedItem);
        }



    });

    // Farmacia Controller
    app.controller('FarmaciaController', function($scope, FarmaciasData, $sce) {
        $scope.item = FarmaciasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = FarmaciasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = FarmaciasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Clinicas controler
     app.controller('ClinicasController', function($scope, $http, ClinicasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ClinicasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ClinicasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/saude/clinica.html', selectedItem);
        }



    });

    // Clinica Controller
    app.controller('ClinicaController', function($scope, ClinicasData, $sce) {
        $scope.item = ClinicasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = ClinicasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ClinicasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Hospitais controler
     app.controller('HospitaisController', function($scope, $http, HospitaisData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: HospitaisData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        HospitaisData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/saude/hospital.html', selectedItem);
        }



    });

    // Hospital Controller
    app.controller('HospitalController', function($scope, HospitaisData, $sce) {
        $scope.item = HospitaisData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = HospitaisData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = HospitaisData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Fisioterapias controler
     app.controller('FisioterapiasController', function($scope, $http, FisioterapiasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: FisioterapiasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        FisioterapiasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/saude/fisioterapia.html', selectedItem);
        }



    });

    // Fisioterapia Controller
    app.controller('FisioterapiaController', function($scope, FisioterapiasData, $sce) {
        $scope.item = FisioterapiasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // Dentistas controler
     app.controller('DentistasController', function($scope, $http, DentistasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: DentistasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        DentistasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/saude/dentista.html', selectedItem);
        }



    });

    // Dentista Controller
    app.controller('DentistaController', function($scope, DentistasData, $sce) {
        $scope.item = DentistasData.selectedItem;

         $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = DentistasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = DentistasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // Oticas controler
     app.controller('OticasController', function($scope, $http, OticasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: OticasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        OticasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/saude/otica.html', selectedItem);
        }



    });

    // Otica Controller
    app.controller('OticaController', function($scope, OticasData, $sce) {
        $scope.item = OticasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = OticasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = OticasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Academias controler
     app.controller('AcademiasController', function($scope, $http, AcademiasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AcademiasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AcademiasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/academias/academia.html', selectedItem);
        }



    });

    // Academia Controller
    app.controller('AcademiaController', function($scope, AcademiasData, $sce) {
        $scope.item = AcademiasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AcademiasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AcademiasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Suplementos controler
     app.controller('SuplementosController', function($scope, $http, SuplementosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: SuplementosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        SuplementosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/academias/suplemento.html', selectedItem);
        }



    });

    // Suplemento Controller
    app.controller('SuplementoController', function($scope, SuplementosData, $sce) {
        $scope.item = SuplementosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = SuplementosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = SuplementosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Artes controler
     app.controller('ArtesController', function($scope, $http, ArtesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ArtesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ArtesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/academias/arte.html', selectedItem);
        }



    });

    // Arte Controller
    app.controller('ArteController', function($scope, ArtesData, $sce) {
        $scope.item = ArtesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = ArtesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ArtesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

    });


// lojas esportes controler
     app.controller('lojasesportesController', function($scope, $http, Lojasesportes) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: Lojasesportes.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        Lojasesportes.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/academias/lojaesporte.html', selectedItem);
        }



    });

    // loja esporte Controller
    app.controller('lojaesporteController', function($scope, Lojasesportes, $sce) {
        $scope.item = Lojasesportes.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = Lojasesportes.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = Lojasesportes.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }


    });

    // Chaveiros controler
     app.controller('ChaveirosController', function($scope, $http, ChaveirosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ChaveirosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ChaveirosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/servicos/chaveiro.html', selectedItem);
        }



    });

    // Chaveiro Controller
    app.controller('ChaveiroController', function($scope, ChaveirosData, $sce) {
        $scope.item = ChaveirosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = ChaveirosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ChaveirosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // Gases controler
     app.controller('GasesController', function($scope, $http, GasesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: GasesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        GasesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/servicos/gas.html', selectedItem);
        }



    });

    // Gas Controller
    app.controller('GasController', function($scope, GasesData, $sce) {
        $scope.item = GasesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = GasesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = GasesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Advocacias controler
     app.controller('AdvocaciasController', function($scope, $http, AdvocaciasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AdvocaciasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AdvocaciasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/servicos/advocacia.html', selectedItem);
        }



    });

    // Advocacia Controller
    app.controller('AdvocaciaController', function($scope, AdvocaciasData, $sce) {
        $scope.item = AdvocaciasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AdvocaciasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AdvocaciasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Informaticas controler
     app.controller('InformaticasController', function($scope, $http, InformaticasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: InformaticasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        InformaticasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/servicos/informatica.html', selectedItem);
        }



    });

    // Informatica Controller
    app.controller('InformaticaController', function($scope, InformaticasData, $sce) {
        $scope.item = InformaticasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = InformaticasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = InformaticasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Contabilidades controler
     app.controller('ContabilidadesController', function($scope, $http, ContabilidadesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ContabilidadesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ContabilidadesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/servicos/contabilidade.html', selectedItem);
        }



    });

    // Contabilidade Controller
    app.controller('ContabilidadeController', function($scope, ContabilidadesData, $sce) {
        $scope.item = ContabilidadesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = ContabilidadesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ContabilidadesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Outros controler
     app.controller('OutrosController', function($scope, $http, OutrosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: OutrosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        OutrosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/servicos/outro.html', selectedItem);
        }



    });

    // Outro Controller
    app.controller('OutroController', function($scope, OutrosData, $sce) {
        $scope.item = OutrosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = OutrosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = OutrosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Materiais controler
     app.controller('MateriaisController', function($scope, $http, MateriaisData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: MateriaisData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        MateriaisData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/casa/material.html', selectedItem);
        }



    });

    // Material Controller
    app.controller('MaterialController', function($scope, MateriaisData, $sce) {
        $scope.item = MateriaisData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = MateriaisData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = MateriaisData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // Decoracoes controler
     app.controller('DecoracoesController', function($scope, $http, DecoracoesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: DecoracoesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        DecoracoesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/casa/decoracao.html', selectedItem);
        }



    });

    // Decoracao Controller
    app.controller('DecoracaoController', function($scope, DecoracoesData, $sce) {
        $scope.item = DecoracoesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = DecoracoesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = DecoracoesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // venda e aluguel controler
     app.controller('vendasalugueisController', function($scope, $http, VendasalugueisData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: VendasalugueisData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        VendasalugueisData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/casa/venda.html', selectedItem);
        }



    });

    // Decoracao Controller
    app.controller('vendaaluguelController', function($scope, VendasalugueisData, $sce) {
        $scope.item = VendasalugueisData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = VendasalugueisData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = VendasalugueisData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Profissionais controler
     app.controller('ProfissionaisController', function($scope, $http, ProfissionaisData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ProfissionaisData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ProfissionaisData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/casa/profissional.html', selectedItem);
        }



    });

  

    // profissionais Controller
    app.controller('ProfissionalController', function($scope, ProfissionaisData, $sce) {
        $scope.item = ProfissionaisData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe.length);
        $scope.galeria = ProfissionaisData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ProfissionaisData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });




       // Plantao controler
     app.controller('PlantoesController', function($scope, $http, PlantaoData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PlantaoData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PlantaoData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('servicos/plantao.html', selectedItem);
        }



    });

     // plantao publica Controller
    app.controller('PlantaoController', function($scope, PlantaoData, $sce) {
        $scope.item = PlantaoData.selectedItem;


        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }


    });


    // Telefones Uteís controler
    app.controller('TelefonesUteisController', function($scope, $http, TelefonesData) {

         $('.loading').show();
        var getData = function ($done) {

            $http({method: 'GET', url: TelefonesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;
                 $('.loading').hide();

                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                    return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                    return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                    page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {

                $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
                if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };


        $scope.showDetail = function(index) {
            var selectedItem = $scope.posts[index];
            TelefonesData.selectedItem = selectedItem;
            $scope.myNavigator = myNavigator.pushPage('servicos/servico.html', selectedItem);
        }



    });

    // Telefone Util Controller
    app.controller('TelefoneutilController', function($scope, TelefonesData, $sce) {
        $scope.item = TelefonesData.selectedItem;


        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });



    // empregos controler
     app.controller('EmpregosController', function($scope, $http, EmpregosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: EmpregosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        EmpregosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('servicos/empregos.html', selectedItem);
        }



    });

     // Emprego Controller
    app.controller('EmpregoController', function($scope, EmpregosData, $sce) {
        $scope.item = EmpregosData.selectedItem;


        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Moto taxi controler
     app.controller('MotosTaxisController', function($scope, $http, MotoTaxiData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: MotoTaxiData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        MotoTaxiData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('servicos/mototaxi.html', selectedItem);
        }



    });

     // plantao publica Controller
    app.controller('EmpregoController', function($scope, EmpregosData, $sce) {
        $scope.item = EmpregosData.selectedItem;


        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Moto taxi controler
     app.controller('TaxisController', function($scope, $http, TaxiData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: TaxiData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        TaxiData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('servicos/taxi.html', selectedItem);
        }



    });

     // plantao publica Controller
    app.controller('EmpregoController', function($scope, EmpregosData, $sce) {
        $scope.item = EmpregosData.selectedItem;


        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // utilidade publica controler
     app.controller('UtilidadesPublicaController', function($scope, $http, UtilidadePublicaData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: UtilidadePublicaData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        UtilidadePublicaData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('servicos/servico.html', selectedItem);
        }



    });

    // utilidade publica Controller
    app.controller('UtilidadePublicaController', function($scope, UtilidadePublicaData, $sce) {
        $scope.item = UtilidadePublicaData.selectedItem;


        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Eletros controler
     app.controller('EletrosController', function($scope, $http, EletrosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: EletrosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        EletrosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/casa/eletro.html', selectedItem);
        }



    });

    // Eletro Controller
    app.controller('EletroController', function($scope, EletrosData, $sce) {
        $scope.item = EletrosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = EletrosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = EletrosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Bares controler
     app.controller('BaresController', function($scope, $http, BaresData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: BaresData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        BaresData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/bares/bar.html', selectedItem);
        }



    });

    // Bar Controller
    app.controller('BarController', function($scope, BaresData, $sce) {
        $scope.item = BaresData.selectedItem;

         $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = BaresData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = BaresData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Restaurantes controler
     app.controller('RestaurantesController', function($scope, $http, RestaurantesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: RestaurantesData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        RestaurantesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/bares/restaurante.html', selectedItem);
        }



    });

    // Restaurante Controller
    app.controller('RestauranteController', function($scope, RestaurantesData, $sce) {
        $scope.item = RestaurantesData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = RestaurantesData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = RestaurantesData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Pizzarias controler
     app.controller('PizzariasController', function($scope, $http, PizzariasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: PizzariasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        PizzariasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/bares/pizzaria.html', selectedItem);
        }



    });

    // Pizzaria Controller
    app.controller('PizzariaController', function($scope, PizzariasData, $sce) {
        $scope.item = PizzariasData.selectedItem;

         $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = PizzariasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = PizzariasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Escolas controler
     app.controller('EscolasController', function($scope, $http, EscolasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: EscolasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        EscolasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/educacao/escola.html', selectedItem);
        }



    });


    // Escola Controller
    app.controller('EscolaController', function($scope, $filter, EscolasData, $sce) {
        $scope.item = EscolasData.selectedItem;

        $scope.professor = {};
        $scope.professoritems = [];
        $scope.prof = [];

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = EscolasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = EscolasData.selectedItem.custom_fields.listfy_slidesobre;
        $scope.estrutura = EscolasData.selectedItem.custom_fields.listfy_estrutura;
        $scope.professor = EscolasData.selectedItem.custom_fields.listfy_nomeprofessor;       
        $scope.segmento = EscolasData.selectedItem.custom_fields.listfy_segmento;
        $scope.servicos = EscolasData.selectedItem.custom_fields.listfy_servico;

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Cursos controler
     app.controller('CursosController', function($scope, $http, CursosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: CursosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        CursosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/educacao/curso.html', selectedItem);
        }



    });

    // Curso Controller
    app.controller('CursoController', function($scope, CursosData, $sce) {
        $scope.item = CursosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = CursosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = CursosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });



    // Treinamentos controler
     app.controller('TreinamentosController', function($scope, $http, TreinamentosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: TreinamentosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        TreinamentosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/educacao/treinamento.html', selectedItem);
        }



    });

    // Treinamento Controller
    app.controller('TreinamentoController', function($scope, TreinamentosData, $sce) {
        $scope.item = TreinamentosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = TreinamentosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = TreinamentosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Autopecas controler
     app.controller('AutopecasController', function($scope, $http, AutopecasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AutopecasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AutopecasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/automotivo/autopeca.html', selectedItem);
        }



    });

    // Autopeca Controller
    app.controller('AutopecaController', function($scope, AutopecasData, $sce) {
        $scope.item = AutopecasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AutopecasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AutopecasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


     // Autoservicos controler
     app.controller('AutoservicosController', function($scope, $http, AutoservicosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AutoservicosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AutoservicosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/automotivo/autoservico.html', selectedItem);
        }



    });

    // Autoservico Controller
    app.controller('AutoservicoController', function($scope, AutoservicosData, $sce) {
        $scope.item = AutoservicosData.selectedItem;

         $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AutoservicosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AutoservicosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }



        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Acessoriosauto controler
     app.controller('AcessoriosautoController', function($scope, $http, AcessoriosautoData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: AcessoriosautoData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        AcessoriosautoData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/automotivo/acessorioauto.html', selectedItem);
        }



    });

    // Acessorioauto Controller
    app.controller('AcessorioautoController', function($scope, AcessoriosautoData, $sce) {
        $scope.item = AcessoriosautoData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = AcessoriosautoData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = AcessoriosautoData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Lavajatos controler
     app.controller('LavajatosController', function($scope, $http, LavajatosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: LavajatosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        LavajatosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/automotivo/lavajato.html', selectedItem);
        }



    });

    // Lavajato Controller
    app.controller('LavajatoController', function($scope, LavajatosData, $sce) {
        $scope.item = LavajatosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = LavajatosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = LavajatosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

     // Chaparias controler
     app.controller('ChapariasController', function($scope, $http, ChapariasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ChapariasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ChapariasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/automotivo/chaparia.html', selectedItem);
        }



    });

    // Chaparia Controller
    app.controller('ChapariaController', function($scope, ChapariasData, $sce) {
        $scope.item = ChapariasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = ChapariasData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ChapariasData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


    // Guinchos controler
     app.controller('GuinchosController', function($scope, $http, GuinchosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: GuinchosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        GuinchosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/automotivo/guincho.html', selectedItem);
        }



    });

    // Guincho Controller
    app.controller('GuinchoController', function($scope, GuinchosData, $sce) {
        $scope.item = GuinchosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = GuinchosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = GuinchosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Artigosfesta controler
     app.controller('ArtigosfestaController', function($scope, $http, ArtigosfestaData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: ArtigosfestaData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        ArtigosfestaData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/festaseventos/artigofesta.html', selectedItem);
        }



    });

    // Artigofesta Controller
    app.controller('ArtigofestaController', function($scope, ArtigosfestaData, $sce) {
        $scope.item = ArtigosfestaData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = ArtigosfestaData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = ArtigosfestaData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Bolosbuffets controler
     app.controller('BolosbuffetsController', function($scope, $http, BolosbuffetsData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: BolosbuffetsData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        BolosbuffetsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/festaseventos/bolobuffet.html', selectedItem);
        }



    });

    // Bolobuffet Controller
    app.controller('BolobuffetController', function($scope, BolosbuffetsData, $sce) {
        $scope.item = BolosbuffetsData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = BolosbuffetsData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = BolosbuffetsData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

    // Fotosvideos controler
     app.controller('FotosvideosController', function($scope, $http, FotosvideosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: FotosvideosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        FotosvideosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/festaseventos/fotovideo.html', selectedItem);
        }



    });

    // Fotovideo Controller
    app.controller('FotovideoController', function($scope, FotosvideosData, $sce) {
        $scope.item = FotosvideosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = FotosvideosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = FotosvideosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });

        // Alugueis de espaço
     app.controller('EspacosController', function($scope, $http, espacosData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: espacosData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 50;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        espacosData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/categoria/festaseventos/espaco.html', selectedItem);
        }



    });

    // Espaço Controller
    app.controller('espacoController', function($scope, espacosData, $sce) {
        $scope.item = espacosData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);
        $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
        $scope.galeria = espacosData.selectedItem.custom_fields.listfy_galeriadeimagens;
        $scope.slidesobre = espacosData.selectedItem.custom_fields.listfy_slidesobre;
        
        

         $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });







 // Entretenimento Controller
    app.controller('EntretenimentosController', function($scope, $http, EntretenimentoData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: EntretenimentoData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 10;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };
                       // getServerPosts() function()
        $scope.getServerPosts = function() {
            // Filter Server Posts by $scope.search
            return $scope.posts.filter(function(item) {

                // Filter Server Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter Server Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        EntretenimentoData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('entretenimento.html', selectedItem);
        }

    });

    // Post Controller
    app.controller('EntretenimentoController', function($scope, EntretenimentoData, $sce) {
        $scope.item = EntretenimentoData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

    });









        // Ofertas Controller
    app.controller('OfertasController', function($scope, $http, OfertasData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: OfertasData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 3;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        OfertasData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('oferta.html', selectedItem);
        }

    });

    // Oferta Controller
    app.controller('OfertaController', function($scope, OfertasData, $sce) {
        $scope.item = OfertasData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });
    /////////////////////////////////////vinnnnyyycontroler /////////////////////////////////////////





    //taxi controller

    app.controller('TaxiController', function($scope, $http, $filter, TaxiData) {

        $('.loading').show();

        var getData = function ($done) {
            $scope.page = 1;
            $scope.more = false;
            $scope.status_bar = "";
            $scope.posts = [];
            $scope.loadData($done);
        }

        $scope.loadData = function ($done) {

            $http({method: 'GET', url: TaxiData.url }).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Encontramos "  + $filter('number')($scope.posts.length) + " Resultados!";

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $('.loading').show();
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();

        // getServerPosts() function()
        $scope.getServerPosts = function() {
            // Filter Server Posts by $scope.search
            return $scope.posts.filter(function(item) {

                // Filter Server Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter Server Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showDetail = function(index) {
        var items = $scope.getServerPosts();
        var selectedItem = items[index];
        TaxiData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('taxi.html', selectedItem);
        }



    });

    //Destaques controller

    app.controller('DestaquesController', function($scope, $http, $filter, DestaquesData) {

        $('.loading').show();

        var getData = function ($done) {
            $scope.page = 1;
            $scope.more = false;
            $scope.status_bar = "";
            $scope.posts = [];
            $scope.loadData($done);
        }

        $scope.loadData = function ($done) {

            $http({method: 'GET', url: TaxiData.url }).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Encontramos "  + $filter('number')($scope.posts.length) + " Resultados!";

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $('.loading').show();
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();

        // getServerPosts() function()
        $scope.getServerPosts = function() {
            // Filter Server Posts by $scope.search
            return $scope.posts.filter(function(item) {

                // Filter Server Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter Server Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showDetail = function(index) {
        var items = $scope.getServerPosts();
        var selectedItem = items[index];
        TaxiData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('taxi.html', selectedItem);
        }



    });






//Transporte controller
    app.controller('TransporteController', function($scope, $http, $filter, TransporteData) {

        $('.loading').show();

        var getData = function ($done) {
            $scope.page = 1;
            $scope.more = false;
            $scope.status_bar = "";
            $scope.posts = [];
            $scope.loadData($done);
        }

        $scope.loadData = function ($done) {

            $http({method: 'GET', url: TransporteData.url }).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Encontramos "  + $filter('number')($scope.posts.length) + " Resultados!";

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $('.loading').show();
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();

        // getServerPosts() function()
        $scope.getServerPosts = function() {
            // Filter Server Posts by $scope.search
            return $scope.posts.filter(function(item) {

                // Filter Server Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter Server Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getServerPosts();
        var selectedItem = items[index];
        ServerPostsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('transporte.html', selectedItem);
        }



    });










    // Server Posts Controller (Server side pagination with AngularJS)
    app.controller('ServerPostsController', function($scope, $http, $filter, ServerPostsData) {

        $('.loading').show();

        var getData = function ($done) {
            $scope.page = 1;
            $scope.more = false;
            $scope.status_bar = "";
            $scope.posts = [];
            $scope.loadData($done);
        }

        $scope.loadData = function ($done) {

            $http({method: 'GET', url: ServerPostsData.url }).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Encontramos "  + $filter('number')($scope.posts.length) + " Resultados!";

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $('.loading').show();
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();

        // getServerPosts() function()
        $scope.getServerPosts = function() {
            // Filter Server Posts by $scope.search
            return $scope.posts.filter(function(item) {

                // Filter Server Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter Server Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getServerPosts();
        var selectedItem = items[index];
        ServerPostsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('serverpost.html', selectedItem);
        }



    });

    // Server Post Controller
    app.controller('ServerPostController', function($scope, ServerPostsData, $sce) {
        $scope.item = ServerPostsData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

    });

    // Categories Controller
    app.controller('CategoriesController', function($scope, $http, CategoriesData) {

        $('.loading').show();

        $http({method: 'GET', url: CategoriesData.url}).
        success(function(data, status, headers, config) {
            $scope.categories = data.categories;

            $('.loading').hide();

            if ($scope.categories.length < 1)
            {
                $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
            }else{
                $scope.msg = undefined;
            }

            var page = 1;
            // Define the initial number of the categories in the page
            var pageSize = 50;

            $scope.paginationLimit = function(data) {
            return pageSize * page;
            };

            $scope.hasMoreItems = function() {
            return page < ($scope.categories.length / pageSize);
            };

            $scope.showMoreItems = function() {
            page = page + 1;
            };

        }).
        error(function(data, status, headers, config) {
        $('.loading').hide();
        $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
        });

        $scope.showDetail = function(index) {
        var selectedItem = $scope.categories[index];
        CategoriesData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('category-posts.html', selectedItem);
        }

    });

    // Category Posts Controller
    app.controller('CategoryPostsController', function($scope, $http, $filter, CategoriesData) {

        $('.loading').show();

        var getData = function ($done) {
            $scope.page = 1;
            $scope.more = false;
            $scope.status_bar = "";
            $scope.posts = [];
            $scope.loadData($done);
        }

        $scope.loadData = function ($done) {

            $http({method: 'GET', url: CategoriesData.category_url + 'id=' + CategoriesData.selectedItem.id + '&page=' + $scope.page}).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                $scope.title = CategoriesData.selectedItem.title;
                $scope.more = data.pages !== $scope.page;
                $scope.posts = $scope.posts.concat(data.posts);
                $scope.status_bar = "Mostrando  " + ($scope.posts.length === 0 ? "0" : "1") + " to " + $filter('number')($scope.posts.length);

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            if ($done) { $done(); }
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            });

        }

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showMoreItems = function () {
            $scope.page += 1;
            $('.loading').show();
            $scope.loadData();
        }

        $scope.hasMoreItems = function () {
            return $scope.more;
        }

        $scope.page = 1;
        $scope.posts = [];
        $scope.title="";
        $scope.more = true;
        $scope.status_bar = "";
        $scope.loadData();

        // getCategoryPosts() function()
        $scope.getCategoryPosts = function() {
            // Filter Category Posts by $scope.search
            return $scope.posts.filter(function(item) {

                // Filter Category Posts by Title
                var itemDoesMatch = !$scope.search ||
                item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                // Filter Category Posts by Title or Body
                //var itemDoesMatch = !$scope.search ||
                //item.title.toLowerCase().indexOf($scope.search.toLowerCase()) > -1 ||
                //item.body.toLowerCase().indexOf($scope.search.toLowerCase()) > -1;

                return itemDoesMatch;
            });
        };

        // Search Detail function()
        $scope.showSearchDetail = function(index) {
        var items = $scope.getCategoryPosts();
        var lastSelectedItem = items[index];
        CategoriesData.lastSelectedItem = lastSelectedItem;
        $scope.myNavigator = myNavigator.pushPage('category-post.html', lastSelectedItem);
        }

    });

    // Category Post Controller
    app.controller('CategoryPostController', function($scope, CategoriesData, $sce) {
        $scope.item = CategoriesData.lastSelectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });

   // RSS: Feeds Controller
    app.controller('FeedsController', function($scope, $http, FeedData, FeedStorage) {

        $('.loading').show();
        $scope.feeds = "";

        var getData = function ($done) {

            $http({method: 'JSONP', url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(FeedData.url)}).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                if (!data.responseData) {
                    $scope.data = FeedStorage.get();
                    $scope.msg = "Offline Mode - The device is unable to get the data.";

                    $scope.title = $scope.data.feed.title;
                    $scope.description = $scope.data.feed.description;
                    $scope.link = $scope.data.feed.link;
                    $scope.feeds = $scope.data.feed.entries;
                } else {
                    $scope.title = data.responseData.feed.title;
                    $scope.description = data.responseData.feed.description;
                    $scope.link = data.responseData.feed.link;
                    $scope.feeds = data.responseData.feed.entries;

                    // Save feeds to the local storage
                    FeedStorage.save(data.responseData);
                }

            }).
            error(function(data, status, headers, config) {

            $('.loading').hide();
            if ($done) { $done(); }

            $scope.data = FeedStorage.get();
            $scope.msg = 'Offline Mode - Favor verificar a conexão com a internet e tentar novamente...:' + status;

            $scope.title = $scope.data.feed.title;
            $scope.description = $scope.data.feed.description;
            $scope.link = $scope.data.feed.link;
            $scope.feeds = $scope.data.feed.entries;

            });
        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        var page = 1;
        // Define the number of the feed results in the page
        var pageSize = 5;

        $scope.paginationLimit = function(data) {
        return pageSize * page;
        };

        $scope.hasMoreItems = function() {
        return page < ($scope.feeds.length / pageSize);
        };

        $scope.showMoreItems = function() {
        page = page + 1;
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.feeds[index];
        FeedData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('feed.html', selectedItem);
        }

        $scope.getImage = function(index) {
        var selectedItem = $scope.feeds[index];
        var content = selectedItem.content;
        var element = $('<div>').html(content);
        var source = element.find('img').attr("src");
        return source;
        }

    });

    // RSS: Feed Controller
    app.controller('FeedController', function($scope, FeedData, $sce) {
        $scope.item = FeedData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.link;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });

    // About: About Controller
    app.controller('AboutController', function($scope, $http, AboutData) {

        $http({method: 'GET', url: AboutData.url}).
        success(function(data, status, headers, config) {
            $scope.about = data.result;
        }).
        error(function(data, status, headers, config) {

        });

        $scope.showDetail = function(index) {
        var selectedItem = $scope.about[index];
        AboutData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('member.html', selectedItem);
        }

    });

    // About: Member Controller
    app.controller('MemberController', function($scope, AboutData) {
        $scope.item = AboutData.selectedItem;
     });

    // Gallery Controller
    app.controller('GalleryController', function($scope, GalleryData) {

        var items = GalleryData.items;

        function addSlides(target) {
            angular.forEach(items,function(item,index){
                target.push({
                    label: item.label,
                    picture: item.src,
                    location: item.location,
                    item: (index + 1)
                });
            });
         };

        $scope.slides = [];
        addSlides($scope.slides);

    });

    // Settings Controller
    app.controller('SettingsController', function($scope, SettingsData, localStorageService, FeedStorage) {
        $scope.settings = SettingsData.items;

        if (localStorageService.get('settings')) {
            $scope.settings = localStorageService.get('settings');
        }

        $scope.saveSettings = function() {
            localStorageService.clearAll();
            localStorageService.add('settings',$scope.settings);
        };

        $scope.clearLocalStorage = function() {
        FeedStorage.clear();
        }



    });

    // Modal View: Modal Controller
    app.controller('ModalController', function($scope) {


        $scope.show = function () {
            Smooch.show();
        }

        $scope.hide = function () {
            modal.hide();
        }

     });

    // Feed Plugin: Categories Controller
    app.controller('FeedPluginCategoriesController', function($scope, $http, FeedPluginData) {

        $http({method: 'GET', url: FeedPluginData.url}).
        success(function(data, status, headers, config) {
            $scope.categories = data.categories;
        }).
        error(function(data, status, headers, config) {

        });

        $scope.showDetail = function(index) {
        var selectedItem = $scope.categories[index];
        FeedPluginData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('feed-category.html', {title : selectedItem.title});
        }

    });

    // Feed Plugin: Category Controller
    app.controller('FeedPluginCategoryController', function($scope, FeedPluginData) {

        $scope.title = FeedPluginData.selectedItem.title;
        $scope.items = FeedPluginData.selectedItem.items;

        $scope.showDetail = function(index) {
        var selectedItem = $scope.items[index];
        FeedPluginData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('feed-master.html', {title : selectedItem.title});
        }

    });

    // Feed Plugin: Master Controller
    app.controller('FeedPluginMasterController', function($scope, $http, FeedPluginData) {

        $('.loading').show();
        $scope.feeds = "";
        $scope.url = FeedPluginData.selectedItem.url;

        var getData = function ($done) {

            $http({method: 'JSONP', url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent($scope.url)}).
            success(function(data, status, headers, config) {

                $('.loading').hide();
                if ($done) { $done(); }

                if (!data.responseData) {
                    $scope.msg = "The device is unable to get the data.";
                } else {
                    $scope.title = data.responseData.feed.title;
                    $scope.description = data.responseData.feed.description;
                    $scope.link = data.responseData.feed.link;
                    $scope.feeds = data.responseData.feed.entries;
                }

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            if ($done) { $done(); }
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        var page = 1;
        // Define the number of the feed results in the page
        var pageSize = 20;

        $scope.paginationLimit = function(data) {
        return pageSize * page;
        };

        $scope.hasMoreItems = function() {
        return page < ($scope.feeds.length / pageSize);
        };

        $scope.showMoreItems = function() {
        page = page + 1;
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.feeds[index];
        FeedPluginData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('feed-detail.html', selectedItem);
        }

        $scope.mediaObject = function(item) {
            return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
        }

        $scope.hasVideo = function(item) {
            var media = $scope.mediaObject(item);

            //JAVASCRIPT: condition ? val1 : val2
            //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
            return media.type ? (media.type == "video/mp4") : false;
        }

        $scope.hasAudio = function(item) {
            var media = $scope.mediaObject(item);

            //JAVASCRIPT: condition ? val1 : val2
            return media.type ? (media.type == "audio/mp3") : false;
        }

        $scope.getImage = function(index) {
        var selectedItem = $scope.feeds[index];
        var content = selectedItem.content;
        var element = $('<div>').html(content);
        var source = element.find('img').attr("src");
        return source;
        }

    });

    // Feed Plugin: Detail Controller
    app.controller('FeedPluginDetailController', function($scope, $sce, FeedPluginData) {
        $scope.item = FeedPluginData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.mediaObject = function(item) {
            return (item && item.mediaGroups) ? item.mediaGroups[0].contents[0] : {url:''};
        }

        $scope.hasVideo = function(item) {
            var media = $scope.mediaObject(item);

            //JAVASCRIPT: condition ? val1 : val2
            //return media.type ? (media.type == "video/mp4") : (media.url ? (media.url.indexOf(".mp4") != -1) : false);
            return media.type ? (media.type == "video/mp4") : false;
        }

        $scope.hasAudio = function(item) {
            var media = $scope.mediaObject(item);

            //JAVASCRIPT: condition ? val1 : val2
            return media.type ? (media.type == "audio/mp3") : false;
        }

        $scope.getTrustedResourceUrl = function(src) {
            return $sce.trustAsResourceUrl(src);
        }

        $scope.loadURL = function () {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open($scope.item.link,'_blank');
        }

        $scope.shareFeed = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.link;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

     });

    // NVD3 View: NVD3 Controller
    app.controller('NVD3Controller', function($scope, NVD3Data) {

        var data = NVD3Data;

        /* Chart options */
        $scope.options = data.options;

        /* Chart data */
        $scope.data = data.data;

     });

    // PLUGINS: Device Controller
    app.controller('DeviceController', function($scope) {

        $scope.device = device;

    });

    // PLUGINS: Geolocation Controller
    app.controller('GeolocationController', function($scope) {

        $scope.latitude = '0';
        $scope.longitude = '0';
        $scope.accuracy = '0';
        $scope.altitude = '0';
        $scope.altitudeAccuracy = '0';
        $scope.heading = '0';
        $scope.speed = '0';
        $scope.timestamp = '0';
        $scope.error = '';
        $scope.model = { map: undefined };
        $scope.markers = [];

        $scope.showResult = function () {
            return $scope.error == '';
        }

        $scope.mapOptions = {
            center: new google.maps.LatLng($scope.latitude, $scope.longitude),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.showPosition = function (position) {
            $scope.latitude = position.coords.latitude;
            $scope.longitude = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.altitude = position.coords.altitude;
            $scope.altitudeAccuracy = position.coords.altitudeAccuracy;
            $scope.heading = position.coords.heading;
            $scope.speed = position.coords.speed;
            $scope.timestamp = position.timestamp;
            $scope.$apply();

            var latlng = new google.maps.LatLng($scope.latitude, $scope.longitude);
            $scope.model.map.setCenter(latlng);
            $scope.markers.push(new google.maps.Marker({ map: $scope.model.map, position: latlng }));
        }

        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User does not allow the app to retrieve position information."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "The device is unable to retrieve a position. In general, this means the device is not connected to a network or can't get a satellite fix."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                var options = { enableHighAccuracy: true };
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError, options);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();

    });

    // PLUGINS: Notifications Controller
    app.controller('NotificationsController', function($scope) {

        $scope.alertNotify = function() {
        navigator.notification.alert("Sample Alert",function() {console.log("Alert success")},"My Alert","Close");
        };

        $scope.beepNotify = function() {
        navigator.notification.beep(1);
        };

        $scope.vibrateNotify = function() {
        navigator.notification.vibrate(3000);
        };

        $scope.confirmNotify = function() {
        navigator.notification.confirm("My Confirmation",function(){console.log("Confirm Success")},"Are you sure?",["Ok","Cancel"]);
        };

    });

    // Barcodescanner Controller
    app.controller('BarcodescannerController', function($scope) {

        $scope.scan = function() {
            cordova.plugins.barcodeScanner.scan(function(result) {
                $scope.result = result;
                $scope.$apply();
            }, function(error) {
                $scope.error = error;
                $scope.$apply();
            });
        }

    });

    // Filter
    app.filter('partition', function($cacheFactory) {
          var arrayCache = $cacheFactory('partition');
          var filter = function(arr, size) {
            if (!arr) { return; }
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            var cachedParts;
            var arrString = JSON.stringify(arr);
            cachedParts = arrayCache.get(arrString+size);
            if (JSON.stringify(cachedParts) === JSON.stringify(newArr)) {
              return cachedParts;
            }
            arrayCache.put(arrString+size, newArr);
            return newArr;
          };
          return filter;
        });

//////////////////////////////////////////////////

//vinny mexeu aki


// Wordpress Posts Controller

    // Destaques Controller
    app.controller('DestaquesController', function($scope, $http, DestaquesData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: DestaquesData.url}).
            success(function(data, status, headers, config) {
                $scope.destaqueslug = data.destaqueslug;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.destaqueslug.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 20;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.destaqueslug.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.destaqueslug[index];
        PostsData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('destaques.html', selectedItem);
        }

    });





    // noticias Controller
        app.controller('NoticiasitemController', function($scope, $http, NoticiasitemData) {

            $('.loading').show();

            var getData = function ($done) {

                $http({method: 'GET', url: NoticiasitemData.url}).
                success(function(data, status, headers, config) {
                    $scope.posts = data.posts;

                    $('.loading').hide();
                    if ($done) { $done(); }

                    if ($scope.posts.length < 1)
                    {
                        $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                    }else{
                        $scope.msg = undefined;
                    }

                    var page = 1;
                    // Define the number of the posts in the page
                    var pageSize = 20;

                    $scope.paginationLimit = function(data) {
                    return pageSize * page;
                    };

                    $scope.hasMoreItems = function() {
                    return page < ($scope.posts.length / pageSize);
                    };

                    $scope.showMoreItems = function() {
                    page = page + 1;
                    };



                }).
                error(function(data, status, headers, config) {
                $('.loading').hide();
                $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
                if ($done) { $done(); }
                });

            }

            // Initial Data Loading
            getData();

            $scope.load = function($done) {
                getData($done);
            };

            $scope.detalhescat = function(index) {
            var selectedItem = $scope.posts[index];
            NoticiasitemData.selectedItem = selectedItem;
            $scope.myNavigator = myNavigator.pushPage('noticiaitem.html', selectedItem);
            }



        });

        // Post Controller
        app.controller('NoticiaitemController', function($scope, NoticiasitemData, $sce) {
            $scope.item = NoticiasitemData.selectedItem;

            $scope.content = $sce.trustAsHtml($scope.item.content);

            $scope.loadURL = function (url) {
                //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
                //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
                //_blank: Opens in the InAppBrowser.
                //_system: Opens in the system's web browser.
                window.open(url,'_blank');
            }

            $scope.sharePost = function () {

                var subject = $scope.item.title;
                var message = $scope.item.content;
                message = message.replace(/(<([^>]+)>)/ig,"");

                var link = $scope.item.url;

                //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
                //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
                window.plugins.socialsharing.share(message, subject, null, link);
            }

         });


/////////////////////////////////
// Eventos Controller
    app.controller('DeliverysController', function($scope, $http, DeliveryData) {

        $('.loading').show();

        var getData = function ($done) {

            $http({method: 'GET', url: DeliveryData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;

                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 20;

                $scope.paginationLimit = function(data) {
                return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                page = page + 1;
                };



            }).
            error(function(data, status, headers, config) {
            $('.loading').hide();
            $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
            if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
        var selectedItem = $scope.posts[index];
        DeliveryData.selectedItem = selectedItem;
        $scope.myNavigator = myNavigator.pushPage('categorias/delivery/delivery.html', selectedItem);
        }



    });

       // delivery Controller
    app.controller('DeliveryController', function($scope, DeliveryData, $sce) {
        $scope.item = DeliveryData.selectedItem;

         $scope.bebidas = DeliveryData.selectedItem.custom_fields.listfy_bebida;
         $scope.sobremesas = DeliveryData.selectedItem.custom_fields.listfy_sobremesa;
         $scope.facebook = $sce.trustAsHtml($scope.item.custom_fields.listfy_facebook['0']);
         $scope.instagram = $sce.trustAsHtml($scope.item.custom_fields.listfy_instagramiframe['0']);
         $scope.ofertas = DeliveryData.selectedItem.custom_fields.listfy_ofertasdelivery;
         $scope.slidesobre = DeliveryData.selectedItem.custom_fields.listfy_slidesobre;



        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.setarurl =  function seturl(target) {

            $scope.urlimg = target.value;

            return $scope.urlimg;
                        
                                    }

                                    $scope.windowOptions = false;

        $scope.onClick = function () {
        this.windowOptions = !this.windowOptions;
        };

        $scope.closeClick = function () {
        this.windowOptions = false;
        };



        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }



    });


// Custom Posts Controller (Server side pagination with AngularJS)

    // Ultilidades Pública Controller Controller
    app.controller('UltilidadesPublicaController', function($scope, $http, UltilidadesPublicaData, NoticiasitemData) {

        


              $scope.playStream =  function () {
                ctrl = document.getElementById('audioControl');
                  try {
                    var myaudio = new Audio('http://170.75.144.234:24660/;');
                    myaudio.id = 'playerMyAdio';
                    myaudio.play();
                    console.log(myaudio);
                  } catch (e) {
                    alert('no audio support!');
                  } 
                }


        var getData = function ($done) {

            $http({method: 'GET', url: UltilidadesPublicaData.url}).
            success(function(data, status, headers, config) {
                $scope.posts = data.posts;


                $('.loading').hide();
                if ($done) { $done(); }

                if ($scope.posts.length < 1)
                {
                    $scope.msg = "Desculpa, Nenhum Resultado Encontrado... ";
                }else{
                    $scope.msg = undefined;
                    $('.carrolsel-hide').show();
                }

                var page = 1;
                // Define the number of the posts in the page
                var pageSize = 20;

                $scope.paginationLimit = function(data) {
                    return pageSize * page;
                };

                $scope.hasMoreItems = function() {
                    return page < ($scope.posts.length / pageSize);
                };

                $scope.showMoreItems = function() {
                    page = page + 1;
                };

            }).
            error(function(data, status, headers, config) {
                $('.loading').hide();
                $scope.msg = 'Favor verificar a conexão com a internet e tentar novamente...:' + status;
                if ($done) { $done(); }
            });

        }

        // Initial Data Loading
        getData();

        $scope.load = function($done) {
            getData($done);
        };

        $scope.showDetail = function(index) {
            var selectedItem = $scope.posts[index];
            UltilidadesPublicaData.selectedItem = selectedItem;
            $scope.myNavigator = myNavigator.pushPage('post.html', selectedItem);
        }

    });

    // Utilidade Controller
    app.controller('UltilidadePublicaController', function($scope, UltilidadesPublicaData, $sce) {
        $scope.item = UltilidadesPublicaData.selectedItem;

        $scope.content = $sce.trustAsHtml($scope.item.content);

        $scope.loadURL = function (url) {
            //target: The target in which to load the URL, an optional parameter that defaults to _self. (String)
            //_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
            //_blank: Opens in the InAppBrowser.
            //_system: Opens in the system's web browser.
            window.open(url,'_blank');
        }

        $scope.sharePost = function () {

            var subject = $scope.item.title;
            var message = $scope.item.content;
            message = message.replace(/(<([^>]+)>)/ig,"");

            var link = $scope.item.url;

            //Documentation: https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin
            //window.plugins.socialsharing.share('Message', 'Subject', 'Image', 'Link');
            window.plugins.socialsharing.share(message, subject, null, link);
        }

    });


// Custom Post Controller




})();
