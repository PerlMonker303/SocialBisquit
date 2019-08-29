<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];

  $sql0 = "SELECT * FROM tbl_posts WHERE idUser = ?";
  $stmt0 = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt0, $sql0);
  mysqli_stmt_bind_param($stmt0, 'i', $userId);

  mysqli_stmt_execute($stmt0);
  mysqli_stmt_store_result($stmt0);
  $resultCheck = mysqli_stmt_num_rows($stmt0);
  if($resultCheck > 0){
    //echo '<h3 id="profile-special-posts">Your posts:</h3>';
    //showing posts
      $sql = "SELECT * FROM tbl_posts WHERE idUser=?";
      $stmt = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt,$sql)){
        header("Location: ../index.php?error=sqlerror");
        exit();
      }else{
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        //post local id
        $localId = 1;
        $result = mysqli_stmt_get_result($stmt);
        while($row = mysqli_fetch_assoc($result)){
          //selecting userName
          $sql1 = "SELECT fName,lName FROM tbl_users WHERE idUser=?";
          $stmt1 = mysqli_stmt_init($conn);
          if(!mysqli_stmt_prepare($stmt1,$sql1)){
            exit();
          }
          mysqli_stmt_bind_param($stmt1, "i", $userId);
          mysqli_stmt_execute($stmt1);
          $result1 = mysqli_stmt_get_result($stmt1);
          if($row1 = mysqli_fetch_assoc($result1)){
            $userName = $row1['fName'].' '.$row1['lName'];
          }

          //shortening content if it is too long
          $fullText = $row['content'];
          $postId = $row['idPost'];
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
            $postImage = 'defaultImage.jpg';

          //adding the posts
          $newName = "_profilePost_".$localId;
          echo
          '<div class="container-main-frame" name="'.$newName.'">
            <div class="container-header-content">
              <img src="Icons/IconOptions.png" class="post-option-button" onclick="togglePostOptionMenu('.($localId-1).')"></img>
              <span style="display: none;" class="post-option-text" onclick="deletePostOption('.($localId-1).','.$row['idPost'].')">Delete post</span>
              <h2>'.$row['title'].'</h2>
              </br>
              <h3><img src="Pictures/'.$postImage.'"></img> <span>'.$userName.'</span> on <span>'.$row['datePosted'].'</span>
                <span style="display: none;">'.$postImage.'</span>
              </h3>


              </div>';
          $localId++;
          echo '
            <div class="container-text-content"">
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
        }
      }
  }else{
    echo '<span>There are no posts made yet.</span>';
  }

  ?>
