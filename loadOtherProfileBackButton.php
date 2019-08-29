<?php
  $comingFromProfilePage = $_POST['_comingFromProfilePage'];

  if($comingFromProfilePage == 1){
    echo '
      <button class="formButton" name="_goBackToProfile" onclick="toggleProfile()" style="float: left;">Back to your profile</button>
    ';
  }
 ?>
