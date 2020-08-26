class login {
    constructor() {
        this.submitobj = document.querySelector('#login_submit');

        // console.log(this.submitobj);
        this.submitobj.addEventListener('click', this.log_on.bind(this))
    }
    log_on() {
        let phobj = document.querySelector('.myuser').value;
        let pdobj = document.querySelector('.mypass').value;
        // console.log(111);
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
