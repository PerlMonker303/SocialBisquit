<?php
  require 'dbh.php';

  //just load the following container

  echo '
  <h3>Don\'t worry, we\'ve got your back :)</h3>
  <span>Confirm the new password</span>
  <input type="password" class="inputArea"></input></br>
  <button class="formButton" name=\'_forgotNextButton\' onclick="forgotPasswordFunction(4)">Next</button>
  <span name=\'_successMessageForgotPassword\' style="display: none;">You can\'t leave a field empty.</span>
  ';
 ?>
