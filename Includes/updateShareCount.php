<?php
  require 'dbh.php';

  $postId = $_POST['_postId'];

  $sql_sel = "SELECT * FROM tbl_shares WHERE idPost=?";
  $stmt_sel = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_sel, $sql_sel);
  mysqli_stmt_bind_param($stmt_sel, "i", $postId);
  mysqli_stmt_execute($stmt_sel);
  $result_sel = mysqli_stmt_get_result($stmt_sel);
  $shareCount = mysqli_num_rows($result_sel);

  //actual loading
  echo $shareCount;

 ?>
