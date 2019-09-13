<?php
  require 'dbh.php';

  $inp1 = $_POST['_setup_el1'];
  $inp2 = $_POST['_setup_el2'];
  $inp3 = $_POST['_setup_el3'];
  $inp5 = $_POST['_setup_el5'];
  $inp6 = $_POST['_setup_el6'];
  $inp7 = $_POST['_setup_el7'];
  $inp8 = $_POST['_setup_el8'];
  $inp9 = $_POST['_setup_el9'];
  $inp10 = $_POST['_setup_el10'];
  $currentId = $_POST['_idUser'];

  if($inp5 == 'is_male'){
    $inp5 = 0;
  }else{
    $inp5 = 1;
  }

  if($inp6 == 'lf_male'){
    $inp6 = 0;
  }else{
    $inp6 = 1;
  }

  $lastId = 0;

  //check if input doesn't surpass the character number limit
  if(strlen($inp7)>40||strlen($inp8)>40||strlen($inp9)>40){
    header("Location: ../index.php?error=wrongLength");
    exit();
  }

  session_start();

  //selecting last id
  $sql0 = "SELECT * FROM tbl_information";
  $stmt0 = mysqli_stmt_init($conn);
  if (!mysqli_stmt_prepare($stmt0, $sql0)) {
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt0, "i", $currentId);
    mysqli_stmt_execute($stmt0);
    $resultCheck = mysqli_stmt_get_result($stmt0);
    while($row = mysqli_fetch_assoc($resultCheck)){
      $lastId = $row['idInformation'];
    }
    $lastId++;

    //updating values
    //$sql = "UPDATE tbl_information SET idUser=?,idSecretQuestion=?,secretAnswer=?,dateOfBirth=?,gender=?,lookingFor=?,originated=?,location=?,profession=?,bio=? WHERE idUser=?";
    $sql = "INSERT INTO tbl_information(idInformation,idUser,idSecretQuestion,secretAnswer,dateOfBirth,gender,lookingFor,originated,location,profession,bio,nameProfilePic) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    $stmt = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt, $sql)){
      header("Location: ../index.php?error=sqlerror");
      exit();
    }else{
      $hashedAnswer = password_hash($inp2, PASSWORD_DEFAULT);
      $text = '';
      mysqli_stmt_bind_param($stmt, "iiisdiisssss", $lastId,$currentId,$inp1,$hashedAnswer,$inp3,$inp5,$inp6,$inp7,$inp8,$inp9,$inp10,$text);
      mysqli_stmt_execute($stmt);

      //update separately for date
      $sql_upd = "UPDATE tbl_information SET dateOfBirth = '$inp3' WHERE idUser = '$currentId'";
      mysqli_query($conn, $sql_upd);

      header("Location: ../index.php?error=upd_success--date:".$inp3);

    //changing last updated
    $sql1 = "UPDATE tbl_users SET updatedAt = NOW()  WHERE idUser=?";
    $stmt1 = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt1, $sql1)){
      header("Location: ../index.php?error=sqlerror");
      exit();
    }else{
      mysqli_stmt_bind_param($stmt1, "i", $currentId);
      mysqli_stmt_execute($stmt1);

      //header("Location: ../index.php?error=".$currentId);
    }
  }
