<?php
  session_start();
  require 'Includes/dbh.php';

  $global_post_id = 1;
?>
<html>
<head>
<title>Anti-Social CrushR</title>
<script
  src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript">
</script>
<script src="Scripts/indexJs.js" type="text/javascript"></script>
<link rel="stylesheet" href="Style/indexCSS.css" type="text/css">
<meta name="description" content="This is just an attempt of making a website with different functionalities (login/signup,publishing articles)">
</head>
<body bgcolor="#f4f5f4" onload="loadFunction()">


<div class="topBanner">
  <div class="topBanner-left">
    <h1 onclick="reloadPage()">Home</h1>
    <?php
      if(isset($_SESSION['userId'])){
        echo '<h1 onclick="toggleForm()">Publish</h1>';
      }
    ?>
  </div>

  <form class="topBanner-right" action="Includes/logout.php">
    <?php
      if(isset($_SESSION['userId'])){
        echo '<h1 onclick="toggleProfile()">Profile</h1>
        <div>
        <input type="submit" value="Log out" class="formButton" onclick="logoutFunction()"></input>
        </div>';
      }else{
        echo '<h1 onclick="toggleLoginContainer()">Log in</h1>
        <h1 onclick="toggleSignupContainer()">Sign up</h1>';
      }
     ?>
  </form>
</div>




