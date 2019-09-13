<?php
  require 'dbh.php';

  $file_url = $_POST['_url'];
  $idUser = $_POST['_idUser'];

  //THE RIGHT WAY
  $sql = "UPDATE tbl_information SET nameProfilePic = ? WHERE idUser = ?";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $sql)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt, "si", $file_url, $idUser);
    mysqli_stmt_execute($stmt);
  }

  $oldUrl = 'empty';

  //JUST UPDATING THE IMAGE
  //add the old url to past profile pics
  $sql_old = "SELECT nameProfilePic FROM tbl_information WHERE idUser = ?";
  $stmt_old = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_old, $sql_old)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_old, "i", $idUser);
    mysqli_stmt_execute($stmt_old);
    $res_old = mysqli_stmt_get_result($stmt_old);
    $row_old = mysqli_fetch_assoc($res_old);
    $oldUrl = $row_old['nameProfilePic'];
  }
  //change img url
  $sql_upd = "UPDATE tbl_information SET nameProfilePic = '$file_url' WHERE idUser = '$idUser'";
  $result_upd = mysqli_query($conn, $sql_upd);
  if($result_upd){
    //change last updated
    $sql_upd1 = "UPDATE tbl_users SET updatedAt = NOW() WHERE idUser = '$idUser'";
    $result_upd1 = mysqli_query($conn, $sql_upd1);
    if(!$result_upd1){
      header("Location: ../index.php?error=sqlerror");
      exit();
    }
  }else{
    header("Location: ../index.php?error=sqlerror");
    exit();
  }
  $typeOf = 'profile';
  //adding old img url to tbl_profilepics
  $sql_add = "INSERT INTO tbl_pictures (idUser, typeOf, imgPath, addedOn) VALUES (?,?,?,NOW())";
  $stmt_add = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_add, $sql_add)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_add, 'iss', $idUser, $typeOf, $oldUrl);
    mysqli_stmt_execute($stmt_add);
  }


?>
