class register {
    constructor() {
        this.addEvent();
    }
    addEvent() {
        //1.判断用户名的格式是否正确， 2.判断当前用户名是否与数据库中的用户名存在
        $(".user").blur(()=>{
            //获取用户框数据
            let val=$(".user").val();
            let reg=/^1{1}[3-9]{1}[0-9]{9}$/;
            if(reg.test(val)){
                ajax.get('./php/user.php',{fn:'lst'}).then(res=>{
                    // console.log(res);
                    let { stateCode,data } = JSON.parse(res);
                    // console.log(data);
                    if(stateCode==200){
                        let index=0;
                        data.forEach(ele=>{
                             if(val==ele.phone){
                                 index++;
                             }
                        })
                        if(index==1){
                             $('#q1').html('用户名以存在');
                        }else{
                            $('#q1').html('可以使用');
                        }
                    }
                })
            }else{
                $("#q1").html('用户名格式错误');
            }
        })
          //给注册绑定点击事件，
        $(".btn").click(() => {
            this.phone = $(".user").val();
            this.pwd = $(".pass").val();
            if ($(".code").val() == "7364") {
                this.setDate(this.phone, this.pwd);
            } else {
                alert("请输入正确的验证码")
            }
        })
    }
    //存数据库的方法
    setDate(phone, pwd) {
        ajax.post('./php/user.php?fn=add', { phone: phone, pwd: pwd }).then((res) => {
            console.log(res);
            let { stateCode } = JSON.parse(res);
            if (stateCode == 200) {
                location.reload();
                alert("已注册成功，请返回登录！！");
            }
        })
    }
}
new register()