; (() => {
    let index;
    $(".second_list").css("display", "none");
    $(".nav_list ul li").hover(function () {
        $(".gift_list").fadeIn();
        index = $(this).index(".nav_list ul li");
        //    console.log(index);
        // 给当前层列表中当前元素添加list_active类名，兄弟则删除list_active属性
        $(this).addClass("list_active").siblings().removeClass("list_active");
        // 给当前索引的二级列表进行显示，其兄弟则隐藏
        $($(".second_list")[index]).fadeIn().siblings().fadeOut();
        if (this.className == "list_active") {
            $(this).children("a").addClass("a_active");
            $(this).siblings().children("a").removeClass("a_active");
        }

    })
    // 鼠标移出一级和二级总区域
    $(".nav_box").mouseleave(function () {
        // 二级菜单隐藏
        $(".gift_list").fadeOut();
        // 一级列表删除list_active属性
        $(".nav_list ul li").removeClass("list_active");
        // 删除一级列表a中a_active属性
        $(this).find("a").removeClass("a_active");
    })
      

    class Goods {
        constructor() {
            this.list();
            //吸顶
            window.addEventListener('scroll',(eve)=>{
                  let e=eve||window.event;
                  //获取滚动条高度
                  let getTop=window.pageYOffset || document.body.scrollTop;
                //   console.log(getTop);
                  //获取搜索框在页面的高度
                  let  boxobj=document.querySelector('.input_box').offsetTop;
               
                //当滚动条高度大于搜索框页面高度时，让隐藏的搜索框显示
                if(getTop>boxobj){
                    document.querySelector('.input_Hbox').style.display='block';
                    
                    
                }else{
                    document.querySelector('.input_Hbox').style.display='none';
                }

            })
        }
        list() {
               //通过ajax遍历所有数据库商品表中的所有数据，将数据显示到首页
                ajax.get('./php/shopping.php', { fn: 'lst' }).then(res => {
                    // console.log(111);
                    let { stateCode, data } = JSON.parse(res);//将字符串转化为对象
                    if (stateCode == 200) {
                        // console.log(res);
                        let str = '';//用来储存数据
                        data.forEach(ele => {
                            // console.log(111);
                            //数据的拼接 特别注意：在点击商品时要将商品id放在超链接的后面，用商品id获取详情页的显示信息
                            str += `
                            <a href="http://localhost/subject/detail.html?shopId=${ele.goodsId}" target="_blank" onclick="">
                            <img src="${ele.img}" alt="">
                            <em>${ele.title}</em>
                            <i>￥${ele.price}</i>
                            </a>
                            `;
                        })
                        //追加数据
                        document.querySelector('.market').innerHTML = str;
                        document.querySelector('.guoji').innerHTML = str;
                        document.querySelector('.rensheng').innerHTML = str;
                        document.querySelector('.kuwan').innerHTML = str;
                        document.querySelector('.shenghuo').innerHTML = str;

                    }
                })
           //点击退出时，删除用户ID；
           document.getElementById('exit').addEventListener('click',function(){
            //    console.log(111);
               localStorage.removeItem('user');
           }) 
        }
    }
    new Goods();


})();