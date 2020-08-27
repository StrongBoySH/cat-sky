<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();
/*****获取cart中指定用户的商品id****/
function getitp()
 {
   $goodsId = $_GET['goodsId'];
   $sql = 'select img,title,price from proudct1 where goodsId='.$goodsId;
   $data = select($sql);
   echo json_encode([
    'stateCode'=>200,
    'state'=>'success',
    'data'=>$data
  ]);
 }
 function add(){
   $UserId=$_POST['UserId'];
   $CarTitle=$_POST['CarTitle'];
   $CarPrice=$_POST['CarPrice'];
   $CarImg=$_POST['CarImg'];
   $num=$_POST['num'];
   $bprice=$_POST['BPrice'];
   $goodsid=$_POST['goodsid'];
   $sql="insert into Car(img,UserId,Num,Title,bPirce,CarPirce,goodsid) values('$CarImg','$UserId','$num','$CarTitle','$bprice','$CarPrice','$goodsid') on duplicate key update Num=Num+'$num'";
   $res=query($sql);
   if($res==1){
       echo json_encode([
         'stateCode'=>200,
         'state'=>'success',
         'data'=>''
       ]);
     }else{
       echo json_encode([
         'stateCode'=>201,
         'state'=>'error',
         'data'=>''
       ]);
     }
 }
?>