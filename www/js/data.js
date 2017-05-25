var sensationApp = angular.module('sensationApp');

// Home Data: Home page configuration
sensationApp.factory('Data', function(){
    var data = {};

    data.items = [
        {
            title: 'Guia',
            icon: 'img/guia.png',
            page: 'categories.html',
            cor: '#D81B60',
            labelcor: '#EC407A'
        },
        {
            title: 'Ofertas',
            icon: 'img/ofertas.png',
            page: 'products.html',
            cor: '#3949AB',
            labelcor: '#5C6BC0'
        },
        {
            title: 'Entretenimento',
            icon: 'img/entretenimento.png',
            page: 'map.html',
            cor: '#F4511E',
            labelcor: '#FF7043'
        }
        /*{
            title: 'Entretenimento',
            icon: 'img/entretenimento.png',
            page: 'map.html',
            cor: '#8E24AA',
            labelcor: '#AB47BC'
        },
        {
            title: 'alguma coisa',
            icon: 'img/entretenimento.png',
            page: 'about.html',
            cor: '#00ACC1',
            labelcor: '#26C6DA'
        },
        {
            title: 'Ultilidades',
            icon: 'img/publico.png',
            page: 'contact.html',
            cor: '#43A047',
            labelcor: '#66BB6A'
        }*/

    ];

    return data;
});

// Menu Data: Menu configuration
sensationApp.factory('MenuData', function(){
    var data = {};

    data.items = [
        {
            title: 'Home',
            icon: 'home',
            page: 'home.html'
        },        
        {
            title: 'Ultimas Notícias',
            icon: 'th',
            page: 'maisnoticias.html'
        },

        {
            title: 'Ultímos Programas',
            icon: 'calendar',
            page: 'agenda.html'
        },

        {
            title: 'O que é o Tête à Tête?',
            icon: 'mobile',
            page: 'quemsomos.html'
        }

    ];

    return data;
});

// Map Data: Map configuration
sensationApp.factory('MapData', function(){
    var data = {};

    data.map = {
        zoom: 12,
        center: {
            latitude: 40.74,
            longitude: -74.18
        },
        markers: [
        {
            id: 1,
            icon: 'img/blue_marker.png',
            latitude: 40.71,
            longitude: -74.21,
            title: 'This is our main store'
        },
        {
            id: 2,
            latitude: 40.72,
            longitude: -74.20,
            title: 'This is our second store'
        },
        {
            id: 3,
            latitude: 40.73,
            longitude: -74.19,
            title: 'This is our third store'
        },
        {
            id: 4,
            latitude: 40.74,
            longitude: -74.18,
            title: 'This is our fourth store'
        },
        {
            id: 5,
            latitude: 40.75,
            longitude: -74.17,
            title: 'This is our fifth store'
        },
        {
            id: 6,
            latitude: 40.76,
            longitude: -74.16,
            title: 'This is our sixth store'
        },
        {
            id: 7,
            icon: 'img/plane.png',
            latitude: 40.77,
            longitude: -74.15,
            title: 'Airport'
        }]
    };

    return data;
});

// Gallery Data: Gallery configuration
sensationApp.factory('GalleryData', function(){
    var data = {};

    data.items = [
        {
            label: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            src: 'http://1.bp.blogspot.com/_DkUS1Celmdc/SATR0-9XKWI/AAAAAAAAAE0/mypBDvLzTlo/s400/BesniCorpo3_cirelli.jpg',
            location: 'New York, June 2014'
        },
        {
            label: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            src: 'img/gallery-2.jpg',
            location: 'Athens, August 2013'
        },
        {
            label: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            src: 'img/gallery-3.jpg',
            location: 'Tokyo, May 2013'
        }
    ];

    return data;
});

// Products Data: JSON Products configuration
sensationApp.factory('ProductsData', function(){

    var data = { url: 'json/products.json', letterLimit: 100 };

    return data;
});

// icones Data: JSON Products configuration
sensationApp.factory('IconesData', function(){

    var data = { url: 'json/icones.json', letterLimit: 100 };

    return data;
});

// News Data: JSON News configuration
sensationApp.factory('NewsData', function(){

    var data = { url: 'json/news.json', letterLimit: 100 };

    return data;
});

// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('PostsData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
     //var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
  var data = { url: 'http://xyzcomunicacao.com.br/api/get_tag_posts/?tag=slide?' };

    return data;
});

