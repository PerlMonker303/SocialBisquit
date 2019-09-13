<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $friendId = $_POST['_friendId'];

  $sql_add = "INSERT INTO tbl_contacts(idUser, idFriend, since, is_ignored, is_blocked) VALUES(?,?,NOW(),?,?)";
  $stmt_add = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_add, $sql_add)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_add, "iiii", $userId, $friendId, $zero, $zero);
    mysqli_stmt_execute($stmt_add);

    //inverted
    $sql_add_inverted = "INSERT INTO tbl_contacts(idUser, idFriend, since, is_ignored, is_blocked) VALUES(?,?,NOW(),?,?)";
    $stmt_add_inverted = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt_add_inverted, $sql_add_inverted)){
      header("Location: ../index.php?error=sqlerror");
      exit();
    }else{
      mysqli_stmt_bind_param($stmt_add_inverted, "iiii", $friendId, $userId, $zero, $zero);
      mysqli_stmt_execute($stmt_add_inverted);

      echo '<h3>Addded</h3>';
    }




  }
 ?>
