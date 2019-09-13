<?php

//--for local debugging
$local = 2;
if($local==1){
	$servername = "localhost";
	$dBUsername = "root";
	$dBPassword = "";
	$dBName = "socialcrushrdb";
}else{
	$servername = "us-cdbr-iron-east-02.cleardb.net";
	$dBUsername = "b99d4cf3d9ee42";
	$dBPassword = "28f0f489";
	$dBName = "heroku_fb33c9fd9909483";
}

$conn = mysqli_connect($servername,$dBUsername,$dBPassword,$dBName);

if(!$conn){
  die("Connection failed: ".mysqli_connect_error());
}