sensationApp.factory('NoticiasitemData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
     //var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
  var data = { url: 'http://listfy.com.br/api/get_tag_posts/?tag=noticias-carrosel?' };

    return data;
});

// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('EntretenimentoData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
  // var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
    var data = { url: 'http://xyzcomunicacao.com.br/api/get_tag_posts/?tag=teteatete?' };

    return data;
});
// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('EsteticaData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
  // var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
    var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=entretenimento?' };

    return data;
});

// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('TaxiData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
   //var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
    var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=taxi?' };

    return data;
});

// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('DestaquesData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
   //var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
    var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=category&slug=destaque?' };

    return data;
});


// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('OfertasData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
   //var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
    var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=ait-items&slug=ofertas?' };

    return data;
});

// Posts Data: JSONaa Wordpress Posts configuration
sensationApp.factory('DestaquesData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
  //var data = { url: 'http://listfy.com.br/?json=get_recent_posts' };

    /* With user-friendly permalinks configured */
    var data = { url: 'http://listfy.com.br/api/korkmaz/get_destaques' };

    return data;
});

sensationApp.factory('DeliveryData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/wordpress.json' };

    /* Set your URL as you can see in the following example */
  //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=ait-events&slug=dias-davila?' };

    /* With user-friendly permalinks configured */
  var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=delivery?' };

    return data;
});



// Outros data
sensationApp.factory('OutrosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=outros?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=outros?' };

    return data;
});

// Fitness data
sensationApp.factory('ServicosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=servicos?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=servicos?' };

    return data;
});

// Fitness data
sensationApp.factory('TransporteData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=transporte?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
  var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=transporte?' };

    return data;
});

// Fitness data
sensationApp.factory('SaudeData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=saude?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=saude?' };

    return data;
});





// Fitness data
sensationApp.factory('FitnessData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=fitness?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=fitness?' };

    return data;
});

// Alimentacao data
sensationApp.factory('AlimentacaoData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=alimentacao?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=alimentacao?' };

    return data;
});


/////////////////////////////comeca akiii as datas ///////////////////////////////



// Roupas data
sensationApp.factory('RoupasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=roupas?' };

    return data;
});

// Roupas data
sensationApp.factory('ParceirosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=parceiro?' };

    return data;
});





// Acessorios data
sensationApp.factory('AcessoriosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=acessorios?' };

    return data;
});


// Animais data
sensationApp.factory('AnimaisData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=animais?' };

    return data;
});

// Variedades data
sensationApp.factory('VariedadesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=variedades?' };

    return data;
});


// Floriculturas data
sensationApp.factory('FloriculturasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=floriculturas?' };

    return data;
});

// Variedades data
sensationApp.factory('PapelariasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=papelarias?' };

    return data;
});


// Variedades data
sensationApp.factory('DistribuidorasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=distribuidoras?' };

    return data;
});


// Variedades data
sensationApp.factory('MercadosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=mercados?' };

    return data;
});

// Variedades data
sensationApp.factory('PadariasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=padarias?' };

    return data;
});


// Variedades data
sensationApp.factory('LanchonetesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lanchonetes?' };

    return data;
});


// Açougues data
sensationApp.factory('AcouguesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=acougues?' };

    return data;
});

// Saloes data
sensationApp.factory('SaloesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=saloes?' };

    return data;
});

// estetica data
sensationApp.factory('EsteticasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=esteticas?' };

    return data;
});

// utilidade publica data
sensationApp.factory('UtilidadePublicaData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=ultilidade-publica' };

    return data;
});

// utilidade publica data
sensationApp.factory('PlantaoData', function(){

   var data = { url: 'http://listfy.com.br/api/get_tag_posts/?tag=plantao-farmacia?' };

    return data;
});

// utilidade publica data
sensationApp.factory('EmpregosData', function(){

   var data = { url: 'http://listfy.com.br/api/get_tag_posts/?tag=vagas-emprego?' };

    return data;
});


// Telefones uteis data
sensationApp.factory('TelefonesData', function(){

    var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=telefone-util?' };

    return data;
});


//telefnes data
sensationApp.factory('PodologiasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=profissionais-estetica?' };

    return data;
});

//moto taxi data
sensationApp.factory('MotoTaxiData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=moto-taxi?' };

    return data;
});

