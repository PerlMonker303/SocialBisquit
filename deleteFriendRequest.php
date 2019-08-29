<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $friendId = $_POST['_friendId'];

  $sql_del = "DELETE FROM tbl_frequests WHERE idUser=? AND idFriend=?";
  $stmt_del = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_del, $sql_del);
  mysqli_stmt_bind_param($stmt_del, "ii", $userId, $friendId);
  mysqli_stmt_execute($stmt_del);

  echo '<h3>Add friend</h3>';

 ?>
