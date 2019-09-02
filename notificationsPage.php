 <html>
 <head>
   <script
     src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js" type="text/javascript">
   </script>
   <script src="../Scripts/indexJS.js" type="text/javascript"></script>
   <link rel="stylesheet" href="../Style/indexCSS.css" type="text/css">
 </head>
  <body bgcolor="#f4f5f4">
    <?php

      require '../Includes/dbh.php';

      $nothingNew = true;
      $id = 14;

      //checking friend requests
      $sql_req = "SELECT * FROM tbl_frequests WHERE idFriend = ?";
      $stmt_req = mysqli_stmt_init($conn);

      if(!mysqli_stmt_prepare($stmt_req, $sql_req)){
        header("Location: ../index.php&error=?");
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_req, "i", $id);
        mysqli_stmt_execute($stmt_req);
        $result_req = mysqli_stmt_get_result($stmt_req);
        while($row = mysqli_fetch_assoc($result_req)){
          //extracting data about user
          $sql_extract = "SELECT * FROM tbl_users WHERE idUser = ?";
          $stmt_extract = mysqli_stmt_init($conn);
          if(!mysqli_stmt_prepare($stmt_extract, $sql_extract)){
            header("Location: ../index.php&error=?");
            exit();
          }else{
            mysqli_stmt_bind_param($stmt_extract, "i", $row['idUser']);
            mysqli_stmt_execute($stmt_extract);
            $result_extract = mysqli_stmt_get_result($stmt_extract);
            $row_user = mysqli_fetch_assoc($result_extract);

            $userName = $row_user['fName'].' '.$row_user['lName'];

            //going for the information
            $sql_info = "SELECT * FROM tbl_information WHERE idUser = ?";
            $stmt_info = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt_info, $sql_info)){
              header("Location: ../index.php&error=?");
              exit();
            }else{
              mysqli_stmt_bind_param($stmt_info, "i", $row['idUser']);
              mysqli_stmt_execute($stmt_info);
              $result_info = mysqli_stmt_get_result($stmt_info);
              $row_info = mysqli_fetch_assoc($result_info);

              $imagePath = "../Pictures/".$row_info['nameProfilePic'];
            }

            $nothingNew = false;
            //showing container
            echo '<div id="container-news-inside-article">
              <h4><img src="'.$imagePath.'" name="_newsNotificationClickable"></img><i name="_newsNotificationClickable">'.$userName.'</i> sent you a friend request.<span name="_newsNotificationClickable" style="display: none;">'.$row_user['idUser'].'</span></h4>

              <button class="formButtonNews" onclick="acceptFriendRequest('.$row['idReq'].')">Accept</button>
              <button class="formButtonNews" onclick="rejectFriendRequest('.$row['idReq'].')">Reject</button>
            </div>';
          }

        }
      }

      //checking notifications DB
      $sql_not = "SELECT * FROM tbl_notifications WHERE idUserToSee = ?";
      $stmt_not = mysqli_stmt_init($conn);
      if(!mysqli_stmt_prepare($stmt_not, $sql_not)){
        header("Location: ../index.php?error=sqlerror");
        exit();
      }else{
        mysqli_stmt_bind_param($stmt_not, 'i', $id);
        mysqli_stmt_execute($stmt_not);

        $result_not = mysqli_stmt_get_result($stmt_not);
        while($row_not = mysqli_fetch_assoc($result_not)){
          //selecting name
          $sql_sel_name = "SELECT fName, lName FROM tbl_users WHERE idUser = ?";
          $stmt_sel_name = mysqli_stmt_init($conn);
          mysqli_stmt_prepare($stmt_sel_name, $sql_sel_name);
          mysqli_stmt_bind_param($stmt_sel_name, 'i', $row_not['idUser']);
          mysqli_stmt_execute($stmt_sel_name);
          $result_sel_name = mysqli_stmt_get_result($stmt_sel_name);
          $row_sel_name = mysqli_fetch_assoc($result_sel_name);
          $fullName = $row_sel_name['fName'].' '.$row_sel_name['lName'];
          //selecting image
          $sql_sel_img = "SELECT nameProfilePic FROM tbl_information WHERE idUser = ?";
          $stmt_sel_img = mysqli_stmt_init($conn);
          mysqli_stmt_prepare($stmt_sel_img, $sql_sel_img);
          mysqli_stmt_bind_param($stmt_sel_img, 'i', $row_not['idUser']);
          mysqli_stmt_execute($stmt_sel_img);
          $result_sel_img = mysqli_stmt_get_result($stmt_sel_img);
          $row_sel_img = mysqli_fetch_assoc($result_sel_img);
          $imagePath = $row_sel_img['nameProfilePic'];

          $nothingNew = false;
          echo '<div id="container-news-inside-article">
            <h4><img src="../Pictures/'.$imagePath.'" name="_newsNotificationClickable"></img><i name="_newsNotificationClickable">'.$fullName.'</i>'.$row_not['content'].'<span name="_newsNotificationClickable" style="display: none;"></span></h4>

          </div>';
        }
      }

      if($nothingNew == true){
        echo '<h3>There are no notifications to be shown.</h3>';
      }



     ?>
  </body>
 </html>
