<?php
  require 'dbh.php';

  $input = $_POST['_input'];
  $email = $_POST['_email'];
  $password = $_POST['_password'];
  $passwordCheck = $_POST['_passwordCheck'];

  //first we check if the passwords match
  if($password == $passwordCheck){
    //selecting the id of the user whose password is going to change
    $sql_sel = "SELECT idUser FROM tbl_users WHERE email = '$email'";
    $result_sel = mysqli_query($conn, $sql_sel);
    if($result_sel){
      $row_sel = mysqli_fetch_assoc($result_sel);
      $idUser = $row_sel['idUser'];

      //update new password
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
      $sql_upd = "UPDATE tbl_users SET password = '$hashedPassword' WHERE idUser = '$idUser'";
      if(mysqli_query($conn, $sql_upd)){

        echo '<h2>Success</h2>';
      }else{
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }
    }else{
      header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
      exit();
    }
  }else{
    echo '
    <h3>Don\'t worry, we\'ve got your back :)</h3>
    <span>What\'s your email address?</span>
    <input type="text" class="inputArea" value="Passwords do not match"></input></br>
    <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(1)">Next</button>
    <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
    ';
  }
 ?>
