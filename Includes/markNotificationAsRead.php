<?php
   require 'dbh.php';

   $idNotif = $_POST['_idNotif'];

   //check what type it is
   $sql_check = "SELECT * FROM tbl_notifications WHERE idNotification = '$idNotif'";
   if(mysqli_query($conn, $sql_check)){
     $result_check = mysqli_query($conn, $sql_check);
     $row = mysqli_fetch_assoc($result_check);

     $typeOf = $row['typeOf'];
     if($typeOf == "acceptedFrequest"){
        //delete frequests notifications
        $sql_del = "DELETE FROM tbl_notifications WHERE idNotification = '$idNotif'";
        if(!mysqli_query($conn, $sql_del)){
          header("Location: ../index.php?error=sqlerror333".mysqli_error($conn));
          exit();
        }

     }else{
       //mark the notification as read
       $sql_mark = "UPDATE tbl_notifications SET isRead = '1' WHERE idNotification = '$idNotif'";
       if(!mysqli_query($conn, $sql_mark)){
         header("Location: ../index.php?error=sqlerror333".mysqli_error($conn));
         exit();
       }
     }

   }else{
     header("Location: ../index.php?error=sqlerror333".mysqli_error($conn));
     exit();
   }



 ?>
