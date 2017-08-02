<?php
/*
// ===========================================================
// Create taxony for Opportunity Type
// ===========================================================
function add_type_to_opportunities(){
 
    //set the name of the taxonomy
    $taxonomy = 'opportunity_type';
    
    //set the post types for the taxonomy
    $object_type = 'opportunities';
     
    //populate our array of names for our taxonomy
    $labels = array(
        'name'               => 'Opportunity Type',
        'singular_name'      => 'Opportunity Type',
        'search_items'       => 'Search Opportunity Types',
        'all_items'          => 'All Opportunity Types',
        'parent_item'        => 'Parent Opportunity Type',
        'parent_item_colon'  => 'Parent Opportunity Type:',
        'update_item'        => 'Update Opportunity Type',
        'edit_item'          => 'Edit Opportunity Type',
        'add_new_item'       => 'Add New Opportunity Type', 
        'new_item_name'      => 'New Opportunity Type Name',
        'menu_name'          => 'Opportunity Type'
    );
   
    //define arguments to be used 
    $args = array(
        'labels'            => $labels,
        'hierarchical'      => true,
        'show_ui'           => true,
        'how_in_nav_menus'  => true,
        'public'            => true,
        'show_admin_column' => true,
        'query_var'         => true,
        'rewrite'           => array('slug' => 'type')
    );
     
    //call the register_taxonomy function
    register_taxonomy($taxonomy, $object_type, $args); 
}
// This is a Wordpress action, and actually adds the taxonomy 
// The "init" action runs after WordPress has finished loading
// but before any http headers are sent. 
add_action('init','add_type_to_opportunities');
?>
*/