

// 详情页业务逻辑
require(["config"],()=>{
    require ([ 'url','template','header','side','footer','zoom','fly'],( url,template,header,side)=>{
        class Detail {
            constructor(){
                this.init();
                this.addCart();
            }
         
         init(){
             //从url取到id，携带id请求详情数据，渲染详情页
            let id = Number(location.search.slice(4));
            this.id = id //将来加入购物车需要这个id
            $.get(url.rapBaseUrl + "detail/get",{id},res =>{
                if(res.res_code === 1){
                    
                    let {detail} = res.res_body;
                    //detail展开成 title:"abc" price:100
                    // 再在后面解构赋值增加一个id字段
                    // 就变成了{title:"abc" price:100 id:id}
                    
                    detail = {...detail,id};//当借口变成真实接口的时候，这句代码不需要
                    
                    // detail.id = id;
                    // 把当前数据存下来
                    this.detail = detail;
                   
                    this.render(detail);
                    //console.log(res.res_body.detail);
                }
                
            })
            
         }
         


           render(detail){
               $("#detail-container").html(template("detail-template",{detail}));
               this.zoom();
           }


            //加入购物车
           addCart(){
            //事件委托给父级容器
            $("#detail-container").on('click','#shop-add',e =>{


                //完成抛物线加购物车动画
                $(`<img src='${this.detail.image[0]}'style='width:30px;height:30px'>`).fly({
                    start:{
                        left: e.clientX,
                        top: e.clientY
                    },
                    end:{
                        left: $("#car-num").offset().left,
                        top: $("#car-num").offset().top
                    },
                    onEnd: function(){
                        this.destroy();//销毁跑物体
                        header.calcCartNum();//再次调用计算购物车数量方法
                         side.calcNum();
                    }
                });


                // 列表页自定义属性，详情页可以不用
                //let id = $(this).attr("data-id");
                // 取到这条id对于的数据
                // 把this.detail存在localstorage里
                //先把cart取出来
                let cart = localStorage.getItem('cart');                
                if(cart){
                    cart = JSON.parse(cart);
                    console.log(cart);
                    //已经存过购物车了
                    // 判断购物车里有没有当前商品
                    let id = Number($("#shop-add").attr('data-id'));
                    //console.log(id);
                    let index = -1;
                    if(cart.some((shop,i)=>{
                        // some找到满足条件的就不会再继续了
                        // 所以index的值最后就等于满足条件的索引
                        index = i;
                        return shop.id === id;
                      
                    })){
                        //有这条数据
                        cart[index].num++;
                    }else{
                        // 没有这条数据
                        cart.push({...this.detail,num: 1});
                    }
                }else{
                    //购物车为空
                    // 说明是第一次存进去，数量num为1
                    cart = [{...this.detail, num:1}];
                }
                //重新存cart
                localStorage.setItem('cart',JSON.stringify(cart));
                // alert("商品已成功添加到购物车");
            })
            

           }
           

           zoom(){
               // 放大镜插件
                $(".zoom-img").elevateZoom({
                    gallery:'gal1',//容器盒子的id
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    borderSize:'1',    
                    borderColor:'#888'
                });
           }
        }  
        new Detail();                
    })
})