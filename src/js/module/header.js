define(['jquery','cookie'],$=> {
    function Header(){
      this.container = $("#header-container");
      this.load().then(() =>{
        this.search();
        this.isLogin();
        this.calcCartNum();
      });
  }
  // 对象合并
  $.extend(Header.prototype,{
      // Es6对象争强写法
      load ( ){
          // header.html加载到container里面

          return new Promise(resolve =>{
            this.container.load('/html/module/header.html',()=>{
              resolve();
            });
          })      
      },

      search (){
        //搜索框功能
       
        $("#search-input").on('keyup',function(){
          let keywords = $(this).val();







          //带上关键字请求jsonp接口
         $.getJSON('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd='+keywords,data=>{
            console.log(data);
            let ul = document.querySelector(".list");
            ul.innerHTML = "";
            for(let key in data.s){
              let li = document.createElement("li");
              let input = document.querySelector("#search-input");
              li.innerHTML = data.s[key];
              ul.appendChild(li);
            }
            // ul.onclick =  e=>{
            //   e = e || event;
            //   let target = e.target || e.srcElement;
            //   if(target.nodeName === "LI"){
            //     let list = target.innerHTML;
            //     input.value = list;
            //     ul.innerHTML = "";
            //   }
            // }
          })
        })
      },
      //登录
      isLogin(){
        this.loginBtn = $("#login-btn");
        this.afterLogin = $("#after-btn");
        this.nameSpan = $("#name");
        this.logout = $("#exit");
        let username = $.cookie("username");
        if(username){
          this.loginBtn.hide();
          this.afterLogin.show();
          this.nameSpan.html(username);
        }
        //退出登录
        this.logout.on("click",()=>{
          if(confirm("确定要退出吗")){
            $.removeCookie("username",{path:'/'});
            this.loginBtn.show();
            this.afterLogin.hide();
          }
          
        })
      },

      calcCartNum(){
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
        $("#car-num").html(num);
      }
      
  })


  return new Header();   
});