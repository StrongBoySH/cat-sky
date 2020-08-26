class deTail {
    constructor() {
        this.Id = location.search.substr(1);
        // console.log(this.Id);
        // console.log(this.Id.substr(7));
        this.upobj = document.querySelector('.up')
        this.downobj = document.querySelector('.down')
        // console.log(this.upobj,this.downobj);
        this.bindeve(this.upobj, 'click', this.Add.bind(this, this.upobj));
        this.bindeve(this.downobj, 'click', this.reduce.bind(this, this.downobj));

        this.load(this.Id.substr(7));


    }
    //绑定事件的方法
    bindeve(eve, type, cb) {//eve节点，type事件类型，调用的回调函数
        //  console.log(eve);
        eve.addEventListener(type, cb);
    }
    Add(eleobj) {
        //获取显示数量的节点
        let inputObj = eleobj.parentNode.previousElementSibling;
        inputObj.value = inputObj.value - 0 + 1;

    }
    reduce(eleobj) {
        let inputObj = eleobj.parentNode.previousElementSibling;
        inputObj.value = inputObj.value - 0 - 1;

    }
    load(goodid) {
        ajax.get('./php/detail.php', { fn: 'getitp', goodsId: goodid }).then(res => {
            // console.log(res);
            let { stateCode, data } = JSON.parse(res);//将字符串转化为对象
            let str = "";
            let str2 = "";
            if (stateCode == 200) {
                data.forEach(ele => {
                    str += `
                <div class="detail_img">
                <img src="${ele.img}" alt="">
                <div class="mask" id="mask"></div>
                </div>
                <div class="big_img">
                    <img src="${ele.img}" alt="" id='bimg'>
                </div>
            `;
                    str2 += `
            <div class="detail_title">${ele.title}</div>
            <div class="detail_price">
                <em>价格：</em>
                <i>${ele.price}</i>
            </div>
            `;
                })
            }
            document.querySelector('.detail_left').innerHTML = str;
            document.querySelector('.title_data').innerHTML = str2;
            console.log(66667);
            this.imgobj = document.querySelector('#bimg');
            console.log(this.imgobj);
            //获取图片
            let carimg = document.querySelector('.detail_img').children[0];
            let CarImg = carimg.src;
            // console.log(CarImg);
            //获取介绍语
            let cartitle = document.querySelector('.detail_title');
            let CarTitle = cartitle.innerHTML;
            // console.log(CarTitle);
            //获取价格
            let carprice = document.querySelector('.detail_price').children[1];
            let CarPrice = carprice.innerHTML;
            // console.log(CarPrice);
            //获取用户名
            // let UserId=localStorage.getItem('user');
            //点击添加购物车，将数据存到数据库；
            this.scobj = document.querySelector('#shopcar');
            // console.log(UserId);
            //调用放大镜
            this.bigimg();
            // console.log(this.scobj);
            this.scobj.addEventListener('click', this.add.bind(this, CarTitle, CarPrice, CarImg));


            // console.log(this);
        })
    }
    add(CarTitle, CarPrice, CarImg) {
        let UserId = localStorage.getItem('user');
        // console.log(111);
        //获取数量
        if (UserId) {
            let num = document.querySelector('#Number').value;
            console.log(num);
            //获取商品小计
            let bprice = document.querySelector('.detail_price').children[1];
            let bPrice = bprice.innerHTML;
            let BPrice = (bPrice * num)
            console.log(BPrice);
            ajax.post('./php/detail.php?fn=add', { UserId: UserId, CarTitle: CarTitle, CarPrice: CarPrice, CarImg: CarImg, num: num, BPrice: BPrice }).then(res => {
                console.log(res);

            })
        }else{
            alert('您还未登录请前去登录');
            location.href='http://localhost/subject/login.html';
        }
    }




    bigimg() {
        //    console.log(this);
        console.log('fgdgdddd');
        this.smallobj = document.querySelector('.detail_img');
        //  console.log(this.smallobj);
        this.maskobj = document.getElementById('mask');
        this.bigobj = document.querySelector('.big_img')
        //  console.log(this.bigobj);
        this.imgobj = document.querySelector('#bimg');
        this.boxobj = document.querySelector('.detail_left')
        console.log(this.imgobj);
        this.bindeve(this.smallobj, 'mouseenter', this.enter.bind(this))
        this.bindeve(this.smallobj, 'mouseleave', this.leave.bind(this))
        this.bindeve(this.smallobj, 'mousemove', this.moveb.bind(this))
    }
    //绑定事件的方法
    bindeve(eve, type, cb) {//eve节点，type事件类型，调用的回调函数
        //    console.log(11);
        //  console.log(eve);
        eve.addEventListener(type, cb);
    }
    enter() {
        //    console.log(9999);

        console.log(this.maskobj);
        console.log(this.bigobj);

        this.maskobj.style.display = 'block';
        this.bigobj.style.display = 'block';
        console.log(88888);
    }
    leave() {
        this.maskobj.style.display = 'none';
        this.bigobj.style.display = 'none';
    }
    moveb(eve) {
        let e = eve || window.event;
        //让小方块根着鼠标移动，并让鼠标处于小滑块的中间
        //3-1鼠标相当于文档的坐标
        this.pagex = e.pageX;
        this.pagey = e.pageY;
        //    console.log(this.pagex);
        // 3-2 获取box整个内容div的坐标
        this.boxLeft = this.boxobj.offsetLeft;
        this.boxTop = this.boxobj.offsetTop;
        // console.log(this.boxLeft);
        //3-3获取小滑块自身宽高的一半
        this.maskH = (this.maskobj.offsetHeight) / 2;
        this.maskW = (this.maskobj.offsetWidth) / 2;
        //3-4计算小滑块的top和left
        this.tmpX = this.pagex - this.boxLeft - this.maskW;
        this.tmpY = this.pagey - this.boxTop - this.maskH;
        // console.log(this.tmpX);
        //3-5设置边界
        if (this.tmpX < 0) this.tmpX = 0;
        if (this.tmpY < 0) this.tmpY = 0;
        this.targetx = this.smallobj.offsetWidth - this.maskobj.offsetWidth;
        this.targety = this.smallobj.offsetHeight - this.maskobj.offsetHeight;
        if (this.tmpX > this.targetx) this.tmpX = this.targetx;
        if (this.tmpY > this.targety) this.tmpY = this.targety;
        //3-6设置小滑块的坐标
        this.maskobj.style.left = this.tmpX + 'px';
        this.maskobj.style.top = this.tmpY + 'px'

        //3-7 计算大图移动的最大距离
        this.targetbx = this.imgobj.offsetWidth - this.bigobj.offsetWidth;
        this.targetby = this.imgobj.offsetHeight - this.bigobj.offsetHeight;
        //3-8设置大图的坐标
        this.imgobj.style.left = -this.tmpX / (this.targetx) * (this.targetbx) + 'px';
        this.imgobj.style.top = -this.tmpY / (this.targety) * (this.targetby) + 'px';

    }
}
new deTail();