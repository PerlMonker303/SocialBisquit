<?php
  require 'dbh.php';
  //selecting data for container 4
  $number_online = 0;
  $sql_online = "SELECT * FROM tbl_users WHERE is_active=1";
  $result_online = $conn->query($sql_online);
  $number_online = $result_online->num_rows;

  $number_users = 0;
  $sql_users = "SELECT * FROM tbl_users";
  $result_users = $conn->query($sql_users);
  $number_users = $result_users->num_rows;

  $number_posts = 0;
  $sql_posts = "SELECT * FROM tbl_posts";
  $result_posts = $conn->query($sql_posts);
  $number_posts = $result_posts->num_rows;

  $number_shares = 0;
  $sql_shares = "SELECT * FROM tbl_shares";
  $result_shares = $conn->query($sql_shares);
  $number_shares = $result_shares->num_rows;

  $number_likes = 0;
  $sql_likes = "SELECT * FROM tbl_likes";
  $result_likes = $conn->query($sql_likes);
  $number_likes = $result_likes->num_rows;

  $number_comments = 0;
  $sql_comments = "SELECT * FROM tbl_comments";
  $result_comments = $conn->query($sql_comments);
  $number_comments = $result_comments->num_rows;


  echo '
    <h2>Live stats:</h2>
    <ul style="list-style-type:none;">
      <li>Users online: '.$number_online.'</li>
      <li>Accounts created: '.$number_users.'</li>
      <li>Posts made: '.$number_posts.'</li>
      <li>Articles shared: '.$number_shares.'</li>
      <li>Likes given: '.$number_likes.'</li>
      <li>Comments added: '.$number_comments.'</li>
    </ul>
  ';

 ?>
