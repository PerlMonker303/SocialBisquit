<?php
  require 'dbh.php';

  $idUser = $_POST['_userId'];
  $idFriend = $_POST['_friendId'];
  $zero = 0;

  $lastId = 0;
  //select last id and increment it
  $sql_last = "SELECT idContact FROM tbl_contacts";
  $result_last = mysqli_query($conn, $sql_last);
  if(mysqli_num_rows($result_last) > 0){
    while($row = mysqli_fetch_assoc($result_last)){
      $lastId = $row['idContact'];
    }
  }
  $lastId++;
  //user adds friend
  $sql_adding = "INSERT INTO tbl_contacts (idContact, idUser, idFriend, since, is_ignored, is_blocked) VALUES ('$lastId','$idUser','$idFriend',NOW(),'$zero','$zero')";
  if(mysqli_query($conn,$sql_adding)){
    //adding inverted
    $lastId++;
    $sql_inv = "INSERT INTO tbl_contacts (idContact, idUser, idFriend, since, is_ignored, is_blocked) VALUES ('$lastId','$idFriend','$idUser',NOW(),'$zero','$zero')";
    if(mysqli_query($conn,$sql_inv)){
      //deleting frequest

      $sql_del = "DELETE FROM tbl_frequests WHERE idUser = ? AND idFriend = ?";
      $stmt_del = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt_del, $sql_del)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_del, "ii", $idFriend, $idUser);
        mysqli_stmt_execute($stmt_del);
        mysqli_stmt_close($stmt_del);

        echo '<h3>Accept request</h3>';
      }

    }else{
      header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
      exit();
    }

  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }


 ?>
