<?php
  require 'dbh.php';

  $settingsArray = $_POST['_settingsValues'];
  $idUser = $_POST['_idUser'];
  $wasUpdated = false;

  $sql_sel = "SELECT * FROM tbl_information WHERE idUser = '$idUser'";
  $sql_result = mysqli_query($conn, $sql_sel);
  if($sql_result){

    $row = mysqli_fetch_assoc($sql_result);

    if($row['gender'] != $settingsArray[0]){
      if($settingsArray[0] == 'Male')
        $gender = 0;
      else if($settingsArray[0] == 'Female')
        $gender = 1;
      $sql_upd0 = "UPDATE tbl_information SET gender = '$gender' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd0)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;

    }

    if($row['lookingFor'] != $settingsArray[1]){
      if($settingsArray[1] == 'Male'){
        $lookingFor = 0;
      }else if($settingsArray[1] == 'Female'){
        $lookingFor = 1;
      }
      $sql_upd1 = "UPDATE tbl_information SET lookingFor = '$lookingFor' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd1)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    //first format the date maaan
    if($row['dateOfBirth'] != $settingsArray[2]){
      $dob = $settingsArray[2];
      $sql_upd2 = "UPDATE tbl_information SET dateOfBirth = '$dob' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd2)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      header("Location: ../index.php?error=".$settingsArray[2]);
      $wasUpdated = true;
    }

    if($row['originated'] != $settingsArray[3]){
      $from = $settingsArray[3];
      $sql_upd3 = "UPDATE tbl_information SET originated = '$from' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd3)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    if($row['location'] != $settingsArray[4]){
      $loc = $settingsArray[4];
      $sql_upd4 = "UPDATE tbl_information SET location = '$loc' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd4)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    if($row['profession'] != $settingsArray[5]){
      $work = $settingsArray[5];
      $sql_upd5 = "UPDATE tbl_information SET profession = '$work' WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd5)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
      $wasUpdated = true;
    }

    if($wasUpdated){
      $sql_upd = "UPDATE tbl_users SET updatedAt = NOW() WHERE idUser = '$idUser'";
      if(!mysqli_query($conn, $sql_upd)){
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
    }

  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }

  //check if date of birth is after current date
  /*if(new DateTime() > $inp3){
    header("Location: ../index.php?error=wrongDate");
    exit();
  }*/
 ?>
