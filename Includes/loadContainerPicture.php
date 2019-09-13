<?php
  require 'dbh.php';

  $imgUrl = $_POST['_imgUrl'];
  $userId = $_POST['_userId'];

  $fName = '';
  $lName = '';
  $profileImgPath = '';
  $postedOn = '';

  $idPic = 0;
  $likeCount = 0;
  $commentCount = 0;
  $shareCount = 0;

  //get info about the user based on the id
  $sql_sel = 'SELECT * FROM tbl_users WHERE idUser = ?';
  $stmt_sel = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel, $sql_sel)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel, 'i', $userId);
    mysqli_stmt_execute($stmt_sel);
    $res_sel = mysqli_stmt_get_result($stmt_sel);
    $row_sel = mysqli_fetch_assoc($res_sel);
    $fName = $row_sel['fName'];
    $lName = $row_sel['lName'];
  }

  $sql_sel1 = 'SELECT * FROM tbl_information WHERE idUser = ?';
  $stmt_sel1 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel1, $sql_sel1)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel1, 'i', $userId);
    mysqli_stmt_execute($stmt_sel1);
    $res_sel1 = mysqli_stmt_get_result($stmt_sel1);
    $row_sel1 = mysqli_fetch_assoc($res_sel1);
    $profileImgPath = $row_sel1['nameProfilePic'];
  }

  $sql_sel2 = 'SELECT * FROM tbl_pictures WHERE imgPath = ?';
  $stmt_sel2 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel2, $sql_sel2)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel2, 'i', $imgUrl);
    mysqli_stmt_execute($stmt_sel2);
    $res_sel2 = mysqli_stmt_get_result($stmt_sel2);
    $row_sel2 = mysqli_fetch_assoc($res_sel2);
    $postedOn = $row_sel2['addedOn'];
    $idPic = $row_sel2['idPic'];
  }

  $sql_sel3 = 'SELECT * FROM tbl_likes_pictures WHERE idPic = ?';
  $stmt_sel3 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel3, $sql_sel3)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel3, 'i', $idPic);
    mysqli_stmt_execute($stmt_sel3);
    mysqli_stmt_store_result($stmt_sel3);
    $likeCount = mysqli_stmt_num_rows($stmt_sel3);

  }

  //getting number of comments
  $sql_sel4 = 'SELECT * FROM tbl_comments_pictures WHERE idPic = ?';
  $stmt_sel4 = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel4, $sql_sel4)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel4, 'i', $idPic);
    mysqli_stmt_execute($stmt_sel4);
    mysqli_stmt_store_result($stmt_sel4);
    $commentCount = mysqli_stmt_num_rows($stmt_sel4);
  }
  //header("Location: ../?error=".$idPic);
  echo '
    <button class="formButton" onclick="togglePictureContainer()">Close</button>

    <div id="container-picture-right-info">
      <h2><img src=\''.$profileImgPath.'\'></img>'.$fName.' '.$lName.'
        <span>on '.date('d-m-Y', strtotime($postedOn)).'</span>
      </h2>
      <div id="container-picture-info-section">
        <h5 class=\'_likedListPicture\'>Likes:</h5><span name=\'_likeCountPic\' class=\'_likedListPicture\'>'.$likeCount.'</span>
        <h5>Comments:</h5><span name=\'_commentCountPic\'>nd</span>
        <h5>Shares:</h5><span name=\'_shareCountPic\'>nd</span>
      </div>
    </div>
    <div id="container-liked-picture-list">
      <table>
        <tr><td>Loading</td></tr>
      </table>
    </div>
    <div id="container-picture-right-bar">
      <div id="container-picture-right-bar-like">
        <img src=\'Icons/IconLike.png\'></img>
        <h4>Like</h4>
      </div>
      <div id="container-picture-right-bar-comment">
        <img src=\'Icons/IconComment.png\'></img>
        <h4>Comment</h4>
      </div>
      <div id="container-picture-right-bar-share">
        <img src=\'Icons/IconShare.png\'></img>
        <h4>Share</h4>
      </div>
    </div>

    <h4 name="_newLikeSuccessPicture">Picture liked succesfully.</h4>
    <h4 name="_newCommentSuccessPicture">Comment added succesfully.</h4>
    <h4 name="_newShareSuccessPicture">Picture shared succesfully.</h4>

    <div id="container-add-comment-picture">
      <hr>
      <h3>Add a comment to this picture</h3>
      <textarea class="inputArea" name="_newCommentContentPicture"></textarea>
      <h5 name="_newCommentErrorPicture">You can\'t add an empty comment.</h5>

      <div id="container-add-comment-buttons">
        <button class="formButton" name="post-comment-picture">Post</button>
        <button class="formButton" name="reset-comment-picture">Reset</button>
      </div>
    </div>
    <div id="container-add-share-picture">
      <hr>
      <h3>Share this picture with your own message</h3>
      <textarea class="inputArea" name="_newShareContentPicture"></textarea>
      <h5 name="_newShareErrorPicture">You can\'t add an empty message.</h5>

      <div id="container-add-share-buttons">
        <button class="formButton" name="post-share-picture">Post</button>
        <button class="formButton" name="reset-share-picture">Reset</button>
      </div>
    </div>
    <h2>Comments ('.$commentCount.')</h2>
    <div id="container-picture-right-comments">

    </div>
  ';

 ?>
