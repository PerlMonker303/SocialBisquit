<?php
  require 'dbh.php';

  $postId = $_POST['_postId'];

  $sql_sel = "SELECT * FROM tbl_likes WHERE idPost=?";
  $stmt_sel = mysqli_stmt_init($conn);
  mysqli_stmt_prepare($stmt_sel,$sql_sel);
  mysqli_stmt_bind_param($stmt_sel, "i", $postId);
  mysqli_stmt_execute($stmt_sel);
  $result_sel = mysqli_stmt_get_result($stmt_sel);

  if(mysqli_num_rows($result_sel)>0){
    echo '
      <table>
        <tbody>';

    while($row = mysqli_fetch_assoc($result_sel)){
      //selecting the user
      $sql_sel1 = "SELECT * FROM tbl_users WHERE idUser=?";
      $stmt_sel1 = mysqli_stmt_init($conn);
      mysqli_stmt_prepare($stmt_sel1,$sql_sel1);
      mysqli_stmt_bind_param($stmt_sel1, "i", $row['idUser']);
      mysqli_stmt_execute($stmt_sel1);
      $result_sel1 = mysqli_stmt_get_result($stmt_sel1);
      $row1 = mysqli_fetch_assoc($result_sel1);
      echo '<tr><td>'.$row1['fName'].' '.$row1['lName'].'</td></tr>';
    }
    echo '
        </tbody>
      </table>
    ';
  }else{
    echo 'Be the first one to like it';
  }

 ?>
