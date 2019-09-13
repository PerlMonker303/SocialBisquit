<?php

  require 'dbh.php';
  //load this page only if the account is not private

  $idUser = $_POST['_userId'];

  $sql = "SELECT * FROM tbl_information WHERE idUser = ?";
  $stmt = mysqli_stmt_init($conn);
  if(!mysqli_stmt_prepare($stmt, $sql)){
    header("Location: ../index.php?error=sqlerror");
    exit();
  }else{
    mysqli_stmt_bind_param($stmt, 'i', $idUser);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if($row = mysqli_fetch_assoc($result)){
      echo '<div id="settings-menu-left-pane">
        <div class="settings-menu-left-option" name="_settingsMenuOption1">
          <span>Account</span>

        </div>
        <div class="settings-menu-left-option" name="_settingsMenuOption2">
          <span>Profile</span>
        </div>
      </div>
      <div id="settings-main-outer-pane">
        <div id="settings-main-inner-pane">

        </div>
      </div>
      ';
    }else{
      echo '
        <h2>Setup your account first</h2>
      ';
    }
  }


 ?>
