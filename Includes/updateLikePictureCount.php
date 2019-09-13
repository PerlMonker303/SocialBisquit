<?php
  require 'dbh.php';

  $imgUrl = $_POST['_urlPic'];
  $picId = 0;

  //select id first
  $sql_sel0 = "SELECT * FROM tbl_pictures WHERE imgPath = ?";
  $stmt_sel0 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel0, $sql_sel0)){
    header("Location: ../index.php?error=sqlerror1");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel0, 's', $imgUrl);
    mysqli_stmt_execute($stmt_sel0);
    $result_sel0 = mysqli_stmt_get_result($stmt_sel0);
    $row_sel0 = mysqli_fetch_assoc($result_sel0);
    $picId = $row_sel0['idPic'];
  }

  //selecting data
  $sql_sel = "SELECT * FROM tbl_likes_pictures WHERE idPic = ?";
  $stmt_sel = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel, $sql_sel)){
    header("Location: ../index.php?error=sqlerror2");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel, 'i', $picId);
    mysqli_stmt_execute($stmt_sel);
    mysqli_stmt_store_result($stmt_sel);
    $likeCount = mysqli_stmt_num_rows($stmt_sel);
  }
  //actual loading
  echo $likeCount;
 ?>
