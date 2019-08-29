<?php
  require 'dbh.php';

  $feedbackContent = $_POST['_newFeedbackContent'];

  $sql = "INSERT INTO tbl_feedback (content,dateSent) VALUES (?,NOW())";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt,$sql)){
      header("Location: ../index.php?error=sqlerror");
      exit();
  }else{
    mysqli_stmt_bind_param($stmt, "s", $feedbackContent);
    mysqli_stmt_execute($stmt);
  }

 ?>
