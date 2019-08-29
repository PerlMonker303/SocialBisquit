<?php
  require 'dbh.php';

  $commentNewCount = $_POST['commentNewCount'];
  $commentsPostId = $_POST['commentPostId'];

  //echo $commentNewCount;

  echo '<span name="secret-post-id">'.$commentsPostId.'</span>';

  $sql = "SELECT * FROM tbl_comments WHERE idPost=? ORDER BY datePosted DESC";
  $stmt = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt,$sql);
  mysqli_stmt_bind_param($stmt, "i", $commentsPostId);
  mysqli_stmt_execute($stmt);
  $result = mysqli_stmt_get_result($stmt);
  if(mysqli_num_rows($result)>0){
    $userName = "";
    $currentIndex = 0;
    while($row = mysqli_fetch_assoc($result)){
      if($currentIndex < $commentNewCount){
        $currentIndex++;
        //selecting user name by the id
        $userIdComment = $row['idUser'];
        $sql1 = "SELECT * FROM tbl_users WHERE idUser=$userIdComment";
        $result1 = mysqli_query($conn,$sql1);
        $row1 = mysqli_fetch_assoc($result1);
        $userName = $row1['fName']." ".$row1['lName'];

        $sql2 = "SELECT * FROM tbl_information WHERE idUser=$userIdComment";
        $result2 = mysqli_query($conn,$sql2);
        $row2 = mysqli_fetch_assoc($result2);
        $profileImagePath = $row2['nameProfilePic'];
        if($profileImagePath == "")
          $profileImagePath = "defaultImage.jpg";
        echo '
        <div class="container-comment">
          <div class="comment-header">
            <img src="Pictures/'.$profileImagePath.'"></img>
            <h4>'.$userName.'</h4>
            <h5> on '.$row['datePosted'].'</h5>
          </div>
          <div class="comment-content">
            <p>'.$row['content'].'</p>
          </div>
          <div class="comment-bar">
            <div name="comment-bar-like">
              <img src="Icons/IconLike.png"></img>
              <h4>Like</h4>
            </div>
            <div name="comment-bar-comment">
              <img src="Icons/IconComment.png"></img>
              <h4>Comment</h4>
            </div>
            <div name="comment-bar-report">
              <img src="Icons/IconReport.png"></img>
              <h4>Report</h4>
            </div>
          </div>
        </div>';
      }
    }
    if($currentIndex < mysqli_num_rows($result))
      echo '<button class="formButton" id="show-more-comments" onclick="loadComments()">Show more comments</button>';
  }else{
    echo '<p>Be the first to comment on this post.</p>';
  }
 ?>
