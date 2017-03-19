<?php


// create a connection with the database
$con = new mysqli('localhost', 'root', 'secret', 'campus');
if($con->connect_error) {
	 die('Error : ('. $con->connect_errno .') '. $con->connect_error);
}

$mapInfo = simplexml_load_file('mapFile.kml');


foreach ($mapInfo->Document->Folder->Placemark as $plm) {

	$placemark = $plm->name;
	$name = (string)$placemark;
	echo $name;

	$placemark = $plm->description;
	$access = (string)$placemark;
	$acs = 0;
	if ($access == "Accessible") {
		$acs = 1;
	}

	if($plm->LineString) {

		$placemark = $plm->LineString->coordinates;
		$coords = preg_split("/[,\s]+/",(string)$placemark);

			for($i = 0; $i<count($coords)-5; $i=$i+3) {
				echo $i . "</br>";

				$j = $i+1;
				$k = $i+3;
				$l = $i+4;
				$m = $i+5;

				echo "lng0: " . round($coords[$i], 5) . "<br>";
				echo "lat0: " . round($coords[$i + 1], 5) . "<br>";
				echo "lng1: " . round($coords[$i + 3], 5) . "<br>";
				echo "lat1: " . round($coords[$i + 4], 5) . "<br>";
				echo "Accessibility: " . $acs . "<br>";
				echo "<br>";

				$sql = "INSERT INTO polylines (name, lat0, lng0, lat1, lng1, Accessibility)
					VALUES ('$name', '$coords[$i]', '$coords[$j]', '$coords[$k]', '$coords[$l]', '$acs')";
            }

		echo $sql;
		echo "<br>";

		if($con->query($sql) === TRUE) {
			echo "sucess!";
		}
		else {
			echo "death";
		}

		echo "<br>";
	}

}

?>
