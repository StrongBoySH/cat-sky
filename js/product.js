class Goods {
    constructor() {
        Goods.list();
        //1.绑定滚动条事件
        window.addEventListener('scroll',function(){
          //2.获取可视区域的高度与滚动条的高度的和==显示内容的区域高度
          let clieh = Goods.getHeight() + Goods.getTop();
          console.log(clieh);
          //3.获取当前内容的高度
          let marketobj=document.querySelector('.market');
        //   console.log(marketobj);
          let counth =marketobj.offsetTop+marketobj.clientHeight;
        //   console.log(counth);
        if(counth<clieh){
            // console.log(11111);
             Goods.list();
        }
        
        })
    }
  static  list() {
           //通过ajax遍历所有数据库商品表中的所有数据，将数据显示到首页
            ajax.get('./php/shopping.php', { fn: 'lst' }).then(res => {
                // console.log(111);
                let { stateCode, data } = JSON.parse(res);//将字符串转化为对象
                if (stateCode == 200) {
                    // console.log(res);
                    let str = '';//用来储存数据
                    data.forEach(ele => {
                        // console.log(111);
                        //数据的拼接
                        str += `
                        <a href="http://localhost/subject/detail.html?shopId=${ele.goodsId}" target="_blank" onclick="">
                        <img src="${ele.img}" alt="">
                        <em>${ele.title}</em>
                        <i>￥${ele.price}</i>
                        </a>
                        `;
                    })
                    //追加数据
                    document.querySelector('.market').innerHTML += str;
                }
            })
            // document.getElementById('exit').addEventListener('click',function(){
            //   //    console.log(111);
            //      localStorage.removeItem('user');
            //  }) 
       
    }
     //获取窗口的高度
   static getHeight() {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };
    //获取滚动条的高度
  static  getTop() {
        return window.pageYOffset || document.body.scrollTop
    }
}
new Goods();