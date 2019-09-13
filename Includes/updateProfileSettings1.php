<?php
  require 'dbh.php';

  $settingsArray = $_POST['_settingsValues'];
  $idUser = $_POST['_idUser'];
  $wasUpdated = false;

  //for each data you recieve you check if it is different from the stored values so you don't update any fields when it's not necessary

  $sql_sel = "SELECT * FROM tbl_users WHERE idUser = '$idUser'";
  $sql_result = mysqli_query($conn, $sql_sel);
  if($sql_result){

    $row = mysqli_fetch_assoc($sql_result);

    if($row['fName'] != $settingsArray[0]){
      $fName = $settingsArray[0];
      $sql_upd0 = "UPDATE tbl_users SET fName = '$fName' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd0)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    if($row['lName'] != $settingsArray[1]){
      $lName = $settingsArray[1];
      $sql_upd1 = "UPDATE tbl_users SET lName = '$lName' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd1)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    if($row['email'] != $settingsArray[2]){
      $email = $settingsArray[2];
      $sql_upd2 = "UPDATE tbl_users SET email = '$email' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd2)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    if($wasUpdated){

      $sql_upd = "UPDATE tbl_users SET updatedAt = NOW() WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
    }

  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }



 ?>
