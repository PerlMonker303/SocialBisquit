<?php
  require 'dbh.php';

  $postId = $_POST['_postId'];

  //selecting the id of the user that posted the article
  $sql_sel = "SELECT * FROM tbl_posts WHERE idPost = ?";
  $stmt_sel = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_sel, $sql_sel);
  mysqli_stmt_bind_param($stmt_sel, 'i', $postId);
  mysqli_stmt_execute($stmt_sel);
  $result = mysqli_stmt_get_result($stmt_sel);
  $row = mysqli_fetch_assoc($result);

  echo '
  <h1>Article title</h1>
  <h3>By</h3>
  <img src="" onclick="openAProfile('.$row['idUser'].')"></img>
  <h3 onclick="openAProfile('.$row['idUser'].')">Author title</h3>
  <h4>Published on -date-</h4>
  <span name="_authorOfPost" style="display: none;">'.$row['idUser'].'</span>
  ';

 ?>
