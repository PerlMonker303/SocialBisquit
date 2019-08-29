<?php

  require 'dbh.php';

  $idUser = $_POST['_loggedUserId'];
  $idFriend = $_POST['_userId'];

  $sql_add = "SELECT * FROM tbl_contacts WHERE idUser=? AND idFriend=?";
  $stmt_add = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_add, $sql_add)){
    header("Location: ../index.php&error=?");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_add, 'ii', $idUser, $idFriend);
    mysqli_stmt_execute($stmt_add);
    mysqli_stmt_store_result($stmt_add);
    $resultCheck = mysqli_stmt_num_rows($stmt_add);
    //inverted check

    $sql_add_inverted = "SELECT * FROM tbl_contacts WHERE idUser=? AND idFriend=?";
    $stmt_add_inverted = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt_add_inverted, $sql_add_inverted);
    mysqli_stmt_bind_param($stmt_add_inverted, 'ii', $idUser, $idFriend);
    mysqli_stmt_execute($stmt_add_inverted);
    mysqli_stmt_store_result($stmt_add_inverted);
    $resultCheck_inverted = mysqli_stmt_num_rows($stmt_add_inverted);


    if($resultCheck > 0 || $resultCheck_inverted > 0){
      echo '
        <h3>Added</h3>
      ';
    }else{

      //checking if the request was sent
      $sql_req = "SELECT * FROM tbl_frequests WHERE idUser=? AND idFriend=?";
      $stmt_req = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt_req, $sql_req)){
        header("Location: ../index.php&error=?");
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_req, 'ii', $idUser, $idFriend);
        mysqli_stmt_execute($stmt_req);
        mysqli_stmt_store_result($stmt_req);
        $resultCheck1 = mysqli_stmt_num_rows($stmt_req);
        if($resultCheck1 > 0){
          echo '
            <h3>Request sent</h3>
          ';
        }else{
          //accept friend request
          $sql_acc = "SELECT * FROM tbl_frequests WHERE idUser=? AND idFriend=?";
          $stmt_acc = mysqli_stmt_init($conn);
          if(!mysqli_stmt_prepare($stmt_acc, $sql_acc)){
            header("Location: ../index.php&error=?");
            exit();
          }else{
            mysqli_stmt_bind_param($stmt_acc, 'ii', $idFriend, $idUser);
            mysqli_stmt_execute($stmt_acc);
            mysqli_stmt_store_result($stmt_acc);
            $resultCheck2 = mysqli_stmt_num_rows($stmt_acc);
            if($resultCheck2 > 0){
              echo '
                <h3>Accept request</h3>
              ';
            }else{
              echo '
                <h3>Add friend</h3>
              ';
            }
          }

        }
      }

    }
  }


?>
