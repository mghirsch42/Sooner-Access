<?php


// create a connection with the database
$con = new mysqli('localhost', 'root', 'secret', 'campus');
if($con->connect_error) {
	 die('Error : ('. $con->connect_errno .') '. $con->connect_error);
}

$mapInfo = simplexml_load_file('mapFile.kml');


foreach ($mapInfo->Document->Folder->Placemark as $plm) {

    if($plm->Point) {
        $placemark = $plm->name;
        $name = (string)$placemark;
        echo $name;
        echo "<br>";

        $placemark = $plm->description;
        $access = (string)$placemark;

        $placemark = $plm->Point->coordinates;
        $coords = preg_split("/[,\s]+/",(string)$placemark);

        $i = 0;
        $j = 1;
        $sql = "INSERT INTO points (name, lat, lng, accessibility)
                VALUES('$name', '$coords[$i]', '$coords[$j]', '$access')";
        
        if($con->query($sql) === TRUE) {
			echo "sucess!";
		}
		else {
			echo "death";
		}
    }
}
