require(['config'],()=>{
    require(['swiper','url','jquery'],(Swiper,url,$)=>{
        console.log($);
        class Register{
            constructor(){
                this.banner();  
                this.usernameInput = $("#username");
                this.passwordInput = $("#password");
                this.btn = $("#submit");
                this.bindEvents();
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
                    },


                })        
            }


            bindEvents(){
                this.btn.on("click",()=>{
                    //取用户名和密码提交后台
                    let username = this.usernameInput.val(),
                        password = this.passwordInput.val();
                        $.ajax({
                            url:url.phpBaseUrl+ "user/register.php",
                            type:"post",
                            data:{username,password},
                            success:data=>{
                                if(data.res_code === 1){
                                    alert(data.res_message+",即将跳转登录页");
                                    location.href = 'login.html';
                                }
                            },
                            dataType:'json'
                        })
                })
            }
        }
        new Register();
    })
})