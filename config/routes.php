<?php

function load_view($view){
    require VIEW_DIR.$view . '.tpl.php';
}

function load_partial($partial){
    require PARTIAL_DIR.$partial . '.tpl.php';
}