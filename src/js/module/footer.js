define(['jquery'], $ => {
    function Footer(){
        this.container = $("#footer-container");
        this.load();
    }
    // 对象合并
    $.extend(Footer.prototype,{
        // Es6对象争强写法
        load ( ){
            // footer.html加载过来
            this.container.load('/html/module/footer.html');
        }
        
    })
    return new Footer;
});