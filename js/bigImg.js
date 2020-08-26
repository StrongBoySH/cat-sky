//图片放大镜
class bigImg {
    constructor() {
       this.bigimg();
    }
    //放大镜
    bigimg(){
         this.smallobj = document.querySelector('.detail_img');
        //  console.log(this.smallobj);
        this.maskobj = document.getElementById('mask');
        this.bigobj = document.querySelector('.big_img')
        //  console.log(this.bigobj);
        this.imgobj = document.querySelector('#bimg');
        this.boxobj = document.querySelector('.detail_left')
        this.bindeve(this.smallobj, 'mouseenter', this.enter.bind(this))
        this.bindeve(this.smallobj, 'mouseleave', this.leave.bind(this))
        this.bindeve(this.smallobj, 'mousemove', this.moveb.bind(this))
    }
    //绑定事件的方法
    bindeve(eve, type, cb) {//eve节点，type事件类型，调用的回调函数
        //  console.log(eve);
        eve.addEventListener(type, cb);
    }
    enter() {
        this.maskobj.style.display = 'block';
        this.bigobj.style.display = 'block';
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
window.onload=function(){new bigImg()}//html所有加载完成后在刷新


