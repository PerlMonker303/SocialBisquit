<?php
//this function is called upon showing the full container for a selected post
//it will update the like button changing its text so that the user knows if
//he has already liked this post or not
//so basically this is a script used to change a span element using 2 parameters passed with jquery.load

  require 'dbh.php';

  $postId = $_POST['_postId'];
  $userId = $_POST['_userId'];

  //selecting data
  $sql_sel = "SELECT * FROM tbl_likes WHERE idPost=? AND idUser=?";
  $stmt_sel = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_sel, $sql_sel);
  mysqli_stmt_bind_param($stmt_sel, "ii", $postId, $userId);
  mysqli_stmt_execute($stmt_sel);
  $result_sel = mysqli_stmt_get_result($stmt_sel);
  //actual loading
  if(mysqli_num_rows($result_sel)>0){
    echo '<h4 name="_checkCurrentUserLogged">Liked</h4>';
  }else{
    echo '<h4 name="_checkCurrentUserLogged">Like</h4>';
  }




 ?>
