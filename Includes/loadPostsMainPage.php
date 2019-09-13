<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];

  $sql = "SELECT * FROM tbl_posts";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt,$sql)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    //post local id
    $localId = 1;
    while($row = mysqli_fetch_assoc($result)){
      //selecting userName
      //first from the tbl_users
      $sql1 = "SELECT fName,lName FROM tbl_users WHERE idUser=?";
      $stmt1 = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt1,$sql1)){
        exit();
      }
      mysqli_stmt_bind_param($stmt1, "i", $row['idUser']);
      mysqli_stmt_execute($stmt1);
      $result1 = mysqli_stmt_get_result($stmt1);
      if($row1 = mysqli_fetch_assoc($result1)){
        $userName = $row1['fName'].' '.$row1['lName'];
      }
      $fullText = $row['content'];
      $postId = $row['idPost'];
      $global_post_id = $postId;
      //shortening content if it is too long
      if(strlen($row['content'])>250){
        $row['content'] = substr($row['content'],0,250)."...";
      }

      //selecting profile pic for post user from tbl_information
      $sql2 = "SELECT nameProfilePic FROM tbl_information WHERE idUser=?";
      $stmt2 = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt2, $sql2);
      mysqli_stmt_bind_param($stmt2, "i", $row['idUser']);
      mysqli_stmt_execute($stmt2);
      $result2 = mysqli_stmt_get_result($stmt2);
      $row2 = mysqli_fetch_assoc($result2);
      $postImage = $row2['nameProfilePic'];
      if(!$postImage)
        $postImage = 'https://res.cloudinary.com/hgfmqcnjc/image/upload/v1567858286/defaultImage_t3bfth.jpg';

      //adding the posts
      $newName = "local_".$localId;
      $datePosted = $row['datePosted'];
      $newDate = date('d-m-Y', strtotime($datePosted));
      echo
      '<div class="container-main-frame" name="'.$newName.'">
        <div class="container-header-content">
          <h2>'.$row['title'].'</h2>
          <h3><img src="'.$postImage.'" onclick="openAProfile(\''.$row['idUser'].'\')"></img> <span onclick="openAProfile(\''.$row['idUser'].'\')">'.$userName.'</span> on <span>'.$newDate.'</span>
            <span style="display: none;">'.$postImage.'</span>
          </h3>

          </div>';
      echo '
        <div class="container-text-content">
          <p>'.$row['content'].'</p>
          <p style="display: none;">'.$fullText.'</p>
          <p style="display: none;">'.$postId.'</p>
        </div>
      ';
      echo '
        <div class="container-text-readmore">
          <p onclick="toggleFullContainer(\''.$newName.'\')">Read More...</p>
        </div>
      </div>';
      $localId++;
    }

    echo '<div id="overlay">
   </div>';
  }
 ?>
