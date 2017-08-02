<?php
/*
function revcon_change_post_label() {
    global $menu;
    global $submenu;
    $menu[5][0] = 'Insights';
    $submenu['edit.php'][5][0] = 'Insights';
    $submenu['edit.php'][10][0] = 'Add Insight';
    $submenu['edit.php'][16][0] = 'Insight Tags';
    echo '';
}
function revcon_change_post_object() {
    global $wp_post_types;
    $labels = &$wp_post_types['post']->labels;
    $labels->name = 'Insights';
    $labels->singular_name = 'Insight';
    $labels->add_new = 'Add Insight';
    $labels->add_new_item = 'Add Insight';
    $labels->edit_item = 'Edit Insight';
    $labels->new_item = 'Insight';
    $labels->view_item = 'View Insight';
    $labels->search_items = 'Search Insights';
    $labels->not_found = 'No Insights found';
    $labels->not_found_in_trash = 'No Insights found in Trash';
    $labels->all_items = 'All Insights';
    $labels->menu_name = 'Insights';
    $labels->name_admin_bar = 'Insights';
}
 
add_action( 'admin_menu', 'revcon_change_post_label' );
add_action( 'init', 'revcon_change_post_object' );
?>
*/