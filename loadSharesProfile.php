<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  //selecting all shares for current user
  $sql0 = "SELECT * FROM tbl_shares WHERE idUser = ?";
  $stmt0 = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt0, $sql0);
  mysqli_stmt_bind_param($stmt0, 'i', $userId);
  mysqli_stmt_execute($stmt0);
  $result0 = mysqli_stmt_get_result($stmt0);
  if(mysqli_num_rows($result0) > 0){
    //echo '<h3 id="profile-special-posts">Your shares:</h3>';
    //showing shares
    $localId = 1;
    while($row0 = mysqli_fetch_assoc($result0)){
      $sql1 = "SELECT * FROM tbl_posts WHERE idPost=?";
      $stmt1 = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt1,$sql1);
      mysqli_stmt_bind_param($stmt1, "i", $row0['idPost']);
      mysqli_stmt_execute($stmt1);
      $result1 = mysqli_stmt_get_result($stmt1);
      $row1 = mysqli_fetch_assoc($result1);

      //getting user info
      $sql2 = "SELECT * FROM tbl_users WHERE idUser=?";
      $stmt2 = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt2,$sql2);
      mysqli_stmt_bind_param($stmt2, "i", $userId);
      mysqli_stmt_execute($stmt2);
      $result2 = mysqli_stmt_get_result($stmt2);
      $row2 = mysqli_fetch_assoc($result2);

      $fullText = $row1['content'];
      //check whats happening here
      $postId = $row1['idPost'];
      if(strlen($row1['content'])>250){
        $row1['content'] = substr($row1['content'],0,250)."...";
      }

      $userName = $row2['fName'].' '.$row2['lName'];

      //selecting profile pic for post user from tbl_information
      $sql_img = "SELECT nameProfilePic FROM tbl_information WHERE idUser=?";
      $stmt_img = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt_img, $sql_img);
      mysqli_stmt_bind_param($stmt_img, "i", $userId);
      mysqli_stmt_execute($stmt_img);
      $result_img = mysqli_stmt_get_result($stmt_img);
      $row_img = mysqli_fetch_assoc($result_img);
      $postImage = $row_img['nameProfilePic'];
      if(!$postImage)
        $postImage = 'defaultImage.jpg';

      //adding the shares
      $newName = "_profileShare_".$localId;
      //add share content

      echo '<div class="container-main-frame-shares" name="'.$newName.'">
        <div class="container-share-frame">
          <h3>Shared: '.$row0['content'].'</h3>
        </div>
        <div class="container-header-content">
        <img src="Icons/IconOptions.png" class="share-option-button" onclick="toggleShareOptionMenu('.($localId-1).')"></img>
        <span style="display: none;" class="share-option-text" onclick="deleteShareOption('.($localId-1).','.$row0['idShare'].')">Delete share</span>
          <h2>'.$row1['title'].'</h2>
          </br>
          <h3><img src="Pictures/'.$postImage.'"></img> <span>'.$userName.'</span> on <span>'.$row1['datePosted'].'</span></h3>
          <span style="display: none;">'.$postImage.'</span>
          </div>';
      $localId++;
      echo '
        <div class="container-text-content"">
          <p>'.$row1['content'].'</p>
          <p style="display: none;">'.$fullText.'</p>
          <p style="display: none;">'.$row1['idPost'].'</p>
        </div>
      ';
      echo '
        <div class="container-text-readmore">
          <p onclick="toggleFullContainer(\''.$newName.'\')">Read More...</p>
        </div>
      </div>';
    }
  }else{
    echo '<span>There are no shares made yet.</span>';
  }

  ?>
