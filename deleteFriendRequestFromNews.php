<?php
  require 'dbh.php';

  $idReq = $_POST['_idReq'];

  $sql_del = "DELETE FROM tbl_frequests WHERE idReq=?";
  $stmt_del = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_del, $sql_del);
  mysqli_stmt_bind_param($stmt_del, "i", $idReq);
  mysqli_stmt_execute($stmt_del);


 ?>
