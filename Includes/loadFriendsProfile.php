<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];

  $sql = "SELECT * FROM tbl_contacts WHERE idUser=?";
  $stmt = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt,$sql);
  mysqli_stmt_bind_param($stmt, 'i', $userId);

  mysqli_stmt_execute($stmt);
  $resultContact = mysqli_stmt_get_result($stmt);
  $hasFriends = 0;
  $localFriendNumber = 1;
  while($rowContact = mysqli_fetch_assoc($resultContact)){
    $hasFriends = 1;
    //select data about the friend
    $sql_friend = "SELECT * FROM tbl_users WHERE idUser=?";
    $stmt_friend = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt_friend,$sql_friend);
    mysqli_stmt_bind_param($stmt_friend, 'i', $rowContact['idFriend']);
    mysqli_stmt_execute($stmt_friend);
    $resultFriend = mysqli_stmt_get_result($stmt_friend);
    $rowFriend = mysqli_fetch_assoc($resultFriend);
    $contactFName = $rowFriend['fName'];
    $contactLName = $rowFriend['lName'];
    //getting the image path
    $sql_info = "SELECT * FROM tbl_information WHERE idUser=?";
    $stmt_info = mysqli_stmt_init($conn);
    mysqli_stmt_prepare($stmt_info,$sql_info);
    mysqli_stmt_bind_param($stmt_info, 'i', $rowContact['idFriend']);
    mysqli_stmt_execute($stmt_info);
    $resultInfo = mysqli_stmt_get_result($stmt_info);
    $rowInfo = mysqli_fetch_assoc($resultInfo);
    $contactImgPath = $rowInfo['nameProfilePic'];
    //showing friends list-make it in index.php first and then here
    $from = 'friendlist';
    echo '
      <div class="container-friend" onclick="openAProfile('.$rowContact['idFriend'].',\''.$from.'\')">
        <p><img src="'.$contactImgPath.'"></img> <span>'.$contactFName.'</span> <span>'.$contactLName.'</span></p>
        <span name="_testId" style="display: none;">'.$rowContact['idFriend'].'</span>
      </div>
    ';
  }

  if($hasFriends==0){
    //echo '
      //<h2>No friends?<br>Find some <em>here</em></h2>
    //';
    echo '<h2>This contact list is currently <em>empty</em>.</h2>';
  }

 ?>
