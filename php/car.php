<?php
include('./mysql.php');
$fn = $_GET['fn'];
$fn();

/***获取购物车数据***/
function lst()
{
   $id=$_POST['userId'];
   $sql='select * from Car where UserId='.$id;
   $data = select($sql);
   echo json_encode([
  'stateCode'=>200,
  'state'=>'success',
  'data'=>$data
   ]);
}

function delete()
{
    $gId = $_GET['goodsId'];
    $user = $_GET['userId'];  
    $sql="delete from Car where UserId=$user and  id=$gId";
    $res = query($sql);
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
function update()
{
  $gId = $_GET['goodsId'];
  $num = $_GET['goodsNum'];
  $user = $_GET['userId'];
  $sql = "update Car set Num=$num where id=$gId and UserId= $user";
  $res = query($sql);
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