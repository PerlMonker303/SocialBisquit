<?php
  require 'dbh.php';

  $loggedUserId = $_POST['_loggedUserId'];

  //checking unread news from user
  $sql_check = "SELECT * FROM tbl_notifications WHERE idUserToSee = ? AND isRead = 0";
  $stmt_check = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_check, $sql_check);
  mysqli_stmt_bind_param($stmt_check, 'i', $loggedUserId);
  mysqli_stmt_execute($stmt_check);
  $result_check = mysqli_stmt_get_result($stmt_check);
  $unreadCounter = mysqli_num_rows($result_check);

  //checking friend requests as well
  $sql_check1 = "SELECT * FROM tbl_frequests WHERE idFriend = ?";
  $stmt_check1 = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_check1, $sql_check1);
  mysqli_stmt_bind_param($stmt_check1, 'i', $loggedUserId);
  mysqli_stmt_execute($stmt_check1);
  $result_check1 = mysqli_stmt_get_result($stmt_check1);
  $unreadCounter += mysqli_num_rows($result_check1);

  echo '<span>'.$unreadCounter.'</span>';



 ?>
