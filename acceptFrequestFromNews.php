<?php

  require 'dbh.php';

  $idReq = $_POST['_idReq'];

  //selecting users id's from frequest
  $sql_sel = "SELECT * FROM tbl_frequests WHERE idReq = '$idReq'";
  $result_sel = mysqli_query($conn, $sql_sel);
  if(mysqli_num_rows($result_sel) == 1){
    $row_sel = mysqli_fetch_assoc($result_sel);

    $idUser = $row_sel['idUser'];
    $idFriend = $row_sel['idFriend'];
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

        $sql_del = "DELETE FROM tbl_frequests WHERE idReq = ?";
        $stmt_del = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt_del, $sql_del)){
          header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
          exit();
        }else{
          mysqli_stmt_bind_param($stmt_del, "i", $idReq);
          mysqli_stmt_execute($stmt_del);
          mysqli_stmt_close($stmt_del);

          //add new notification

          //first select the last ID from db notifications
          $lastId1 = 0;
          $sql_sel1 = "SELECT idNotification FROM tbl_notifications";
          $result_last1 = mysqli_query($conn, $sql_sel1);
          if(mysqli_num_rows($result_last1) > 0){
            while($row = mysqli_fetch_assoc($result_last1)){
              $lastId1 = $row['idNotification'];
            }
          }
          $lastId1++;
          $zero = 0;
          $typeOf = 'acceptedFrequest';
          $content = ' accepted your friend request';
          $sql_notif = "INSERT INTO tbl_notifications (idNotification, idUser, idPost, idUserToSee, typeOf, content, dateOf, isRead) VALUES ('$lastId1','$idFriend','$zero','$idUser','$typeOf',' $content',NOW(),'$zero')";
          if(mysqli_query($conn,$sql_notif)){
            echo '<h3>Accept request</h3>';
          }else{
            header("Location: ../index.php?error=sqlerror'.$lastId1.'-".mysqli_error($conn));
            exit();
          }
        }

      }else{
        header("Location: ../index.php?error=sqlerror333".mysqli_error($conn));
        exit();
      }

    }else{
      header("Location: ../index.php?error=sqlerror222".mysqli_error($conn));
      exit();
    }

  }else{
    header("Location: ../index.php?error=sqlerror111");
    exit();
  }



 ?>