<div id="tools">
  <form action="Includes/publish.php" method="post" id="container-form-main" style="display: none;">
    <h2 >Contribute to the website and add your own piece of information down below</h2>
    <div id="container-form-wrapper">
      <div id="container-form-title">
        <p>Article title:</p>
        <input type="text" class="inputArea" name="_titleName" required maxlength="70"></input>
        <p>Author name:</p>
        <?php
          $userName = $_SESSION['userFName']." ".$_SESSION['userLName'];
          echo '<input type="text" class="inputArea" name="_authorName" required maxlength="45" disabled
          value = "'.$userName.'"></input>';
        ?>

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
          echo '<h2 id="container-notification-title">Success</h2>
          <p id="container-notificatiion-content">You have succesfully logged in.</p>';
        }else if($_GET['error'] == "sgn_success"){
          echo '<h2 id="container-notification-title">Success</h2>
          <p id="container-notificatiion-content">You have succesfully registered.</p>';
        }else if($_GET['error'] == "lo_success"){
          echo '<h2 id="container-notification-title">Success</h2>
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
        }
        echo '</div>';
      }
     ?>
  <form id="container-login-frame" action="Includes/login.php" method="post" style="display: none;">
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
  </form>

  <form id="container-signup-frame" action="Includes/signup.php" method="post" style="display: none;">
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




  <div id="container-profile-frame" style="display: none;">
    <div id="container-profile-exit">
      <button class="formButton" onclick="toggleProfile()">Close</button>
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

          $result = mysqli_stmt_get_result($stmt);
          $row = mysqli_fetch_assoc($result);
          $imagePath = $row['nameProfilePic'];
          echo '<img src="Pictures/'.$imagePath.'"></img>';
        }

       ?>
    </div>
    <div id="container-profile-options-frame">
      <div id="container-profile-options-button">
        <img class="formButton" src="Icons/IconOptions.png" name="profile-option-button"></img>
        <!-- adding hidden menu for options-->
        <ul id="container-profile-options-dropdown" >
          <li class="dropdownOption">Posts</li>
          <li class="dropdownOption">Friends list</li>
          <li class="dropdownOption">Messages</li>
        </ul>
      </div>

      <h2>Welcome to your profile page.</h2>

      <?php
        if(isset($_SESSION['userId'])){
          //searching for userId in tbl_information

          $sql = "SELECT * FROM tbl_information WHERE idUser=?";
          $stmt = mysqli_stmt_init($conn);

          if(!mysqli_stmt_prepare($stmt, $sql)){
            exit();
          }else{
            mysqli_stmt_bind_param($stmt, 'i', $_SESSION['userId']);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_store_result($stmt);
            $resultCheck = mysqli_stmt_num_rows($stmt);
            if($resultCheck == 0){
              echo '
                <h4>You have not set up your profile yet.</h4>
                <input onclick="showSetupProfileForm()" class="formButton" type="button" value="Tell us about yourself"></input>
              ';
            }else{
              $sql1 = "SELECT * FROM tbl_information WHERE idUser=?";
              $stmt1 = mysqli_stmt_init($conn);
              mysqli_stmt_prepare($stmt1, $sql1);
              mysqli_stmt_bind_param($stmt1, 'i', $_SESSION['userId']);
              mysqli_stmt_execute($stmt1);
              //selecting data from tbl_information
              $result = mysqli_stmt_get_result($stmt1);
              $row = mysqli_fetch_assoc($result);
              $friendsCount = 0;

              //selecting postCount from tbl_posts

              $sql2 = "SELECT * FROM tbl_posts WHERE idUser=?";
              $stmt2 = mysqli_stmt_init($conn);
              if(!mysqli_stmt_prepare($stmt2, $sql2))
                exit();
              mysqli_stmt_bind_param($stmt2, 'i', $_SESSION['userId']);
              mysqli_stmt_execute($stmt2);
              mysqli_stmt_store_result($stmt2);
              $postsCount = mysqli_stmt_num_rows($stmt2);
              $gender = $row['gender'];
              if($gender == 1){
                $gender = "Male";
              }else{
                $gender = "Female";
              }
              $lookingFor = $row['lookingFor'];
              if($lookingFor == 1){
                $lookingFor = "Male";
              }else{
                $lookingFor = "Female";
              }
              $dob = strtotime($row['dateOfBirth']);
              $now = time();
              $diff = $now-$dob;
              $age = floor($diff / 31556926);
              $height = $row['height'];
              echo '
              <table>
                <tr>
                  <td><span>Friends: </span></td>
                  <td>'.$friendsCount.'</td>
                  <td><span>Posts: </span></td>
                  <td>'.$postsCount.'</td>
                </tr>
                <tr>
                  <td><span>Gender: </span></td>
                  <td>'.$gender.'</td>
                  <td><span>Looking for: </span></td>
                  <td>'.$lookingFor.'</td>
                </tr>
                <tr>
                  <td><span>Age: </span></td>
                  <td>'.$age.'</td>
                  <td><span>Height: </span></td>
                  <td>'.$height.'</td>
                </tr>
              </table>
              ';
            }
          }
        }
      ?>

    </div>
    <div id="container-profile-header">
      <<?php
        if(isset($_SESSION['userId'])){
          echo '<span class="profile-span-first">'.$_SESSION['userFName'].'</span>
          <span class="profile-span-first"> '.$_SESSION['userLName'].'</span><br>';

          $sql = "SELECT * FROM tbl_information WHERE idUser=?";
          $stmt = mysqli_stmt_init($conn);

          if(!mysqli_stmt_prepare($stmt, $sql)){
            header("Location: ../main.php&error=?");
            exit();
          }else{
            $currentId = $_SESSION['userId'];
            mysqli_stmt_bind_param($stmt, 'i', $currentId);
            mysqli_stmt_execute($stmt);
            $resultCheck = mysqli_stmt_get_result($stmt);
            if($row = mysqli_fetch_assoc($resultCheck)){
              echo  '
                <p>'.$row['bio'].'</p>
              ';
            }else{
              echo  '
                <p>Your bio is empty.</p>
                <input onclick="showSetupProfileForm()" class="formButton" type="button" value="Tell us about yourself"></input>

              ';
            }
          }
        }
       ?>


    </div>
    <div id="container-profile-inside-frame">
      <div id="container-profile-setup">

      </div>

      <div id="container-profile-information"  style="display: none;">
        <?php
          //change the title to update your profile after first update
          echo '<h2>Setup your profile:</h2>';
         ?>

        <form action="Includes/update.php" method="post" enctype="multipart/form-data">
          <table>
            <tr>
              <td class="table-first">Secret question: </td>
              <td><select class="inputArea" name="setup_el1" required>

                <option disabled selected value>-- select an option --</option>
                <?php
                //setting secret question options

                $sql = "SELECT * FROM tbl_questions";
                $result = mysqli_query($conn, $sql);

                if(mysqli_num_rows($result) > 0){
                  while($row = mysqli_fetch_assoc($result)){
                    echo '<option value="'.$row['idQuestion'].'">'.$row['question'].'</option>';
                  }
                }

                ?>
                </select>
              </td>
            </tr>
            <tr>
              <td class="table-first">Secret answer: </td>
              <td><input type="password" class="inputArea" required name="setup_el2" id="secret-input"></input><input type="checkbox" id="secret-checkbox">Show</input></td>
            </tr>
            <tr>
              <td class="table-first">Date of birth: </td>
              <td><input type="date" class="inputArea" name="setup_el3" required></input></td>
            </tr>
            <tr>
              <td class="table-first">Height: </td>
              <td><input type="number" step="0.01" class="inputArea" name="setup_el4" required></input>(meters)
              </td>
            </tr>
            <tr>
              <td class="table-first">Gender: </td>
              <td><select class="inputArea" name="setup_el5" required>
                <option disabled selected value>-- select an option --</option>
                <option value="is_male">Male</option>
                <option value="is_fem">Female</option>
              </select></td>
            </tr>
            <tr>
              <td class="table-first">Looking for: </td>
              <td><select class="inputArea" name="setup_el6" required>
                <option disabled selected value>-- select an option --</option>
                <option value="lf_male">Male</option>
                <option value="lf_fem">Female</option>
              </select></td>
            </tr>
            <tr>
              <td class="table-first">Where are you from: </td>
              <td><input type="text" class="inputArea" name="setup_el7" required></input></td>
            </tr>
            <tr>
              <td class="table-first">Where are you living: </td>
              <td><input type="text" class="inputArea" name="setup_el8" required></input></td>
            </tr>
            <tr>
              <td class="table-first">What is your profession: </td>
              <td><input type="text" class="inputArea" name="setup_el9" required></input></td>
            </tr>
            <tr>
              <td class="table-first">Bio: </td>
              <td><textarea class="inputArea" name="setup_el10" required></textarea></td>
            </tr>
            <tr>
              <td class="table-first">Upload a picture </td>
              <td><input type="file" class="inputArea" name="setup_el11" required></input> (.png,.jpg,.jpeg) max 50kb</td>

            </tr>
          </table>
          <div id="profile-setup-buttons">
            <button class="formButton" type="submit" name="update-submit">Update</button>
            <input type="button" class="formButton" onclick="resetProfileSetup()" value="Reset"></input>
          </div>
        </form>
      </div>

      <div>
        <?php
          //showing user posts
          if(isset($_SESSION['userId'])){

            $sql0 = "SELECT * FROM tbl_posts WHERE idUser = ?";
            $stmt0 = mysqli_stmt_init($conn);
            mysqli_stmt_prepare($stmt0, $sql0);
            mysqli_stmt_bind_param($stmt0, 'i', $_SESSION['userId']);

            mysqli_stmt_execute($stmt0);
            mysqli_stmt_store_result($stmt0);
            $resultCheck = mysqli_stmt_num_rows($stmt0);
            if($resultCheck > 0){
              echo '<h3 id="profile-special-posts">Your Posts:</h3>';
              //showing posts
                $sql = "SELECT * FROM tbl_posts WHERE idUser=?";
                $stmt = mysqli_stmt_init($conn);
                if(!mysqli_stmt_prepare($stmt,$sql)){
                  header("Location: ../main.php?error=sqlerror");
                  exit();
                }else{
                  mysqli_stmt_bind_param($stmt, "i", $_SESSION['userId']);
                  mysqli_stmt_execute($stmt);
                  //post local id
                  $localId = 1;
                  $result = mysqli_stmt_get_result($stmt);
                  while($row = mysqli_fetch_assoc($result)){
                    //selecting userName
                    $sql1 = "SELECT fName,lName FROM tbl_users WHERE idUser=?";
                    $stmt1 = mysqli_stmt_init($conn);
                    if(!mysqli_stmt_prepare($stmt1,$sql1)){
                      exit();
                    }
                    mysqli_stmt_bind_param($stmt1, "i", $_SESSION['userId']);
                    mysqli_stmt_execute($stmt1);
                    $result1 = mysqli_stmt_get_result($stmt1);
                    if($row1 = mysqli_fetch_assoc($result1)){
                      $userName = $row1['fName'].' '.$row1['lName'];
                    }

                    //shortening content if it is too long
                    $fullText = $row['content'];
                    $postId = $row['idPost'];
                    if(strlen($row['content'])>250){
                      $row['content'] = substr($row['content'],0,250)."...";
                    }

                    //selecting profile pic for post user from tbl_information
                    $sql2 = "SELECT nameProfilePic FROM tbl_information WHERE idUser=?";
                    $stmt2 = mysqli_stmt_init($conn);
                    mysqli_stmt_prepare($stmt2, $sql2);
                    mysqli_stmt_bind_param($stmt2, "i", $row['idUser']);
                    mysqli_stmt_execute($stmt2);
                    $result2 = mysqli_stmt_get_result($stmt2);
                    $row2 = mysqli_fetch_assoc($result2);
                    $postImage = $row2['nameProfilePic'];

                    //adding the posts
                    $newName = "_profile_".$localId++;
                    echo
                    '<div class="container-main-frame" name="'.$newName.'">
                      <div class="container-header-content">
                        <h2>'.$row['title'].'</h2>
                        <h3>By <span>'.$userName.'</span> on <span>'.$row['datePosted'].'</span></h3>
                        <span style="display: none;">'.$postImage.'</span>
                        </div>';
                    echo '
                      <div class="container-text-content"">
                        <p>'.$row['content'].'</p>
                        <p style="display: none;">'.$fullText.'</p>
                        <p style="display: none;">'.$postId.'</p>
                      </div>
                    ';
                    echo '
                      <div class="container-text-readmore">
                        <p onclick="toggleFullContainer(\''.$newName.'\')">Read More...</p>
                      </div>
                    </div>';
                  }
                }
            }else{
              echo '<span>You have made no posts yet.</span>';
            }
          }
        ?>

      </div>
    </div>
  </div>

