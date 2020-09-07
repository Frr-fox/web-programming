<?php
isset($_GET["X"]) ? $x = $_GET["X"] : $x = 0;
isset($_GET["Y"]) ? $y = $_GET["Y"] : $y = 0;
isset($_GET["R"]) ? $r = $_GET["R"] : $r = 0;

function check($x, $y, $r) {
	return (($x*$x + $y*$y <= ($r*$r/2) && $x<=0 && $y>=0) || ($x<=0 && $y<=0 && $x>= -$r && $y>= -$r/2) || ($y>=2*$x-$r && $x>=0 && $y<=0));
}

?>