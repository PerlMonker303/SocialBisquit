<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];

  $sql_upd = "UPDATE tbl_users SET lastAccessed = NOW() WHERE idUser = '$userId'";
  if(!mysqli_query($conn, $sql_upd)){
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }


 ?>
