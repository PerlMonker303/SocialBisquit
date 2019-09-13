<?php

  require 'dbh.php';

  $urlPic = $_POST['_imgUrl'];
  $userId = $_POST['_userId'];
  $picId = 0;

  //selecting idPic
  $sql0 = "SELECT idPic FROM tbl_pictures WHERE imgPath = ?";
  $stmt0 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt0, $sql0)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt0, "s", $urlPic);
    mysqli_stmt_execute($stmt0);
    $res = mysqli_stmt_get_result($stmt0);
    $row = mysqli_fetch_assoc($res);
    $picId = $row['idPic'];
  }

  //selecting data
  $sql_sel = "SELECT * FROM tbl_likes_pictures WHERE idPic=? AND idUser=?";
  $stmt_sel = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_sel, $sql_sel);
  mysqli_stmt_bind_param($stmt_sel, "ii", $picId, $userId);
  mysqli_stmt_execute($stmt_sel);
  mysqli_stmt_store_result($stmt_sel);
  //actual loading
  echo '<img src=\'Icons/IconLike.png\'></img>';
  if(mysqli_stmt_num_rows($stmt_sel)>0){
    echo '<h4>Liked</h4>';
  }else{
    echo '<h4>Like</h4>';
  }




 ?>
