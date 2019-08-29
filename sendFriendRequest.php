<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $friendId = $_POST['_friendId'];
  $zero = 0;

  $sql_send = "INSERT INTO tbl_frequests(idUser, idFriend, dateSent) VALUES(?,?,NOW())";
  $stmt_send = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_send, $sql_send)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_send, "ii", $userId, $friendId);
    mysqli_stmt_execute($stmt_send);

    echo '<h3>Request sent</h3>';

  }
?>
