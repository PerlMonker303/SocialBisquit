<?php
  require 'dbh.php';

  $postId = $_POST['idOfPost'];

  $sql = "DELETE FROM tbl_posts WHERE idPost=?";
  $stmt = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt, $sql);
  mysqli_stmt_bind_param($stmt, 'i', $postId);
  mysqli_stmt_execute($stmt);


 ?>
