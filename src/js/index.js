require(["config"],() => {
    require(['url','template',"swiper",'header','footer','side'],(url,template,Swiper) => {
        // console.log(Swiper);
        class Index {
            constructor(){
                this.bindEvents();
                this.getType();
                this.banner();
            }

            //轮播图
            banner(){
                var mySwiper = new Swiper ('.swiper-container', {
                    //自动切换
                    autoplay: {
                        delay: 4000,
                        stopOnLastSlide: false,
                        disableOnInteraction: true,
                        },
                    loop: true, // 循环模式选项
                    
                    // 如果需要分页器
                    pagination: {
                      el: '.swiper-pagination',
                      clickable :true
                    },

      
                  })        
            }

            //登录事件委托
            bindEvents (){
                // 由于login-btn是通过header模块儿的异步加载得到的，所以同步代码获取不到，使用事件委托
                $("#header-container").on('click',"#login-btn",()=>{
                    console.log(123);
                })
            }
            //获取首页分类数据
            getType(){
                $.get(url.rapBaseUrl + 'index/type',data=>{
                    if(data.res_code === 1){
                        this.renderType(data.res_body.list);
                    }
                })
            }
            renderType(list){
                //console.log(template);
                let html = template("list-template",{list}),
                    html1 = template("list1-template",{list}),
                    html2 = template("list2-template",{list}),
                    html3 = template("list3-template",{list});
                $("#list-container",).html(html);
                $("#list1-container",).html(html1);
                $("#list2-container",).html(html2);
                $("#list3-container",).html(html3);

            }
        }
        new Index()
        
    })
})


