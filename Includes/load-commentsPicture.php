<?php
  require 'dbh.php';

  $urlPic = $_POST['_urlPic'];

  $idImg = 0;

  //selecting the id of the picture
  $sql_sel = "SELECT * FROM tbl_pictures WHERE imgPath = ?";
  $stmt_sel = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt_sel, $sql_sel)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt_sel, 's', $urlPic);
    mysqli_stmt_execute($stmt_sel);
    $res = mysqli_stmt_get_result($stmt_sel);
    $row = mysqli_fetch_assoc($res);
    $idImg = $row['idPic'];
  }


  echo '
    <p>Coming soon'.$idImg.'</p>
  ';

 ?>
