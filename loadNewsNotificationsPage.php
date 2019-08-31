<?php
  require 'dbh.php';

  $id = $_POST['_userId'];

  $localId = 0;

  //this script loads every notification this user has in #content area
  $sql_load = "SELECT * FROM tbl_notifications WHERE idUserToSee = '$id' ORDER BY dateOf DESC ";
  $result_load = mysqli_query($conn, $sql_load);
  if($result_load){
    echo '<div id="container-notifications-page">
      <h2>Notifications</h2>
    ';
    if(mysqli_num_rows($result_load) > 0){
      while($row = mysqli_fetch_assoc($result_load)){
        //selecting name
        $sql_sel_name = "SELECT fName, lName FROM tbl_users WHERE idUser = ?";
        $stmt_sel_name = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt_sel_name, $sql_sel_name);
        mysqli_stmt_bind_param($stmt_sel_name, 'i', $row['idUser']);
        mysqli_stmt_execute($stmt_sel_name);
        $result_sel_name = mysqli_stmt_get_result($stmt_sel_name);
        $row_sel_name = mysqli_fetch_assoc($result_sel_name);
        $fullName = $row_sel_name['fName'].' '.$row_sel_name['lName'];
        //selecting image
        $sql_sel_img = "SELECT nameProfilePic FROM tbl_information WHERE idUser = ?";
        $stmt_sel_img = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt_sel_img, $sql_sel_img);
        mysqli_stmt_bind_param($stmt_sel_img, 'i', $row['idUser']);
        mysqli_stmt_execute($stmt_sel_img);
        $result_sel_img = mysqli_stmt_get_result($stmt_sel_img);
        $row_sel_img = mysqli_fetch_assoc($result_sel_img);
        $imagePath = $row_sel_img['nameProfilePic'];


        echo '
          <div id="container-notifications-page-frame">
            <h4>
              <img src="Pictures/'.$imagePath.'" name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')"></img>
              <i name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')">'.$fullName.'</i>'.$row['content'].'
              <span>On '.$row['dateOf'].'</span>
              <span name="_newsNotificationClickable" style="display: none;">'.$row['idUser'].'</span>
              <img src="Icons/IconOptions.png" name="_notificationsOptionsButton" class="formButton"></img>
            </h4>
          </div>
        ';
        $localId++;
      }
    }else{
      echo '<p>You have 0 notifications</p>';
    }

    echo '</div>';

    echo '<div id="overlay">
   </div>';
  }else{
    header("Location: ../index.php?error=sqlerror'.$lastId1.'-".mysqli_error($conn));
    exit();
  }


 ?>
