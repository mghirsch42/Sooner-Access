<?php


// create a connection with the database
$con = new mysqli('localhost', 'root', 'secret', 'campus');
if($con->connect_error) {
	 die('Error : ('. $con->connect_errno .') '. $con->connect_error);
}


$delete = "DELETE FROM polylines WHERE 1";
if($con->query($delete)) {
    echo "deleted before inserting";
}

$mapInfo = simplexml_load_file('newMapFile.kml');


foreach ($mapInfo->Document->Folder->Placemark as $plm) {

	$placemark = $plm->name;
	$name = (string)$placemark;
	echo $name . "<br>";

	$placemark = $plm->description;
	$access = (string)$placemark;
	$acs = 0;
	if ($access == "Accessible") {
		$acs = 1;
	}

	if($plm->LineString) {

		$placemark = $plm->LineString->coordinates;
		$coords = preg_split("/[,\s\n]+/",(string)$placemark);

        
			for($i = 1; $i<count($coords)-5; $i=$i+3) {
				echo "i: " + $i . "</br>";
        
                
				$j = $i+1;
				$k = $i+3;
				$l = $i+4;

				echo "lng0: " . round($coords[$i], 5) . "<br>";
				echo "lat0: " . round($coords[$j], 5) . "<br>";
				echo "lng1: " . round($coords[$k], 5) . "<br>";
				echo "lat1: " . round($coords[$l], 5) . "<br>";
				echo "Accessibility: " . $acs . "<br>";
				echo "<br>";

                
                $sql = "INSERT INTO polylines (name, lat0, lng0, lat1, lng1, accessibility)
                VALUES('$name', '$coords[$i]', '$coords[$j]', '$coords[$k]', '$coords[$l]', '$acs')";
            }

		
	}

    if($con->query($sql) === TRUE) {
        echo "sucess!";
    }
    else {
	   echo "death";
    }
    
    echo "<br><br> -------------------------- <br><br>";
    
}

?>