//moto taxi data
sensationApp.factory('TaxiData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=taxi?' };

    return data;
});



// Barbearia data
sensationApp.factory('BarbeariasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=barbearias?' };

    return data;
});


// Cosmeticos data
sensationApp.factory('CosmeticosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=cosmeticos?' };

    return data;
});

// Farmacias data
sensationApp.factory('FarmaciasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=farmacias?' };

    return data;
});

// Clinicas data
sensationApp.factory('ClinicasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=clinicas?' };

    return data;
});

// Hospitais data
sensationApp.factory('HospitaisData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=hospitais?' };

    return data;
});

// fisioterapias data
sensationApp.factory('FisioterapiasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=fisioterapias?' };

    return data;
});

// dentistas data
sensationApp.factory('DentistasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=Dentistas?' };

    return data;
});

// Oticas data
sensationApp.factory('OticasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=oticas?' };

    return data;
});

// Academias data
sensationApp.factory('AcademiasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=academias?' };

    return data;
});

// Supolementos data
sensationApp.factory('SuplementosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=suplementos?' };

    return data;
});


// Artes data
sensationApp.factory('ArtesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=artes?' };

    return data;
});

// Artes data
sensationApp.factory('Lojasesportes', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas-esportes?' };

    return data;
});

// Chaveiro data
sensationApp.factory('ChaveirosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=chaveiros?' };

    return data;
});

// Gases data
sensationApp.factory('GasesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=gases?' };

    return data;
});

// Advocacias data
sensationApp.factory('AdvocaciasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=advocacias?' };

    return data;
});

// Infomaticas data
sensationApp.factory('InformaticasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=informatica?' };

    return data;
});

// Contabilidades data
sensationApp.factory('ContabilidadesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lavanderias?' };

    return data;
});

// Outros data
sensationApp.factory('OutrosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=outros?' };

    return data;
});

// Materiais data
sensationApp.factory('MateriaisData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=materiais?' };

    return data;
});

// Eletros data
sensationApp.factory('EletrosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=eletros?' };

    return data;
});

// Decoracoes data
sensationApp.factory('DecoracoesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=decoracao?' };

    return data;
});

// Decoracoes data
sensationApp.factory('VendasalugueisData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=vendas-alugueis?' };

    return data;
});

// Decoracoes data
sensationApp.factory('ProfissionaisData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=decoracao?' };

    return data;
});

// bares data
sensationApp.factory('BaresData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=bares?' };

    return data;
});

// Restaurantes data
sensationApp.factory('RestaurantesData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=restaurantes?' };

    return data;
});

// Pizzarias data
sensationApp.factory('PizzariasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=pizzarias?' };

    return data;
});


// escolas data
sensationApp.factory('EscolasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=escolas?' };

    return data;
});

// cursos data
sensationApp.factory('CursosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=cursos?' };

    return data;
});

// Treinamentos data
sensationApp.factory('TreinamentosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=faculdades?' };

    return data;
});

// Autopecas data
sensationApp.factory('AutopecasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=autopecas?' };

    return data;
});

// Servicosauto data
sensationApp.factory('AutoservicosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=servicos-auto?' };

    return data;
});

// Acessoriosauto data
sensationApp.factory('AcessoriosautoData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=acessorios-auto?' };

    return data;
});

// Lavajatos data
sensationApp.factory('LavajatosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lava-jatos?' };

    return data;
});

// Chaparias data
sensationApp.factory('ChapariasData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=chaparia-pintura?' };

    return data;
});

// Guinchos data
sensationApp.factory('GuinchosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=transportadoras?' };

    return data;
});

// Artigos festa data
sensationApp.factory('ArtigosfestaData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=artigos-festa?' };

    return data;
});

// BolosbuffetsData festa data
sensationApp.factory('BolosbuffetsData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=bolos-buffet?' };

    return data;
});


// FotosvideosData festa data
sensationApp.factory('FotosvideosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=fotos-videos?' };

    return data;
});

// espacos festa data
sensationApp.factory('espacosData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=espacos?' };

    return data;
});


















// Server Posts Data (Server side pagination with AngularJS)
sensationApp.factory('ServerPostsData', function(){

    /* (For DEMO purposes) Local JSON data */
   //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
   // var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=education?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=education?' };

    return data;
});

// UltilidadesPublicaData data
sensationApp.factory('UltilidadesPublicaData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/serverposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    //var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=lojas?' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
    var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=company_category&slug=ultilidade-publica?' };

    return data;
});



