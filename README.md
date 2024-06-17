## Modern Desk

A modern UI for frappe desk

## Install app
use the following commands to install this app  
First get it from this repo

```
bench get-app modern_desk https://github.com/pratheeshrussell/frappe-modern-desk
```
add to your site
```
bench --site [site name] install-app modern_desk
```
start the frappe app
```
bench --site [site name] clear-cache
bench start
```

## Uninstall app
```
bench --site [site name] remove-from-installed-apps modern_desk  
bench remove-app modern_desk  
```

NOTE that this leaves behind an entry in DB thats prevents it from being added again. You can force add it or remove that entry to add it again (table: tabModule Def).
