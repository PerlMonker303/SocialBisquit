<?php
  session_start();
  require 'Includes/dbh.php';

  $global_post_id = 1;
?>
<html>
<head>
<title>Social Bisquit</title>
<script
  src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript">
</script>
<script src="Scripts/indexJS.js" type="text/javascript"></script>
<script src="Scripts/profileJS.js" type="text/javascript"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<link rel="stylesheet" href="Style/indexCSS.css" type="text/css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<meta name="description" content="This is full-out social networking platform that mimics facebook and social dating websites, providing users with an ad-free environment.">
</head>
<body onload="loadFunction()">


<div class="topBanner">
  <div class="topBanner-left">
    <h1 onclick="reloadPage()"><img src="Icons/IconHome.png" name="_homeIcon"></img> Home</h1>
    <?php
      if(isset($_SESSION['userId'])){
        echo '<h1 onclick="toggleForm()">Publish</h1>';
      }
    ?>
  </div>

  <form class="topBanner-right" action="Includes/logout.php">
    <?php
      if(isset($_SESSION['userId'])){
        echo '<h1 name="_toggleNews">News<span name="_newNewsCounter" style="display: none;"><span>37</span></span></h1>
        <h1 name="_toggleProfile">Profile</h1>
        <div>
        <input type="submit" value="Log out" class="formButton" name="_logoutButton" onclick="logoutFunction()"></input>
        </div>';
      }else{
        echo '<h1 onclick="toggleLoginContainer()">Log in</h1>
        <h1 onclick="toggleSignupContainer()">Sign up</h1>';
      }
     ?>
  </form>
</div>




