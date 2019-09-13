<?php

  require 'dbh.php';

  $idUser = $_POST['_userId'];

  $gender = "";
  $lookingFor = "";
  $styleGender = "";
  $styleLookingFor = "";
  $dob = "";
  $from = "";
  $in = "";
  $job = "";


  $sql_sel1 = "SELECT * FROM tbl_information WHERE idUser = '$idUser'";
  $result_sel1 = mysqli_query($conn, $sql_sel1);
  if($result_sel1){
    $row_sel1 = mysqli_fetch_assoc($result_sel1);
    if($row_sel1){

      if($row_sel1['gender'] == 1){
        $gender = 'Male';
        $styleGender = 'style="color: #4169E1;"';
      }else{
        $gender = 'Female';
        $styleGender = 'style="color: #FF69B4;"';
      }
      if($row_sel1['lookingFor'] == 1){
        $lookingFor = 'Male';
        $styleLookingFor = 'style="color: #4169E1;"';
      }else{
        $lookingFor = 'Female';
        $styleLookingFor = 'style="color: #FF69B4;"';
      }

      $dob = date('d-m-Y', strtotime($row_sel1['dateOfBirth']));
      $from = $row_sel1['originated'];
      $in = $row_sel1['location'];
      $job = $row_sel1['profession'];
    }else{
      $gender = 'Undefined';
      $lookingFor = 'Undefined';
      $dob = 'Undefined';
      $from = 'Undefined';
      $in = 'Undefined';
      $job = 'Undefined';
    }

  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }

  echo '<h2>Profile</h2>
    <div id="settings-container-success">
      <h4>Profile updated succesfully.</h4>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Gender</span></div>
      <div class=\'settings-container-option\'><span '.$styleGender.'>'.$gender.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Looking for</span></div>
      <div class=\'settings-container-option\'><span '.$styleLookingFor.'>'.$lookingFor.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Date of birth</span></div>
      <div class=\'settings-container-option\'><span>'.$dob.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>From</span></div>
      <div class=\'settings-container-option\'><span>'.$from.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Current location</span></div>
      <div class=\'settings-container-option\'><span>'.$in.'</span></div>
    </div>
    <div class=\'settings-container\'>
      <div class=\'settings-container-title\'><span>Working as</span></div>
      <div class=\'settings-container-option\'><span>'.$job.'</span></div>
    </div>


    <img class="formButton" src="Icons/IconOptions.png" name="settings-edit-button"></img>
  ';
 ?>
