<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $friendId = $_POST['_friendId'];
  $zero = 0;

  $lastId = 0;

  //select the last id
  $sql_sel = "SELECT idReq FROM tbl_frequests ORDER BY idReq DESC LIMIT 1";
  $stmt_sel = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel, $sql_sel)){
    header("Location: ../index.php?error=sqlerror2");
    exit();
  }else{
    mysqli_stmt_execute($stmt_sel);
    $res = mysqli_stmt_get_result($stmt_sel);
    $row = mysqli_fetch_assoc($res);
    $lastId = $row['idReq'];
  }

  $lastId++;

  $sql_send = "INSERT INTO tbl_frequests(idReq, idUser, idFriend, dateSent) VALUES(?,?,?,NOW())";
  $stmt_send = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_send, $sql_send)){
    header("Location: ../index.php?error=sqlerror2");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_send, "iii", $lastId, $userId, $friendId);
    mysqli_stmt_execute($stmt_send);

    echo '<h3>Request sent</h3>';

  }
?>
