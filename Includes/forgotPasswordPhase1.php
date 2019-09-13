<?php
  require 'dbh.php';

  $input = $_POST['_input'];

  //checking if email exists
  $sql_check = "SELECT * FROM tbl_users WHERE email = '$input'";
  $result_check = mysqli_query($conn, $sql_check);
  if($result_check){
    $row_check = mysqli_fetch_assoc($result_check);
    if($row_check){
      //user exists
      //select his ID
      $idUser = $row_check['idUser'];
      //select the secret question
      $sql_sel = "SELECT * FROM tbl_information WHERE idUser = '$idUser'";
      $result_sel = mysqli_query($conn, $sql_sel);
      if($result_sel){
        $row_sel = mysqli_fetch_assoc($result_sel);
        if(mysqli_num_rows($result_sel)){//user has information updated
          $idSecretQuestion = $row_sel['idSecretQuestion'];

          //get the question from tbl_questions
          $sql_sel1 = "SELECT question FROM tbl_questions WHERE idQuestion = '$idSecretQuestion'";
          $result_sel1 = mysqli_query($conn, $sql_sel1);
          if($result_sel1){
            $row_sel1 = mysqli_fetch_assoc($result_sel1);
            $secretQuestion = $row_sel1['question'];

            echo '
            <h3>Don\'t worry, we\'ve got your back :)</h3>
            <span>'.$secretQuestion.'</span>
            <input type="text" class="inputArea"></input></br>
            <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(2)">Next</button>
            <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
            ';

          }else{
            header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
            exit();
          }
        }else{
          //user has yet to set his secret question
          echo '
          <h3>Don\'t worry, we\'ve got your back :)</h3>
          <span>What\'s your email address?</span>
          <input type="text" class="inputArea" value="This user has yet to set their secret question"></input></br>
          <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(1)">Next</button>
          <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
          ';
        }
      }else{
        header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
        exit();
      }



    }else{
      //user doesn't exist
      echo '
      <h3>Don\'t worry, we\'ve got your back :)</h3>
      <span>What\'s your email address?</span>
      <input type="text" class="inputArea" value="User doesn\'t exist"></input></br>
      <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(1)">Next</button>
      <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
      ';
    }
  }else{
    header("Location: ../index.php?error=sqlerror".mysqli_error($conn));
    exit();
  }


 ?>
