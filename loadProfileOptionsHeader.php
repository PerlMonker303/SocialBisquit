<?php

  require 'dbh.php';

  $sessionUserId = $_POST['_userId'];

  //searching for userId in tbl_information

  $sql = "SELECT * FROM tbl_information WHERE idUser=?";
  $stmt = mysqli_stmt_init($conn);

  if(!mysqli_stmt_prepare($stmt, $sql)){
    exit();
  }else{
    mysqli_stmt_bind_param($stmt, 'i', $sessionUserId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);
    $resultCheck = mysqli_stmt_num_rows($stmt);
    if($resultCheck == 0){
      echo '
        <h4>You have not set up your profile yet.</h4>
        <input name="_showProfileSetupForm" class="formButton" type="button" value="Tell us about yourself"></input>
      ';
    }else{
      $sql1 = "SELECT * FROM tbl_information WHERE idUser=?";
      $stmt1 = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt1, $sql1);
      mysqli_stmt_bind_param($stmt1, 'i', $sessionUserId);
      mysqli_stmt_execute($stmt1);
      //selecting data from tbl_information
      $result = mysqli_stmt_get_result($stmt1);
      $row = mysqli_fetch_assoc($result);

      //selecting friends
      $sql_friends = "SELECT * FROM tbl_contacts WHERE idUser=?";
      $stmt_friends = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt_friends,$sql_friends);
      mysqli_stmt_bind_param($stmt_friends, 'i', $sessionUserId);
      mysqli_stmt_execute($stmt_friends);
      mysqli_stmt_store_result($stmt_friends);
      $friendsCount = mysqli_stmt_num_rows($stmt_friends);

      //selecting postCount from tbl_posts
      $sql2 = "SELECT * FROM tbl_posts WHERE idUser=?";
      $stmt2 = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt2, $sql2))
        exit();
      mysqli_stmt_bind_param($stmt2, 'i', $sessionUserId);
      mysqli_stmt_execute($stmt2);
      mysqli_stmt_store_result($stmt2);
      $postsCount = mysqli_stmt_num_rows($stmt2);
      $genderColorChange = "";
      $gender = $row['gender'];
      if($gender == 1){
        $gender = "Male";
        $genderColorChange = "style=\"color: #4169E1;\"";
      }else{
        $gender = "Female";
        $genderColorChange = "style=\"color: 	#FF69B4;\"";
      }
      $lookingForColorChange = "";
      $lookingFor = $row['lookingFor'];
      if($lookingFor == 1){
        $lookingFor = "Male";
        $lookingForColorChange = "style=\"color: #4169E1;\"";
      }else{
        $lookingFor = "Female";
        $lookingForColorChange = "style=\"color: 	#FF69B4;\"";
      }
      $dob = strtotime($row['dateOfBirth']);
      $now = time();
      $diff = $now-$dob;
      $age = floor($diff / 31556926);
      $height = $row['height'];
      echo '
      <tbody>
        <tr>
          <td><span>Friends: </span></td>
          <td>'.$friendsCount.'</td>
          <td><span>Posts: </span></td>
          <td>'.$postsCount.'</td>
        </tr>
        <tr>
          <td><span>Gender: </span></td>
          <td '.$genderColorChange.'>'.$gender.'</td>
          <td><span>Looking for: </span></td>
          <td '.$lookingForColorChange.'>'.$lookingFor.'</td>
        </tr>
        <tr>
          <td><span>Age: </span></td>
          <td>'.$age.'</td>
          <td><span>Height: </span></td>
          <td>'.$height.'</td>
        </tr>
      </tbody>
      ';
    }
  }

?>
