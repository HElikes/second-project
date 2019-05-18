//列表页的业务逻辑
require(["config"],()=>{
    require([ 'url','template','header','footer','side'],(url,template)=>{
        class List {
            constructor(){
                this.getType();
            }
        
            //获取首页分类数据
            getType(){
                $.get(url.rapBaseUrl + 'list/type',data=>{
                    if(data.res_code === 1){
                        this.renderType(data.res_body.list);
                    }
                })
            }
            renderType(list){
                console.log(template);
                let html = template("list-template",{list});
                $("#list-container").html(html);

            }
        }
        new List()    
    })
})