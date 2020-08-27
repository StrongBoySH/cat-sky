class cart {
    constructor() {
        
        cart.list();
        // console.log(this.uId);
        //给全选按钮绑定事件
        document.getElementsByClassName('check-all')[0].addEventListener('click',this.checkAll);
        document.getElementsByClassName('check-all')[1].addEventListener('click',this.checkAll);
    }
    /****获取购物车列表 ****/
    static list(page=1){
        //获取用户，通过用户名获取数据
        let uId=localStorage.getItem('user');
       ajax.post('./php/car.php?fn=lst',{userId:uId,page:page}).then(res=>{
        //    console.log(res);
           let {data,stateCode,cout}=JSON.parse(res);
        //    console.log(cout);
           if(stateCode==200){
               let str='';
               data.forEach(ele=>{
                   str+=`<div class="tcont_box">
                   <div class="tcont_shop">
                       <p>店铺：我是超级大英雄</p>
                   </div>
                   <div class="tcont_gift">
                       <div class="gift1"><input type="checkbox" class="check-one" onclick="cart.goodsCheck(this)"></div>
                       <div class="gift2">
                           <p class="tcont_gift_img"><img src="${ele.img}" alt=""></p>
                           <p>${ele.Title}</p>
                       </div>
                       <div class="gift3">
                           <em>${ele.CarPirce}</em>
                       </div>
                       <div class="gift4">
                           <i class="up" onclick="cart.upGoodsNum(this,${ele.id})">-</i>
                           <input type="text" value="${ele.Num}">
                           <i class="down" onclick="cart.addGoodsNum(this,${ele.id})">+</i>
                       </div>
                       <div class="gift5">
                           <em>${ele.Num*ele.CarPirce}</em>
                       </div>
                       <div class="gift6">
                           <p><b>移入收藏夹</b></p>
                           <p class="tend_left2" onclick='cart.delGoods(this,${ele.id})'><b>删除</b></p> 
                       </div>
                   </div>
               </div>`
               })
               //追加到页面
               document.querySelector('.tcont').innerHTML=str;

               //渲染页面
               let pagestr='';
               for(let i=1;i<=cout;i++){
                   
                      pagestr+=`<li>
                      <a href="javascript:0" onclick="cart.list(${i})">${i}</a>
                    </li>`
               }
               document.querySelector('.pagination').innerHTML=pagestr;

           }
       })
       
    }

    /****商品的删除*****/
    static delGoods(eleobj,gId){
        let userID=localStorage.getItem('user');
        ajax.get('./php/car.php',{fn:'delete',goodsId:gId,userId:userID}).then(res=>{
            console.log(res);
        })
        //把当前商品对应的节点删除
      eleobj.parentNode.parentNode.parentNode.parentNode.remove();
      location.reload();
      cart.cpCount();
    }

    /****价格计算和总数***/
    static cpCount(){

     let checkOne=document.getElementsByClassName('check-one');//特别注意：得到的是伪数组，需要转化
     let count=0;
     let je=0;
     //遍历找出选中的单选框
     Array.from(checkOne).forEach(ele=>{
         if(ele.checked){
            let divobj=ele.parentNode.parentNode; 
            let tmpje=divobj.querySelector('.gift5').children[0].innerHTML;
            let tmpcount=divobj.querySelector('.gift4').children[1].value;
            je=tmpje-0+je;
            count=tmpcount-0+count;
         }
     })
     //放到页面
     document.querySelector('.tend_sum').children[0].innerHTML= parseInt(je * 100) / 100;
     document.querySelector('.tstart').children[0].children[0].innerHTML=count;
     document.querySelector('.tstart').children[3].children[0].innerHTML=je;
    }

    
    /*****数量增加按钮****/
    static addGoodsNum(eleObj,gId){
        //获取显示数量的节点
        let inputNumobj=eleObj.previousElementSibling;
        inputNumobj.value=inputNumobj.value-0+1;
        // console.log(inputNumobj.value);

        //调用将num存到数据库的方法；
        cart.updateCart(gId,inputNumobj.value);
        //实现金额的方法
        //获取价格节点
        let priceObj=eleObj.parentNode.previousElementSibling.children[0];
        // console.log(priceObj.innerHTML);
        eleObj.parentNode.nextElementSibling.children[0].innerHTML=((priceObj.innerHTML) * (inputNumobj.value)).toFixed(2);
        cart.cpCount();
    }

    /***数量减少按钮***/
    static upGoodsNum(eleObj,gId){
        let inputNumObj = eleObj.nextElementSibling;
        inputNumObj.value=inputNumObj.value-0-1;
        //数量为0删除此节点
        if(inputNumObj.value==0){
            cart.delGoods(eleObj,gId);
        }
          cart.updateCart(gId,inputNumObj.value);
         //实现金额的计算
         let priceObj=eleObj.parentNode.previousElementSibling.children[0];
         // console.log(priceObj.innerHTML);
         eleObj.parentNode.nextElementSibling.children[0].innerHTML=((priceObj.innerHTML) * (inputNumObj.value)).toFixed(2);
         cart.cpCount();
    }

    /**数据库数量的修改i**/
    static updateCart(gId,gNum){
        let user=localStorage.getItem('user');
        ajax.get('./php/car.php',{fn:'update',goodsId:gId,goodsNum:gNum,userId:user}).then(res=>{

        })
    }


     /*****全选的实现****/
     checkAll() {
        //console.log(this);
        //1.实现另一个全选按钮的选中或取消
        //选中为true，取消为false
        let state = this.checked;
        //  console.log(state);
        //2.让两个全选按钮的checked保持一致
        //全选按钮的非内置属性为1，0与自己的标签节点索引相反，是为了点击当前按钮可以获取到另一个按钮
        document.querySelectorAll('.check-all')[this.getAttribute('all-key')].checked = state;
        //3.让所有单选框选中
        //3-1获取每个单选框
        let checkGoods=document.querySelectorAll('.check-one');//注意此处获取的是伪数组，需要转化
        console.log(checkGoods);
        //3-2遍历所有商品的单选框  特别注意获取到的是伪数组，要转化为数组 Aarry.from()
        Array.from(checkGoods).forEach(ele=>{
            ele.checked=state;
        })
       
        //调用计算价格和数量的方法
         cart.cpCount();
    }

    /****单选按钮的实现***/
    static goodsCheck(eleObj){
        // console.log(eleObj);
        let state=eleObj.checked;
        let  checkall=document.getElementsByClassName('check-all');//获取的是一个伪数组需要转化
        //当有一件未选中，全选取消
        if(!state){
            Array.from(checkall)[0].checked=false;
            Array.from(checkall)[1].checked=false;
        }else{
            //所有单选选中，全选选中
            let checkOne=document.getElementsByClassName('check-one');//获取的是一个伪数组需要转化
            let len=Array.from(checkOne).length;
            console.log(len);
            //计算选中的单选框
            let checkCount=0;
            Array.from(checkOne).forEach(ele=>{
                //没选中一个单选框，checkCount加一
                (ele.checked==true) && checkCount++
            })
            //checkCount与单选框长度相等时，全选框选中
            if(len==checkCount){
                Array.from(checkall)[0].checked=true;
                Array.from(checkall)[1].checked=true;
            }
        }
        cart.cpCount();
    }
    

}
new cart();