<?php
  require 'dbh.php';

  $input = $_POST['_input'];
  $email = $_POST['_email'];

  //taking the id
  $sql_sel = "SELECT * FROM tbl_users WHERE email = '$email'";
  $result_sel = mysqli_query($conn, $sql_sel);
  if($result_sel)
  {
    $row_sel = mysqli_fetch_assoc($result_sel);
    $idUser = $row_sel['idUser'];

    //sel information to validate the answer
    $sql_sel1 = "SELECT secretAnswer FROM tbl_information WHERE idUser = ?";
    $stmt_sel1 = mysqli_stmt_init($conn);
    if(!mysqli_stmt_prepare($stmt_sel1, $sql_sel1)){
      header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
      exit();
    }else{
      mysqli_stmt_bind_param($stmt_sel1, 'i', $idUser);
      mysqli_stmt_execute($stmt_sel1);
      $result_sel1 = mysqli_stmt_get_result($stmt_sel1);
      if($row_sel1 = mysqli_fetch_assoc($result_sel1)){
        $answerCheck = password_verify($input, $row_sel1['secretAnswer']);

        if($answerCheck){
          //alright
          echo '
          <h3>Don\'t worry, we\'ve got your back :)</h3>
          <span>Enter a new password:</span>
          <input type="password" class="inputArea"></input></br>
          <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(3)">Next</button>
          <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
          ';
        }else{
          //wrong answer
          echo '
          <h3>Don\'t worry, we\'ve got your back :)</h3>
          <span>What\'s your email address?</span>
          <input type="text" class="inputArea" value="Wrong answer"></input></br>
          <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(1)">Next</button>
          <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
          ';
        }
      }
    }

  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }
?>
