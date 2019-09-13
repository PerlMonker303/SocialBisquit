<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $bio = $_POST['_bio'];
  /*
  //update lastUpdated
  $sql_upd = "UPDATE tbl_users SET updatedAt = NOW() WHERE idUser = ?";
  $stmt_upd = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_upd, $sql_upd)){
    header("Location: ../index.php?error=sqlerror1");
    exit();
  }else{
    mysqli_fetch_assoc($stmt_upd, 'i', $userId);
    mysqli_stmt_execute($stmt_upd);

    //update information bio
    $sql_upd1 = "UPDATE tbl_information SET bio = ? WHERE idUser = ?";
    $stmt_upd1 = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt_upd1, $sql_upd1)){
      header("Location: ../index.php?error=sqlerror2");
      exit();
    }else{
      mysqli_fetch_assoc($stmt_upd1, 'si', $bio, $userId);
      mysqli_stmt_execute($stmt_upd1);
    }
  }
  */
  $sql_upd = "UPDATE tbl_users SET updatedAt = NOW() WHERE idUser = '$userId'";
  if(mysqli_query($conn, $sql_upd)){
    $sql_upd1 = "UPDATE tbl_information SET bio = '$bio' WHERE idUser = '$userId'";
    if(mysqli_query($conn, $sql_upd1)){

    }else{
      header("Location: ../index.php?error=sqlerror2".mysqli_error($conn));
      exit();
    }
  }else{
    header("Location: ../index.php?error=sqlerror1".mysqli_error($conn));
    exit();
  }


 ?>
