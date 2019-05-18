require(["config"],()=>{
    require(['template','header','side','footer'],(template,header,side)=>{
        class Cart{
            constructor(){
                this.init();
                this.bindEvents();
                this.delBtnClick();
                this.all();
            }

            
            init(){
                let cart = localStorage.getItem('cart');
                //console.log(cart);
                if(cart){
                    //渲染列表
                    cart = JSON.parse(cart);
                    //console.log(cart);
                    this.render(cart);
                }else{
                    //提示购物车为空
                    alert("购物车为空，你太穷了");
                }
            }

            render(cart){
                //console.log($("#mycart-list"));
                //console.log(cart);
                $("#mycart-list").html(template('mycart-template',{cart}));
                

            }

            bindEvents(){
                let _this = this;
                // 加
              $(".mycart-shop").on('click','#add',function(e){
                  let target = e. target;
                  let n = Number($(target).parent().children("#input-num").val());
                  
                  n++;
                  let cart = localStorage.getItem('cart');
                  cart = JSON.parse(cart);
                  let id = Number($(target).parent().parent().parent().parent().attr('data-id'));               
                    //   单价
                    let money =  Number($(target).parent().parent().parent().parent().children().children().children('.mycart-item-pri').children("#money").text());                                     
                    $(target).parent().parent().parent().parent().children().children().children('.mycart-item-price').children('#allmon').text(money*n);
                    let index = -1;
                    if(cart.some((item,i)=>{
                        index = i ;
                        return item.id === id;
                    })){
                        cart[index].num++;
                        localStorage.setItem('cart',JSON.stringify(cart));
                    }
                    $(target).parent().children("#input-num").val(n);

                    _this.all();

                })  
                // 减
                $(".mycart-shop").on('click','#sub',function(e){
                    let target = e.target;
                    let   n = Number($(target).parent().children("#input-num").val());
                        n--;
                        
                    let cart = localStorage.getItem('cart');
                    cart = JSON.parse(cart);
                    let id = Number($(target).parent().parent().parent().parent().attr('data-id'));

                    let money = Number($(target).parent().parent().parent().parent().children().children().children('.mycart-item-pri').children("#money").text());
                    

                    $(target).parent().parent().parent().parent().children().children().children('.mycart-item-price').children('#allmon').text(money*n);
                    let index = -1;
                    if(cart.some((item,i)=>{
                        index = i ;
                        return item.id === id;
                    })){
                        cart[index].num--;
                        localStorage.setItem('cart',JSON.stringify(cart));
                    }
                    $(target).parent().children("#input-num").val(n);  
                    _this.all();

                })            
            }
             // 删除             
            delBtnClick(){
                let _this = this;
               
                $("#del-btn").click(function(e){
                    // 找事件源
                    if(confirm("确定要删除吗")){
                        let target = e.target;
                        $(this).parent().parent().parent().parent().remove();

                        let   n = Number($(this).parent().children('input-num').val());
                        let cart = localStorage.getItem('cart');
                        cart = JSON.parse(cart);
                        //console.log(cart);
                        //   找自定义id
                        let id = $(this).parent().parent().parent().parent().attr('data-id');
                        //console.log(id);
                        let index = -1;
                        if(cart.some((item,i)=>{
                        index = i;
                        return item.id == id;
                        })){
                            console.log(cart[index]);
                        cart.splice(index,1);
                        localStorage.setItem('cart',JSON.stringify(cart));
                        }
                        $(this).parent().parent().parent().parent().children("#input-num").val(n);
                        _this.all();
                        
                    }
                    
                    header.calcNum();
                    side.calcNum();
                    
                })                           
            }
            
            // // 总价
            all(){
                let Money = 0;
                let obj = document.getElementsByClassName("allmon");
                let addMoney = new Array();
                for(let i=0;i<obj.length;i++){                 
                    addMoney[i] = obj[i].innerHTML;
                    Money += Number(addMoney[i])               
                }
                $(".sum").text(Money);
                //console.log(addMoney);
                //console.log(box.querySelector(".check").checked);
            }


            


        }
        new Cart();
    })
})