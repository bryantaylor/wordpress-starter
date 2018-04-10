#!/usr/bin/env bash

# WORDPRESS INSTALL SCRIPT
# -------------------
# This script allows you to create a new site utilizing the ripe gulp workflow
#
#
# The scripts executes the following actions:
#
# 1) Download core from wordpress.com
# 2) Sanitize themes folder
# 3) Download WordPress Starter
# 4) Download plugins via composer
# 5) Download Node Modules
# 6) Configure themes config.yml
# 7) Configure WordPress wp-config.php
# 8) Open WordPress Install page in browser


###########################################################
#
# Script Variables
#
##########################################################

# Project naming Variables
PROJECT_NAME="$1"                                                                    # Get first argument from command line for name of new project
CURRENT_PROJECTS=`ls -l`                                                             # Get list of all current projects in current directory

# Wordpress core Variables
WORDPRESS_CORE_URL="https://wordpress.org/latest.zip"                                # Latest WordPress core
WORDPRESS_CORE_NAME="wordpress"                                                      # Default WordPress core directory name

# WordPress Starter Variables
WORDPRESS_STARTER_URL="https://github.com/bryantaylor/wordpress-starter/archive/master.zip"   # Github URL of gulp core
WORDPRESS_STARTER_NAME="wordpress-starter-master"                                             # Name of repository

# Virtual Host Variables
VHOST_DOMAIN=".localhost"
WP_INSTALL_PATH="/wp-admin/install.php"

# Formatting stuff
bold=$(tput bold)
normal=$(tput sgr0)

# Check to see if project with same name already exist before we use that name
for PROJECT in $CURRENT_PROJECTS
do
  if [ "$PROJECT" == "$PROJECT_NAME" ]; then
    echo  "Error: project '${PROJECT}'' already exists"
    exit
  fi
done

###########################################################
#
# 1) Download core from wordpress.com
#
##########################################################
# Download Core
echo -e "\n--> Download latest WordPress core\n"
curl -L $WORDPRESS_CORE_URL > $PROJECT_NAME.zip
# Unzip Core
echo -e "\n--> Extract\n"
unzip $PROJECT_NAME.zip
# Remove zip
rm -rf $PROJECT_NAME.zip
# Reaneme Core Directory to project name
mv ./$WORDPRESS_CORE_NAME ./$PROJECT_NAME

###########################################################
#
# 2) Sanitize themes folder
#
##########################################################
echo -e "\n--> Removing default themes"
# Navigate to directory
cd $PROJECT_NAME/wp-content/themes/
# Delete themes
rm -R -- */

###########################################################
#
# 3) Download WordPress starter theme
#
##########################################################
# Download Wordpress starter theme
echo -e "\n--> Download WordPress starter theme\n"
curl -L  $WORDPRESS_STARTER_URL > $PROJECT_NAME.zip
# Unzip gulp-starter
echo -e "\n--> Extract\n"
unzip $PROJECT_NAME.zip
# Remove zip
rm -rf $PROJECT_NAME.zip
mv ./$WORDPRESS_STARTER_NAME ./$PROJECT_NAME
# Move contents to root theme level
mv $PROJECT_NAME/{.,}* .
# remove old theme directory
rm -rf $PROJECT_NAME

###########################################################
#
# 4) Download plugins via composer
#
##########################################################
composer install

###########################################################
#
# 5) Download Node Modules
#
##########################################################
# Choose if user would like to install node modules because the full snap-on toolbox weighs a bit
while true; do
  read -p "${bold}Would you like to install node modules? *Warning the install is around 200MB* (yes/no)${normal}" yn
  case $yn in
    # If yes download run npm install
    [Yy]* ) echo -e "\n--> Install node modules\n"; npm install; break;;
    # If not we continue
    [Nn]* ) break;;
    * ) echo "${bold}Please answer yes or no.${normal}";;
  esac
done

###########################################################
#
# 6) Rename project in config file and remove original
#
##########################################################
echo -e "\n--> Updating config file\n"
cd src/
sed -i ".original" "s/wordpress-starter/$PROJECT_NAME/g" config.yml
rm -rf config.yml.original

###########################################################
#
# 7) Rename project in config file and remove original
#
##########################################################
cd ../../..
echo -e "\n--> setup wp-config file \n"
echo -e "${bold}-----------------------------------------------------------------------${normal}\n"
echo -e "${bold}Enter local database credentials${normal}"
echo -e "${bold}-----------------------------------------------------------------------${normal}\n"
# Get database credentaials from user
read -p 'Please enter local database name: ' DB_NAME
read -p 'Please enter local database username: ' DB_USER
read -p 'Please enter local database password: ' DB_PASSWORD

echo -e "\n--> Adding database credentials to the config file \n"
# Add Credentials to cofing file
sed -i ".bak" "s/database_name_here/$DB_NAME/g" wp-config-sample.php
sed -i ".bak" "s/username_here/$DB_USER/g" wp-config-sample.php
sed -i ".bak" "s/password_here/$DB_PASSWORD/g" wp-config-sample.php

echo -e "\n--> Adding Authentication Unique Keys and Salts. \n"
# Get salts from WordPress site
curl "https://api.wordpress.org/secret-key/1.1/salt/" -o salts.tmp
# Remove placeholders and add salts to config file
sed -i ".bak" "49,56d" wp-config-sample.php
sed "48r salts.tmp" wp-config-sample.php > wp-config.php
# Remove unnecssary files
rm -rf wp-config-sample.php.bak
rm -rf wp-config-sample.php
rm -rf salts.tmp

###########################################################
#
# 8) Open WordPress install page in browser
#
##########################################################
open http://$PROJECT_NAME$VHOST_DOMAIN$WP_INSTALL_PATH

###########################################################
#
# Install Complete!!!!!!!
#
##########################################################
echo -e "\n \n"
echo -e "${bold}####################################################################################${normal}\n"
echo -e "${bold}Install Complete${normal}"
echo -e "${bold}Enjoy!${normal}\n"
echo -e "${bold}####################################################################################${normal}\n"
