require.config({
    baseUrl : "/",
    paths : {
        "header" : "js/module/header",
        "footer" : "js/module/footer",
        "side" :  "js/module/side",
        "jquery" : "libs/jquery/jquery-3.2.1",
        "url" : "js/module/url",
        "template" : "libs/art-template/template-web",
        "swiper" : "libs/swiper/js/swiper",
        "zoom" : "libs/jquery-plugins/jquery.elevateZoom-3.0.8.min",
        "cookie" : "libs/jquery-plugins/jquery.cookie",
        "fly" : "libs/jquery-plugins/jquery.fly",
    },
    //垫片，给不满足AMD规范的插件又要依赖于别的模块
    shim:{
        "zoom":{
            deps:['jquery']
        },
        "cookie":{
            deps:['jquery']
        },
        "fly":{
            deps:['jquery']
        }

    }

})