// Categories Data: JSON Categories configuration
sensationApp.factory('CategoriesData', function(){

    /* (For DEMO purposes) Local JSON data */
  //  var data = { url: 'json/categories.json',
      //      category_url: 'json/category' };

    /* Set your URL as you can see in the following example */
    // var data = { url: 'http://listfy.com.br/?json=get_category_index',
        //      category_url: 'http://listfy.com.br/?json=get_category_posts&' };

    /* With user-friendly permalinks configured */
 var data = { url: 'http://listfy.com.br/api/get_category_index/' };
    return data;
});



// About Data: JSON News configuration
sensationApp.factory('AboutData', function(){

    var data = { url: 'json/about.json' };

    return data;
});

// NVD3Data Data: JNVD3Data configuration
sensationApp.factory('NVD3Data', function(){

    var data = {};

    data.options = {
            chart: {
                type: 'discreteBarChart',
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 65
                },
                x: function(d){return d.label;},
                y: function(d){return d.value;},
                showValues: true,
                valueFormat: function(d){
                    return d3.format(',.4f')(d);
                },
                transitionDuration: 500,
                xAxis: {
                    axisLabel: 'X Axis'
                },
                yAxis: {
                    axisLabel: 'Y Axis',
                    axisLabelDistance: 30
                }
            }
        };

    data.data = [
            {
                key: "Cumulative Return",
                values: [
                    {
                        "label" : "A" ,
                        "value" : -29.765957771107
                    } ,
                    {
                        "label" : "B" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "C" ,
                        "value" : 32.807804682612
                    } ,
                    {
                        "label" : "D" ,
                        "value" : 196.45946739256
                    } ,
                    {
                        "label" : "E" ,
                        "value" : 0.19434030906893
                    } ,
                    {
                        "label" : "F" ,
                        "value" : -98.079782601442
                    } ,
                    {
                        "label" : "G" ,
                        "value" : -13.925743130903
                    } ,
                    {
                        "label" : "H" ,
                        "value" : -5.1387322875705
                    }
                ]
            }
        ];

    return data;
});

// Plugins Data: Mobile Plugins configuration
sensationApp.factory('PluginsData', function(){
    var data = {};

    data.items = [
        {
            title: 'Device Plugin',
            icon: 'mobile',
            page: 'device.html'
        },
        {
            title: 'Notifications Plugin',
            icon: 'exclamation',
            page: 'notifications.html'
        },
        {
            title: 'Geolocation Plugin',
            icon: 'location-arrow',
            page: 'geolocation.html'
        },
        {
            title: 'Barcode Scanner',
            icon: 'barcode',
            page: 'barcodescanner.html'
        }
    ];

    return data;
});

// Settings Data: Settings configuration
sensationApp.factory('SettingsData', function(){
    var data = {};

    data.items = {
        options: [
        {
           name: 'First Setting',
           value: true
        },
        {
           name: 'Second Setting',
           value: false
        },
        {
           name: 'Third Setting',
           value: false
        },
        {
           name: 'Fourth Setting',
           value: false
        },
        {
           name: 'Fifth Setting',
           value: false
        }],
        range:30
    };

    return data;
});

// RSS Data: Feeds configuration
sensationApp.factory('FeedData', function(){

    var data = { url: 'http://g1.globo.com/dynamo/bahia/rss2.xml' };

    return data;
});

// FEED Data Structure: JSON FEED Data Structure configuration
sensationApp.factory('FeedPluginData', function(){

    var data = { url: 'json/structure.json' };

    return data;
});

// Custom Posts Data (Server side pagination with AngularJS)
sensationApp.factory('CustomPostsData', function(){

    /* (For DEMO purposes) Local JSON data */
    //var data = { url: 'json/customposts&' };

    /* Set your URL as you can see in the following example */
    /* NOTE: In case of the default permalinks, you should add '&' at the end of the url */
    var data = { url: 'http://listfy.com.br/wp-json/posts?type=ait-item&' };

    /* With user-friendly permalinks configured */
    /* NOTE: In case of the user-friendly permalinks, you should add '?' at the end of the url */
   //  var data = { url: 'http://listfy.com.br/api/korkmaz/get_taxonomy_posts/?taxonomy=ait-events&slug=dias-davila?' };

    return data;
});


