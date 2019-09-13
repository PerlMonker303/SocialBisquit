<?php
  require 'dbh.php';

  $userId = $_POST['_userId'];
  $postId = $_POST['_postId'];

  echo '

    <div id="container-full-exit-button">
      <button class="formButton" onclick="toggleFullContainer()">Close</button>
    </div>
    <div id="container-full-header-content">
      <h1>Article title</h1>
      <h3>By</h3>
      <img src="" onclick="openAProfile('.$userId.')"></img>
      <h3 onclick="openAProfile('.$userId.')">Author title</h3>
      <h4>Published on -date-</h4>
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
      <p> Article content
      </p>
      <p style="display: none;"></p>
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

        <span name="secret-post-id">.$global_post_id.</span>

    </div>

  ';
?>
