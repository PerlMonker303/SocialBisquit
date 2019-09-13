<?php
  require 'dbh.php';

  $idUser = $_POST['_userId'];

  $fName = "";
  $lName = "";
  $dateOfReg = "";
  $email = "";

  //selecting data
  $sql_sel = "SELECT * FROM tbl_users WHERE idUser = '$idUser'";
  $result_sel = mysqli_query($conn, $sql_sel);
  if($result_sel){
    $row_sel = mysqli_fetch_assoc($result_sel);
    $fName = $row_sel['fName'];
    $lName = $row_sel['lName'];
    $dateOfReg = substr($row_sel['dateOfReg'], 0, 10);
    $dateOfReg = date("d-m-Y", strtotime($row_sel['dateOfReg']));

    $email = $row_sel['email'];

    $sql_sel1 = "SELECT * FROM tbl_information WHERE idUser = '$idUser'";
    $result_sel1 = mysqli_query($conn, $sql_sel1);
    if($result_sel1){
      $row_sel1 = mysqli_fetch_assoc($result_sel1);



    }else{
      header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
      exit();
    }
  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }

  echo '<h2>Account</h2>
    <div id="settings-container-success">
      <h4>Profile updated succesfully.</h4>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>First name</span></div>
      <div class=\'settings-container-option\'><span>'.$fName.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Last name</span></div>
      <div class=\'settings-container-option\'><span>'.$lName.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Email address</span></div>
      <div class=\'settings-container-option\'><span>'.$email.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Date of registration</span></div>
      <div class=\'settings-container-option\'><span>'.$dateOfReg.'</span></div>
    </div>

    <img class="formButton" src="Icons/IconOptions.png" name="settings-edit-button"></img>

  ';

 ?>
