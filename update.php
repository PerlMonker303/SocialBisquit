<?php
if(isset($_POST['update-submit'])){

  require 'dbh.php';

  $inp1 = $_POST['setup_el1'];
  $inp2 = $_POST['setup_el2'];
  $inp3 = $_POST['setup_el3'];
  $inp4 = $_POST['setup_el4'];
  $inp5 = $_POST['setup_el5'];
  $inp6 = $_POST['setup_el6'];
  $inp7 = $_POST['setup_el7'];
  $inp8 = $_POST['setup_el8'];
  $inp9 = $_POST['setup_el9'];
  $inp10 = $_POST['setup_el10'];
  //setting the file up
  $inpFile = $_FILES['setup_el11'];

  $fileName = $_FILES['setup_el11']['name'];
  $fileTmpName = $_FILES['setup_el11']['tmp_name'];
  $fileSize = $_FILES['setup_el11']['size'];
  $fileError = $_FILES['setup_el11']['error'];
  $fileType = $_FILES['setup_el11']['type'];

  $fileExt = explode('.', $fileName);
  $fileActualExt = strtolower(end($fileExt));

  $allowed = array('jpg','jpeg','png');
  if(in_array($fileActualExt,$allowed)){
    if($fileError == 0){
      if($fileSize < 500000){
        $fileNameNew = uniqid('', true).".".$fileActualExt;
        $fileDestination = '../Pictures/'.$fileNameNew;
        move_uploaded_file($fileTmpName,$fileDestination);
      }else{
        header("Location: ../index.php?error=fileProfilePicSize");
        exit();
      }
    }
  }else{
    header("Location: ../index.php?error=fileProfilePicWrongFormat");
    exit();
  }


  session_start();
  $currentId = $_SESSION['userId'];

  //first we check if it exists
  $sql0 = "SELECT * FROM tbl_information WHERE idUser = ?";
  $stmt0 = mysqli_stmt_init($conn);
  if (!mysqli_stmt_prepare($stmt0, $sql0)) {
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt0, "i", $currentId);
    mysqli_stmt_execute($stmt0);
    mysqli_stmt_store_result($stmt0);
    $resultCheck = mysqli_stmt_num_rows($stmt0);
    if($resultCheck>0){
      //exists
      //updating values
      $sql = "UPDATE tbl_information SET idSecretQuestion=?,secretAnswer=?,dateOfBirth=?,height=?,gender=?,lookingFor=?,originated=?,location=?,profession=?,bio=?,nameProfilePic=? WHERE idUser=?";
      $stmt = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt, $sql)){
        header("Location: ../index.php?error=sqlerror");
        exit();
      }else{
        $hashedAnswer = password_hash($inp2, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($stmt, "iissdiisssssi", $currentId,$inp1,$hashedAnswer,$inp3,$inp4,$inp5,$inp6,$inp7,$inp8,$inp9,$inp10,$fileNameNew,$_SESSION['userId']);
        mysqli_stmt_execute($stmt);

        //header("Location: ../index.php?error=upd_success&1=".$inp1."&2=".$inp2."&3=".$inp3."&4=".$inp4."&5=".$inp5."&6=".$inp6."&7=".$inp7."&8=".$inp8."&9=".$inp9."&10=".$inp10."&11=".$inpFile);
      }
    }else{
      //doesn't exist
      $sql = "INSERT INTO tbl_information(idUser,idSecretQuestion,secretAnswer,dateOfBirth,height,gender,lookingFor,originated,location,profession,bio,nameProfilePic) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      $stmt = mysqli_stmt_init($conn);
      if (!mysqli_stmt_prepare($stmt, $sql)) {
        header("Location: ../index.php?error=sqlerror");
        exit();
      }else{
        $hashedAnswer = password_hash($inp2, PASSWORD_DEFAULT);
        $birthDate = mysqli_real_escape_string($inp3);
        if($inp5=='is_male'){
          $inp5 = 1;
        }else{
          $inp5 = 0;
        }
        if($inp6=='lf_male'){
          $inp6 = 1;
        }else{
          $inp6 = 0;
        }
        mysqli_stmt_bind_param($stmt, "iissdiisssss", $currentId,$inp1,$hashedAnswer,$inp3,$inp4,$inp5,$inp6,$inp7,$inp8,$inp9,$inp10,$fileNameNew);
        mysqli_stmt_execute($stmt);

        //header("Location: ../index.php?error=upd_success&1=".$inp1."&2=".$inp2."&3=".$inp3."&4=".$inp4."&5=".$inp5."&6=".$inp6."&7=".$inp7."&8=".$inp8."&9=".$inp9."&10=".$inp10."&11=".$inpFile);
      }
    }
    header("Location: ../index.php?error=upd_success");
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
}else{
  header("Location: ../index.php?error=sqlerror");
  exit();
}
