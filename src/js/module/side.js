define(['jquery'],()=>{
    function Side(){
        this.container = $("#side-container");
        this.load().then(()=>{
            this.calcNum();
        });
    }
    // 对象合并
    $.extend(Side.prototype,{
        // Es6对象争强写法
        load ( ){
            // side.html加载过来
            return new Promise(resolve =>{
                this.container.load('/html/module/side.html',()=>{
                  resolve();
                });
            })  
        },


        calcNum(){
            let cart = localStorage.getItem('cart');
            let num = 0;
            if(cart){
                //计算总数量
                cart = JSON.parse(cart);
                //num放的是商品的总数量还是总类别
                //算总数量
                num = cart.reduce((n,shop)=>{
                    n += shop.num;
                    return n;
                },0);
            }
            $("#cart-num").html(num);
        }
    })

    return new Side;
})