<div id="tools">
  <?php
  if(session_status() == PHP_SESSION_NONE)//error here
   echo '<div id="_secretUserId" style="display: none;">'.$_SESSION['userId'].'</div>';
  ?>

  <form action="Includes/publish.php" method="post" id="container-form-main" style="display: none;">
    <h2>What's on your mind?</h2>
    <div id="container-form-wrapper">
      <div id="container-form-title">
        <p>Article title:</p>
        <input type="text" class="inputArea" name="_titleName" required maxlength="70"></input>

        <!--<p>Author name:</p>
        <?php
          $userName = $_SESSION['userFName']." ".$_SESSION['userLName'];
          echo '<input type="text" class="inputArea" name="_authorName" required maxlength="45" disabled
          value = "'.$userName.'"></input>';
        ?>-->
      </div>
      <div id="container-form-text">
        <p>Content - keep it simple and on point</p>
        <textarea class="inputArea" name="_textName" required></textarea>
      </div>
  </div>
    <div id="container-form-buttons">
      <!--I removed onclick="addContainer()" from the button down below because it is giving me 2 errors
      If you manage to make it work without it, just delete this comment and I guess the whole addContainer() function as well-->
      <button type="submit" class="formButton" name="article-submit">Publish</button>
      <input name="article-submit" class="formButton" onclick="cancelArticle()" type="button" value="Cancel"></input>
    </div>
  </form>
    <?php
      //error handling
      if(isset($_GET['error'])){
        echo '<div id="container-notification-frame" style="display: block;">';
        if($_GET['error'] == "emptyfields"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">Please fill all fields.</p>';
        }else if($_GET['error'] == "l_noemail"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The email format is wrong. Try again.</p>';
        }else if($_GET['error'] == "l_nouser"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">There is no user to correspond. Try again.</p>';
        }else if($_GET['error'] == "sqlerror"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">Sql error.</p>';
        }else if($_GET['error'] == "l_wrongpassword" || $_GET['error'] == "l_noemail"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">Wrong data. Try again.</p>';
        }else if($_GET['error'] == "l_success"){
          echo '<h2 id="container-notification-title">Welcome back</h2>
          <p id="container-notificatiion-content">You have succesfully logged in.</p>';
        }else if($_GET['error'] == "l_blockeduser"){
          echo '<h2 id="container-notification-title">Access forbidden</h2>
          <p id="container-notificatiion-content">This account has been blocked.</p>';
        }else if($_GET['error'] == "sgn_success"){
          echo '<h2 id="container-notification-title">Success</h2>
          <p id="container-notificatiion-content">You have succesfully registered.</p>';
        }else if($_GET['error'] == "lo_success"){
          echo '<h2 id="container-notification-title">Goodbye</h2>
          <p id="container-notificatiion-content">You have succesfully logged out.</p>';
        }else if($_GET['error'] == "upd_success"){
          echo '<h2 id="container-notification-title">Success</h2>
          <p id="container-notificatiion-content">You have succesfully updated your profile.</p>';
        }else if($_GET['error'] == "post_success"){
          echo '<h2 id="container-notification-title">Success</h2>
          <p id="container-notificatiion-content">Your article has been added to the website.</p>';
        }else if($_GET['error'] == "comm_success"){
          echo '<h2 id="container-notification-title">Success</h2>
          <p id="container-notificatiion-content">Your comment has been added to this post.</p>';
        }else if($_GET['error'] == "feedback_success"){
          echo '<h2 id="container-notification-title">Thank you</h2>
          <p id="container-notificatiion-content">Your feedback has been registered.</p>';
        }else if($_GET['error'] == "passwordcheck"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The passwords do not match. Try again.</p>';
        }else if($_GET['error'] == "invalidemailnames"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The name and email format are wrong. Try again.</p>';
        }else if($_GET['error'] == "invalidlname"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The last name format is wrong. Try again.</p>';
        }else if($_GET['error'] == "invalidemail"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The email format is wrong. Try again.</p>';
        }else if($_GET['error'] == "emailtaken"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The email is taken. Try another one.</p>';
        }else if($_GET['error'] == "fileProfilePicWrongFormat"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">Choose a valid picture.</p>';
        }else if($_GET['error'] == "fileProfilePicSize"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The picture exceeds the maximum file size.</p>';
        }else if($_GET['error'] == "fileProfilePicFailedUpload"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The picture has failed to upload to the database.</p>';
        }else if($_GET['error'] == "wrongDate"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">The chosen birth date must be a past date (before today).</p>';
        }else if($_GET['error'] == "wrongLength"){
          echo '<h2 id="container-notification-title">Error</h2>
          <p id="container-notificatiion-content">Some inputs are too long.</p>';
        }
        echo '</div>';
      }
     ?>
  <form id="container-login-frame" action="Includes/login.php" method="post">
    <div class="container-logsign-title">
      <h3>Log in with an existing account</h3>
    </div>
    <div class="container-logsign-input">
      <table>
        <tr>
          <td><span>Email:</span></td>
          <td><input type="text" name="_loginEmail" class="inputArea" required maxlength="40"></input></td>
        </tr>
        <tr>
          <td><span>Password:</span></td>
          <td><input type="password" name="_loginPass" class="inputArea" required maxlength="40"></input></td>
        </tr>
      </table>
    </div>
    <div class="container-logsign-buttons">
      <button class="formButton" onclick="toggleLoginContainer()">Cancel</button>
      <button type="submit" class="formButton" name="login-submit" onclick="loginFunction()">Log in</button>
    </div>
    <span name='_forgotPasswordButton'>I forgot my password</span>
  </form>
  <div id="container-forgotPassword-frame">
    <h3>Don't worry, we've got your back :)</h3>
    <span>What's your email address?</span>
    <input type="text" class="inputArea"></input></br>
    <button class="formButton" id='_forgotNextButton' onclick="forgotPasswordFunction(1)">Next</button>
    <span id='_successMessageForgotPassword' style="display: none;">You can't leave a field empty.</span>
  </div>

  <form id="container-signup-frame" action="Includes/signup.php" method="post">
    <div class="container-logsign-title">
      <h3>Create a new account down below</h3>
    </div>
    <div class="container-logsign-input">
      <table>
        <tr>
          <td><span>Email:</span></td>
          <td><input type="text" name="_signupEmail" class="inputArea"></input></td>
        </tr>
        <tr>
          <td><span>First-Name:</span></td>
          <td><input type="text" name="_signupFName" class="inputArea"></input></td>
        </tr>
        <tr>
          <td><span>Last-Name:</span></td>
          <td><input type="text" name="_signupLName" class="inputArea"></input></td>
        </tr>
        <tr>
          <td><span>Password:</span></td>
          <td><input type="password" name="_signupPass" class="inputArea"></input></td>
        </tr>
        <tr>
          <td><span>Re-Password:</span></td>
          <td><input type="password" name="_signupRePass" class="inputArea"></input></td>
        </tr>
      </table>
    </div>
    <div class="container-logsign-buttons">
      <button class="formButton" onclick="toggleSignupContainer()">Cancel</button>
      <button type="submit" class="formButton" name="signup-submit" onclick="registerFunction()">Register</button>
    </div>
  </form>


  <div id="container-profile-frame">
    <div id="container-profile-exit">
      <button class="formButton" name="_toggleProfile">Close</button>
    </div>
    <div id="container-profile-picture">
      <?php
        $sql = "SELECT * FROM tbl_information WHERE idUser=?";
        $stmt = mysqli_stmt_init($conn);
        if(!mysqli_stmt_prepare($stmt, $sql)){
          exit();
        }else{
          mysqli_stmt_bind_param($stmt, 'i', $_SESSION['userId']);
          mysqli_stmt_execute($stmt);


          $resultCheck = mysqli_stmt_get_result($stmt);
          $rowCheck = mysqli_fetch_assoc($resultCheck);

          if(($rowCheck['secretAnswer'] && $rowCheck['secretAnswer'] == 'empty') || !$rowCheck['secretAnswer']){
            echo '<img src="https://res.cloudinary.com/hgfmqcnjc/image/upload/v1567858286/defaultImage_t3bfth.jpg"></img>';
          }else{
            $imagePath = $rowCheck['nameProfilePic'];
            echo '<img src="'.$imagePath.'"></img>
            <div id="container-profile-picture-option">
              <span>Change picture</span>
              <input name="_changeProfilePictureInput" type=\'file\'></input>
            </div>
            ';
          }
        }
       ?>

    </div>
    <div id="profile-picture-success-message">
       <span>Picture changed</span>
    </div>
    <div id="container-profile-options-frame">
      <h2>
        <i>Welcome to your profile</i>
        <div id="container-profile-options-button">
          <img class="formButton" src="Icons/IconOptions.png" name="profile-option-button"></img>
        </div>
        <!--Triangle-->
        <div id="container-profile-triangle">

        </div>
        <div id="container-profile-options-list">
          <div class="container-profile-option" name="_optionList1">
            <span>Settings</span>
          </div>
          <div class="container-profile-option" name="_optionList2">
            <span>Log out</span>
          </div>
        </div>
      </h2>

      <table name="_loadProfileOptionsHeader">

      </table>
    </div>
    <div id="container-profile-header">
      <<?php
        if(isset($_SESSION['userId'])){
          echo '<span class="profile-span-first">'.$_SESSION['userFName'].'</span>
          <span class="profile-span-first"> '.$_SESSION['userLName'].'</span><br>';

          $sql = "SELECT * FROM tbl_information WHERE idUser=?";
          $stmt = mysqli_stmt_init($conn);

          if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../index.php&error=?");
            exit();
          }else{
            $currentId = $_SESSION['userId'];
            mysqli_stmt_bind_param($stmt, 'i', $currentId);
            mysqli_stmt_execute($stmt);
            $resultCheck = mysqli_stmt_get_result($stmt);
            $rowCheck = mysqli_fetch_assoc($resultCheck);
            if(($rowCheck['secretAnswer'] && $rowCheck['secretAnswer'] == 'empty') || !$rowCheck['secretAnswer']){
              echo  '
                <p>Your bio is empty.</p>
                <input name="_showProfileSetupForm" class="formButton" type="button" value="Tell us about yourself"></input>
              ';
            }else{
              echo  '
                <p name="_bioParagraphProfile">'.$rowCheck['bio'].'</p>
                <button class="formButton" name="_editBioParagraphProfile">Edit</button>
              ';
            }
          }
        }
       ?>


    </div>


    <div id="container-profile-inside-menu">
      <div name="_profileMenuButton1"><h3>Posts</h3></div>
      <div name="_profileMenuButton2"><h3>Shares</h3></div>
      <div name="_profileMenuButton3"><h3>Friends</h3></div>
      <div name="_profileMenuButton4"><h3>Messages</h3></div>
      <div name="_profileMenuButton5"><h3>Settings</h3></div>
    </div>
    <div name="container-profile-success-message" style="display: none;">Success</div>
    <div id="container-profile-inside-frame">
      <h3>Loading...</h3>
      <div id="container-profile-information-wall">


      </div>
    </div>
  </div>

  <!--Other's people profile-->
  <div id="container-profile-other-frame">
    <div id="container-profile-other-exit">
      <button class="formButton" name="_toggleOtherProfile">Close</button>
    </div>
    <div id="container-profile-other-back">
      <!--<button class="formButton" name="_goBackToProfile" style="float: left;">Back</button>-->
    </div></br></br></br>
    <div id="div-to-load-other-profile">
    </div>
    <div id="container-profile-other-inside-menu">
      <div name="_otherprofileMenuButton1"><h3>Posts</h3></div>
      <div name="_otherprofileMenuButton2"><h3>Shares</h3></div>
      <div name="_otherprofileMenuButton3"><h3>Friends</h3></div>
      <div name="_otherprofileMenuButton4" onclick="toggleFriend()"></div>
    </div>
    <div name="container-profile-other-success-message" style="display: none;">Success</div>

    <div id="container-profile-other-inside-frame">
      <h3>Loading...</h3>
      <div id="container-profile-other-information-wall">


      </div>
    </div>
  </div>

  <!--Tool for help button and help frames-->
  <div id="container-help-button">
    <h3>Help</h3>
  </div>
  <div id="container-help-1">
    <h3>Welcome to Social Bisquit</h3>
    <p>This is a tutorial meant to teach you how to properly use this platform.</p>
    <span>Click <b>Next</b> to continue.</span></br>
    <div id="container-help-1-buttons">
      <button class="formButton" name="help-button-next">Next</button>
      <button class="formButton" name="help-button-close" style="float: left;">Close</button>
    </br><span>1/5</span>
    </div>

  </div>
  <div id="container-help-2">
    <h3>This is your main screen</h3>
    <p>Here you can see posts and articles posted by all of the users.</p>
    <p>By clicking on <b>Read more...</b> you can access further details linked to the selected post.</p>
    <span>Click <b>Next</b> to continue.</span></br></br>
    <div id="container-help-2-buttons">
      <button class="formButton" name="help-button-next">Next</button>
      <button class="formButton" name="help-button-previous">Previous</button>
      <button class="formButton" name="help-button-close" style="float: left;">Close</button>
    </br><span>2/5</span>
    </div>
  </div>
  <div id="container-help-3">
    <h3>Contribute yourself</h3>
    <p>If you wish to post anything, feel free to do so by clicking on the <b>Publish</b> button above.</p>
    <span>Click <b>Next</b> to continue.</span></br></br>
    <div id="container-help-3-buttons">
      <button class="formButton" name="help-button-next">Next</button>
      <button class="formButton" name="help-button-previous">Previous</button>
      <button class="formButton" name="help-button-close" style="float: left;">Close</button>
    </br><span>3/5</span>
    </div>
  </div>
  <div id="container-help-4">
    <h3>Customize your profile</h3>
    <p>By clicking on your <b>Profile</b> you can add and modify personal information,
    see your posts and shares as well as your friends list.</p>
    <span>Click <b>Next</b> to continue.</span></br></br>
    <div id="container-help-4-buttons">
      <button class="formButton" name="help-button-next">Next</button>
      <button class="formButton" name="help-button-previous">Previous</button>
      <button class="formButton" name="help-button-close" style="float: left;">Close</button>
    </br><span>4/5</span>
    </div>
  </div>
  <div id="container-help-5">
    <h3>Recieve notifications</h3>
    <p>By clicking on <b>News</b>, a container with notifications will be prompted
    where you can see the latest news relatable to you <b>(likes, comments, shares, friendrequests)</b>.</p>
    <span>You are ready to go! Click <b>Finish</b> to end this tutorial.</span></br></br>
    <div id="container-help-4-buttons">
      <button class="formButton" name="help-button-close">Finish</button>
      <button class="formButton" name="help-button-previous">Previous</button>
    </br><span>5/5</span>
    </div>
  </div>

  <div id="container-full-frame">

    <?php
      echo '
        <input style="display: none;" name="_loggedUserId" value="'.$_SESSION['userId'].'"></input>
        <input style="display: none;" name="_selectedPostId" value="'.$global_post_id.'"></input>
      ';
     ?>
  </div>

  <div id="container-news-frame">
    <span><i>Click on the notifications to mark them as read</i></span>
    <h4 name="_newsNotificationSuccessMessage" style="display: none;">-message-</h4>
    <div id="container-news-inside-frame">
      <span>Loading...</span>
    </div>
    <button class="formButton" name="_openNotificationPageButton">All notifications</button>
  </div>

  <div id="container-picture-frame">
    <div id="container-picture-left-pane">
      <img src=''></img>
    </div>
    <div id="container-picture-right-pane">

    </div>

  </div>
</div>

<div id="content">

  <div id="container-main-page">

  </div>

   <div id="overlay" onclick="toggleOverlay()">
  </div>




</div>
</body>
</html>
