class login {
    constructor() {
        //获取登录的节点
        this.submitobj = document.querySelector('#login_submit');

        // console.log(this.submitobj);
        //给节点绑定点击事件
        this.submitobj.addEventListener('click', this.log_on.bind(this))
    }
    log_on() {
        //获取用户名和密码框的值
        let phobj = document.querySelector('.myuser').value;
        let pdobj = document.querySelector('.mypass').value;
        // console.log(111);
        //用ajax获取数据库用户表中的所有数据，与当前密码和用户框中的值是否相等
        ajax.get('../php/user.php', { fn: 'lst' }).then(res => {
            //    console.log(res);
            let { stateCode, data } = JSON.parse(res);
            //   console.log(data);
            if (stateCode == 200) {
                let index = 0;
                data.forEach(ele=>{
                    // console.log(phobj+'-',ele.phone);                  
                    //  console.log(pdobj+'-',ele.pwd);
                 
                    if(phobj==ele.phone&&pdobj==ele.pwd){
                        index+=1;
                    }
                })
                if(index==1){
                    //用户名和密码存在，将用户名存到本地并跳转到首页
                    localStorage.setItem('user',phobj);
                    window.parent.location.href='http://localhost/subject/shopping.html'
                }else{
                    alert('用户名或密码错误')
                }
            }
        })
    }
}
new login();
