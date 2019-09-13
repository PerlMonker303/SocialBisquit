<?php
  require 'dbh.php';

  $urlPic = $_POST['_urlPic'];
  $idUser = $_POST['_idUser'];
  $idImg = 0;
  $idLike = 0;

  //select id pic
  $sql_sel = 'SELECT idPic FROM tbl_pictures WHERE imgPath = ?';
  $stmt_sel = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel, $sql_sel)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel, 's', $urlPic);
    mysqli_stmt_execute($stmt_sel);
    $res_sel = mysqli_stmt_get_result($stmt_sel);
    $row_sel = mysqli_fetch_assoc($res_sel);
    $idImg = $row_sel['idPic'];
  }

  //check if the picture is already liked
  $sql_check = 'SELECT idLike FROM tbl_likes_pictures WHERE idPic = ?';
  $stmt_check = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_check, $sql_check)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_check, 'i', $idImg);
    mysqli_stmt_execute($stmt_check);
    $res_check = mysqli_stmt_get_result($stmt_check);
    $row_check = mysqli_fetch_assoc($res_check);
    $idLike = $row_check['idLike'];
    if($idLike){


      //dislike
      $sql_del = 'DELETE FROM tbl_likes_pictures WHERE idLike = ?';
      $stmt_del = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt_del, $sql_del)){
        header("Location: ../index.php?error=sqlerror");
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_del, 'i', $idLike);
        mysqli_stmt_execute($stmt_del);
      }
      echo 'del';
    }else{
      echo 'insert';
      //insert like
      $sql_add = 'INSERT INTO tbl_likes_pictures (idPic, idUser) VALUES (?,?)';
      $stmt_add = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt_add, $sql_add)){
        header("Location: ../index.php?error=sqlerror");
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_add, 'ii', $idImg, $idUser);
        mysqli_stmt_execute($stmt_add);
      }
    }
  }


 ?>
