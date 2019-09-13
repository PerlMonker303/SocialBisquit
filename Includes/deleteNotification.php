<?php
  require 'dbh.php';

  $idNotif = $_POST['_idNotif'];

  //delete the notification
  $sql_del = "DELETE FROM tbl_notifications WHERE idNotification = '$idNotif'";
  if(!mysqli_query($conn, $sql_del)){
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }

 ?>
