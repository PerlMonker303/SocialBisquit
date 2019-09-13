<?php
  require 'dbh.php';

  $postId = $_POST['_idPost'];
  $userId = "";

  $articleTitle = "";
  $imagePath = "";
  $authorName = "";
  $datePublished = "";
  $content = "";
  $likeCount = "";
  $commentCount = "";
  $shareCount = "";

  //post
  $sql_sel1 = "SELECT * FROM tbl_posts WHERE idPost = '$postId'";
  $result_sel1 = mysqli_query($conn, $sql_sel1);
  if($result_sel1){
    $row1 = mysqli_fetch_assoc($result_sel1);
    $articleTitle = $row1['title'];
    $userId = $row1['idUser'];
    $datePublished = $row1['datePosted'];
    $newDate = date('d-m-Y', strtotime($datePublished));
    $content = $row1['content'];

    //users
    $sql_sel2 = "SELECT * FROM tbl_users WHERE idUser = '$userId'";
    $result_sel2 = mysqli_query($conn, $sql_sel2);
    if($result_sel2){
      $row2 = mysqli_fetch_assoc($result_sel2);
      $authorName = $row2['fName'].' '.$row2['lName'];

      //information
      $sql_sel3 = "SELECT * FROM tbl_information WHERE idUser = '$userId'";
      $result_sel3 = mysqli_query($conn, $sql_sel3);
      if($result_sel3){
        $row3 = mysqli_fetch_assoc($result_sel3);
        $imagePath = $row3['nameProfilePic'];


      }else{
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
    }else{
      header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
      exit();
    }
  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }

  echo '

    <div id="container-full-exit-button">
      <button class="formButton" onclick="toggleFullContainer()">Close</button>
    </div>
    <div id="container-full-header-content">
      <h1>'.$articleTitle.'</h1>
      <h3>By</h3>
      <img src="'.$imagePath.'" onclick="openAProfile('.$userId.')"></img>
      <h3 onclick="openAProfile('.$userId.')">'.$authorName.'</h3>
      <h4>Published on '.$newDate.'</h4>
      <span name="_authorOfPost" style="display: none;">'.$userId.'</span>
    </div>
    <div id="container-full-header-bar">
      <h5 class="_likedList">Likes:</h5>
      <span name="_likeCount" class="_likedList"></span>
      <h5>Comments:</h5>
      <span name="_commentCount"></span>
      <h5>Shares:</h5>
      <span name="_shareCount"></span>
    </div>
    <div id="container-full-text-content">
      <p> '.$content.'
      </p>
      <p style="display: none;">'.$postId.'</p>
    </div>

    <div id="container-liked-list">
      <table>
        <tr><td>Loading</td></tr>
      </table>
    </div>

    <form id="container-full-bar-content" method="post" action="like.php">
      <div name="container-full-bar-content-like">
        <img src="Icons/IconLike.png" name="post-like"></img>
        <div name="_checkCurrentUserLoggedOuter"><h4 name="_checkCurrentUserLogged">Like</h4></div>
      </div>
      <div name="container-full-bar-content-comment">
        <img src="Icons/IconComment.png"></img>
        <h4>Comment</h4>
      </div>
      <div name="container-full-bar-content-share">
        <img src="Icons/IconShare.png"></img>
        <h4>Share</h4>
      </div>
    </form>

    <hr>
    <h4 name="_newLikeSuccess">Post liked succesfully.</h4>
    <h4 name="_newCommentSuccess">Comment added succesfully.</h4>
    <h4 name="_newShareSuccess">Post shared succesfully.</h4>

    <form id="container-add-comment" src="Includes/comment.php" method="post">
      <h3>Add a comment to this post</h3>
      <textarea class="inputArea" name="_newCommentContent"></textarea>
      <h5 name="_newCommentError">You can\'t add an empty comment.</h5>

          <input style="display: none;" name="_loggedUserId" value="'.$userId.'"></input>
          <input style="display: none;" name="_selectedPostId" value="'.$postId.'"></input>

      <div id="container-add-comment-buttons">
        <button class="formButton" type="submit" name="post-comment">Post</button>
        <input class="formButton" type="button" onclick="resetComment()" value="Reset"></input>
      </div>

    </form>

    <form id="container-add-share" src="Includes/share.php" method="post">
      <h3>Share this post with your own message</h3>
      <textarea class="inputArea" name="_newShareContent"></textarea>
      <div id="container-add-share-buttons">
        <button class="formButton" type="submit" name="post-share">Share</button>
        <input class="formButton" type="button" onclick="resetShare()" value="Reset"></input>
      </div>
    </form>

    <h2>Comments (<span name="_commentCount"></span>)</h2>
    <div id="container-full-comment-section" >

        <span name="secret-post-id">'.$postId.'</span>

    </div>

  ';

  //you want to load the full container based on notification information
 ?>
