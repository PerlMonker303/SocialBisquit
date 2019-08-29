<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $loggedUserId = $_POST['_loggedUserId'];


      //selecting information
      $sql_user = "SELECT * FROM tbl_users WHERE idUser=?";
      $stmt_user = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt_user, $sql_user)){
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_user, 'i', $userId);
        mysqli_stmt_execute($stmt_user);

        $result_user = mysqli_stmt_get_result($stmt_user);
        $row_user = mysqli_fetch_assoc($result_user);
        $userFName = $row_user['fName'];
        $userLName = $row_user['lName'];
        $since = $row_user['dateOfReg'];
      }
      $sql = "SELECT * FROM tbl_information WHERE idUser=?";
      $stmt = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt, $sql)){
        exit();
      }else{
        mysqli_stmt_bind_param($stmt, 'i', $userId);
        mysqli_stmt_execute($stmt);

        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        if($row){
          echo '
          <div id="container-profile-other-picture">
          ';
          $imagePath = $row['nameProfilePic'];
          $gender = $row['gender'];
          if($gender == 1){
            $gender = "Male";
          }else{
            $gender = "Female";
          }
          $lookingFor = $row['lookingFor'];
          if($lookingFor == 1){
            $lookingFor = "Male";
          }else{
            $lookingFor = "Female";
          }
          $dob = strtotime($row['dateOfBirth']);
          $now = time();
          $diff = $now-$dob;
          $age = floor($diff / 31556926);
          if($imagePath != "")
            echo '<img src="Pictures/'.$imagePath.'"></img>';
          else
            echo '<img src="Pictures/defaultImage.jpg"></img>';
          $bio = $row['bio'];

          echo '
          </div>
          <div id="container-profile-options-frame">
            <h2>Information</h2>
            <table>
              <tr><td><span>Gender:</span></td><td>'.$gender.'</td><td><span>Looking for:</span></td><td>'.$lookingFor.'</td></tr>
              <tr><td><span>Age:</span></td><td>'.$age.'</td><td><span>Member since:</span></td><td>'.$since.'</td></tr>
            </table>
          </div>
          <div id="container-profile-other-header">
            <span class="profile-span-first">'.$userFName.'</span>
            <span class="profile-span-first"> '.$userLName.'</span><br>
            <p>'.$bio.'</p>
            <span id="private_tag"></span>
          </div>


          ';
        }else{
          echo '
          <div id="container-profile-other-header">
            <span class="profile-span-first">'.$userFName.'</span>
            <span class="profile-span-first"> '.$userLName.'</span></br></br>
            <span id="private_tag">This account is private.</span>
          </div>
          ';

        }
      }


 ?>
