<?php
  require 'dbh.php';

  $id = $_POST['_userId'];
  $zero = 0;
  $notZero = 1;
  $localId = 0;
  $localIdFrequest = 0;

  echo '<div id="container-notifications-page">
    <button class="formButton" onclick="reloadPage()">Back home</button>
    <h2>Notifications</h2>
  ';

  //this script loads every notification this user has in #content area
  //before anything we load friend requests
  $sql_load_frequest = "SELECT * FROM tbl_frequests WHERE idFriend = '$id' ORDER BY dateSent DESC";
  $result_load_frequest = mysqli_query($conn, $sql_load_frequest);
  if($result_load_frequest){
    if(mysqli_num_rows($result_load_frequest) > 0){
      echo '<div id="container-notifications-page-frequest">
        <h3><i>Friend requests</i></h3>
      ';
      while($row_frequest = mysqli_fetch_assoc($result_load_frequest)){
        //selecting name
        $sql_sel_name_frequest = "SELECT fName, lName FROM tbl_users WHERE idUser = ?";
        $stmt_sel_name_frequest = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt_sel_name_frequest, $sql_sel_name_frequest);
        mysqli_stmt_bind_param($stmt_sel_name_frequest, 'i', $row_frequest['idUser']);
        mysqli_stmt_execute($stmt_sel_name_frequest);
        $result_sel_name_frequest = mysqli_stmt_get_result($stmt_sel_name_frequest);
        $row_sel_name_frequest = mysqli_fetch_assoc($result_sel_name_frequest);
        $fullName = $row_sel_name_frequest['fName'].' '.$row_sel_name_frequest['lName'];
        //selecting image
        $sql_sel_img_frequest = "SELECT nameProfilePic FROM tbl_information WHERE idUser = ?";
        $stmt_sel_img_frequest = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt_sel_img_frequest, $sql_sel_img_frequest);
        mysqli_stmt_bind_param($stmt_sel_img_frequest, 'i', $row_frequest['idUser']);
        mysqli_stmt_execute($stmt_sel_img_frequest);
        $result_sel_img_frequest = mysqli_stmt_get_result($stmt_sel_img_frequest);
        $row_sel_img_frequest = mysqli_fetch_assoc($result_sel_img_frequest);
        $imagePath = $row_sel_img_frequest['nameProfilePic'];

        echo '<div class="container-notifications-page-frame-freq">
          <span><img src="Pictures/'.$imagePath.'" name="_newsNotificationClickable" onclick="clickNewsNotification('.$localIdFrequest.')"></img><i name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')">'.$fullName.'</i> sent you a friend request.<span name="_newsNotificationClickable" style="display: none;">'.$row_frequest['idUser'].'</span></span>
          </br>
          <button class="formButtonNews" onclick="acceptFriendRequest('.$row_frequest['idReq'].', '.$localIdFrequest.')">Accept</button>
          <button class="formButtonNews" onclick="rejectFriendRequest('.$row_frequest['idReq'].', '.$localIdFrequest.')">Reject</button>
        </div>';
        $localIdFrequest++;
      }
      echo '<hr>
      </div>';
    }
  }else{
    header("Location: ../index.php?error=sqlerror'.$lastId1.'-".mysqli_error($conn));
    exit();
  }


  echo '<h4 name="_successFriendRequestFromNotifications" style="display: none;">Friend request accepted succesfully.</h4>';


  //first we load the unread Notifications
  $sql_load_unread = "SELECT * FROM tbl_notifications WHERE idUserToSee = '$id' AND isRead = '$zero' ORDER BY dateOf DESC";
  $result_load_unread = mysqli_query($conn, $sql_load_unread);
  if($result_load_unread){
    if(mysqli_num_rows($result_load_unread) > 0){

      echo '
        <div id="container-notifications-page-unread">

        <h3><i>Unread</i> - click on them to mark as read</h3>
      ';
      while($row_unread = mysqli_fetch_assoc($result_load_unread)){
        //selecting name
        $sql_sel_name_unread = "SELECT fName, lName FROM tbl_users WHERE idUser = ?";
        $stmt_sel_name_unread = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt_sel_name_unread, $sql_sel_name_unread);
        mysqli_stmt_bind_param($stmt_sel_name_unread, 'i', $row_unread['idUser']);
        mysqli_stmt_execute($stmt_sel_name_unread);
        $result_sel_name_unread = mysqli_stmt_get_result($stmt_sel_name_unread);
        $row_sel_name_unread = mysqli_fetch_assoc($result_sel_name_unread);
        $fullName = $row_sel_name_unread['fName'].' '.$row_sel_name_unread['lName'];
        //selecting image
        $sql_sel_img_unread = "SELECT nameProfilePic FROM tbl_information WHERE idUser = ?";
        $stmt_sel_img_unread = mysqli_stmt_init($conn);
        mysqli_stmt_prepare($stmt_sel_img_unread, $sql_sel_img_unread);
        mysqli_stmt_bind_param($stmt_sel_img_unread, 'i', $row_unread['idUser']);
        mysqli_stmt_execute($stmt_sel_img_unread);
        $result_sel_img_unread = mysqli_stmt_get_result($stmt_sel_img_unread);
        $row_sel_img_unread = mysqli_fetch_assoc($result_sel_img_unread);
        $imagePath = $row_sel_img_unread['nameProfilePic'];

        echo '
          <div class="container-notifications-page-frame" onclick="markNotificationAsRead('.$row_unread['idNotification'].')">
            <h4>
              <img src="Pictures/'.$imagePath.'" name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')"></img>
              <i name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')">'.$fullName.'</i>'.$row_unread['content'].'
              <span>On '.$row_unread['dateOf'].'</span>
              <span name="_newsNotificationClickable" style="display: none;">'.$row_unread['idUser'].'</span>
              <img src="Icons/IconOptions.png" name="_notificationsOptionsButton" class="formButton" onclick="deleteNotification('.$row_unread['idNotification'].')"></img>
            </h4>
          </div>
        ';
        $localId++;
      }
      echo '<hr></div>';
    }
  }else{
    header("Location: ../index.php?error=sqlerror'.$lastId1.'-".mysqli_error($conn));
    exit();
  }

  //then we load the read Notifications
  $sql_load = "SELECT * FROM tbl_notifications WHERE idUserToSee = '$id' AND isRead = '$notZero' ORDER BY dateOf DESC ";
  $result_load = mysqli_query($conn, $sql_load);
  if($result_load){

    if(mysqli_num_rows($result_load) > 0){
      echo '<div id="container-notifications-page-read">';
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
          <div class="container-notifications-page-frame">
            <h4>
              <img src="Pictures/'.$imagePath.'" name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')"></img>
              <i name="_newsNotificationClickable" onclick="clickNewsNotification('.$localId.')">'.$fullName.'</i>'.$row['content'].'
              <span>On '.$row['dateOf'].'</span>
              <span name="_newsNotificationClickable" style="display: none;">'.$row['idUser'].'</span>
              <img src="Icons/IconOptions.png" name="_notificationsOptionsButton" class="formButton" onclick="deleteNotification('.$row['idNotification'].')"></img>
            </h4>
          </div>
        ';
        $localId++;
      }
      echo '</div>';
    }else if($localId == 0){
      echo '<p>You have 0 notifications</p>';
    }




  }else{
    header("Location: ../index.php?error=sqlerror'.$lastId1.'-".mysqli_error($conn));
    exit();
  }
  echo '</div>';
  echo '<div id="overlay">
  </div>';
 ?>