</div>

<div id="content">
  <!--All the other containers-->
  <!--showing posts-->
  <?php
    //showing posts only if user is logged in
    if(isset($_SESSION['userId'])){
      $sql = "SELECT * FROM tbl_posts";// WHERE idUser=?
      $stmt = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt,$sql)){
        header("Location: ../main.php?error=sqlerror");
        exit();
      }else{
        //mysqli_stmt_bind_param($stmt, "i", $_SESSION['userId']);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        //post local id
        $localId = 1;
        while($row = mysqli_fetch_assoc($result)){
          //selecting userName
          //first from the tbl_users


          $sql1 = "SELECT fName,lName FROM tbl_users WHERE idUser=?";
          $stmt1 = mysqli_stmt_init($conn);
          if(!mysqli_stmt_prepare($stmt1,$sql1)){
            exit();
          }
          mysqli_stmt_bind_param($stmt1, "i", $row['idUser']);
          mysqli_stmt_execute($stmt1);
          $result1 = mysqli_stmt_get_result($stmt1);
          if($row1 = mysqli_fetch_assoc($result1)){
            $userName = $row1['fName'].' '.$row1['lName'];
          }
          $fullText = $row['content'];
          $postId = $row['idPost'];
          $global_post_id = $postId;
          //shortening content if it is too long
          if(strlen($row['content'])>250){
            $row['content'] = substr($row['content'],0,250)."...";
          }

          //selecting profile pic for post user from tbl_information
          $sql2 = "SELECT nameProfilePic FROM tbl_information WHERE idUser=?";
          $stmt2 = mysqli_stmt_init($conn);
          mysqli_stmt_prepare($stmt2, $sql2);
          mysqli_stmt_bind_param($stmt2, "i", $row['idUser']);
          mysqli_stmt_execute($stmt2);
          $result2 = mysqli_stmt_get_result($stmt2);
          $row2 = mysqli_fetch_assoc($result2);
          $postImage = $row2['nameProfilePic'];


          //adding the posts
          $newName = "local_".$localId++;
          echo
          '<div class="container-main-frame" name="'.$newName.'">
            <div class="container-header-content">
              <h2>'.$row['title'].'</h2>
              <h3>By <span>'.$userName.'</span> on <span>'.$row['datePosted'].'</span></h3>
              <span style="display: none;">'.$postImage.'</span>
              </div>';
          echo '
            <div class="container-text-content">
              <p>'.$row['content'].'</p>
              <p style="display: none;">'.$fullText.'</p>
              <p style="display: none;">'.$postId.'</p>
            </div>
          ';
          echo '
            <div class="container-text-readmore">
              <p onclick="toggleFullContainer(\''.$newName.'\')">Read More...</p>
            </div>
          </div>';
        }
      }
    }
   ?>

   <div id="overlay" onclick="toggleOverlay()">
    </div>


  <div id="container-full-frame" style="display: none;"><!--Full container form - initially hidden-->
    <div id="container-full-exit-button">
      <button class="formButton" onclick="toggleFullContainer()">Close</button>
    </div>
    <div id="container-full-header-content">
      <h1>Article title</h1>
      <h3>By</h3>
      <img src=""></img>
      <h3>Author title</h3>
      <h4>Published on -date-</h4>
    </div>
    <div id="container-full-header-bar">
      <h5 class="_likedList">Likes:</h5>
      <span name="_likeCount" class="_likedList"></span>
      <h5>Comments:</h5>
      <span name="_commentCount"></span>
      <h5>Shares:</h5>
      <span name="_shareCount"></span>
    </div>
    <div id="container-full-text-content">
      <p> Article content
      </p>
      <?php echo '<p style="display: none;"></p>';?>
    </div>

    <div id="container-liked-list">
      <table>
        <tr><td>Alexandrescu Andrei-Robert</td></tr>
        <tr><td>Asd asd</td></tr>
      </table>
    </div>

    <form id="container-full-bar-content" method="post" action="like.php">
      <div name="container-full-bar-content-like">
        <img src="Icons/IconLike.png" name="post-like"></img>
        <div name="_checkCurrentUserLoggedOuter"><h4 name="_checkCurrentUserLogged">Like</h4></div>
      </div>
      <div name="container-full-bar-content-comment">
        <img src="Icons/IconComment.png"></img>
        <h4>Comment</h4>
      </div>
      <div name="container-full-bar-content-share">
        <img src="Icons/IconShare.png"></img>
        <h4>Share</h4>
      </div>
    </form>

    <hr>
    <h4 name="_newLikeSuccess">Post liked succesfully.</h4>
    <h4 name="_newCommentSuccess">Comment added succesfully.</h4>
    <h4 name="_newShareSuccess">Post shared succesfully.</h4>

    <form id="container-add-comment" src="Includes/comment.php" method="post">
      <h3>Add a comment to this post</h3>
      <textarea class="inputArea" name="_newCommentContent"></textarea>
      <h5 name="_newCommentError">You can't add an empty comment.</h5>
      <?php
        echo '
          <input style="display: none;" name="_loggedUserId" value="'.$_SESSION['userId'].'"></input>
          <input style="display: none;" name="_selectedPostId" value="'.$global_post_id.'"></input>
        ';
       ?>
      <div id="container-add-comment-buttons">
        <button class="formButton" type="submit" name="post-comment">Post</button>
        <input class="formButton" type="button" onclick="resetComment()" value="Reset"></input>
      </div>

    </form>

    <form id="container-add-share" src="Includes/share.php" method="post">
      <h3>Share this post with your own opinion</h3>
      <textarea class="inputArea" name="_newShareContent"></textarea>
      <div id="container-add-share-buttons">
        <button class="formButton" type="submit" name="post-share">Share</button>
        <input class="formButton" type="button" onclick="resetShare()" value="Reset"></input>
      </div>
    </form>

    <h2>Comments (<span name="_commentCount"></span>)</h2>
    <div id="container-full-comment-section" >
      <?php
        echo '<span name="secret-post-id">'.$global_post_id.'</span>';
       ?>
    </div>
  </div>

</div>
</body>
</html>
