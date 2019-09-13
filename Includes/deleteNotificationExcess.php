<?php
  require 'dbh.php';

  $idUserToSee = $_POST['_idUser'];
  $limitNotifications = 30;

  //first count them
  $sql_count = "SELECT * FROM tbl_notifications WHERE idUserToSee = '$idUserToSee'";
  $result_count = mysqli_query($conn, $sql_count);
  if($result_count){
    if(mysqli_num_rows($result_count) > $limitNotifications){
      $row = mysqli_fetch_assoc($result_count);
      //delete oldest notification
      $idNotifToDelete = $row['idNotification'];
      $sql_del = "DELETE FROM tbl_notifications WHERE idNotification = '$idNotifToDelete'";
      if(!mysqli_query($conn, $sql_del)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }else{
        header("Location: ../index.php?error=success".$idNotifToDelete);
        exit();
      }
    }else{
      header("Location: ../index.php?error=success".$idUserToSee);
      exit();
    }
  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }
?>
