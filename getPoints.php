<?php

// NOT WORKING YET
// This file grabs Point data from the data base to send to the javascript


$con = new mysqli('localhost', 'root', 'secret', 'campus');
if($con->connect_error) {
  die('Connection Error');
}
// choose all the data and load into result
$sql="SELECT * FROM polylines";
$result = $con->query($sql);


if($result) {

	//make it into a pretty format for JSON to parse
	$arr = array();
	while($row = $result->fetch_assoc()){
		$arr[] = $row;
	}
	echo json_encode($arr);

	// close the connection with the database
	$result->free();
	$con->close();

}
else {
	echo "couldnt issue database query";
	echo mysqli_error($con);
}


 ?>
