<?php
include('./mysql.php');
$fn=$_GET['fn'];
$fn();
function lst(){
    $sql = 'select * from user';
    $data = select($sql);
  
    //print_r($data);
    echo json_encode([
      'stateCode'=>200,
      'state'=>'success',
      'data'=>$data
    ]);
  }
//添加数据的方法
function add(){
    $phone=$_POST['phone'];
    $pwd=$_POST['pwd'];

    $sql="insert into user(phone,pwd) values('$phone','$pwd')" ;
    $res=query($sql);
    if($res==1){
        echo json_encode([
            'stateCode'=>200,
            'state'=>'success',
            'datd'=>''
        ]);
    }
    else{
        echo json_encode([
            'stateCode'=>201,
            'state'=>'error',
            'data'=>''
          ]); 
    }
}
?>