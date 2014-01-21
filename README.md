= getting Node
	sudo add-apt-repository -y ppa:chris-lea/node.js
	sudo apt-get install nodejs
	
= Getting dependencies
	sudo npm install -g jquery util loaddir execSync async yamljs xml2js

= Installing
# git clone
	git clone git@github.com:PortableStudios/webdave.git

# symlink to your node modules folder

mkdir /home/USER/node_modules
ln -s /var/vhosts/sandbox/webdave/webdave.js /home/USER/node_modules/webdave

= Running
# Add a webdave.yml file to your repo root. 
	remote: https://store-xxxxxx.mybigcommerce.com/dav/template/
	user: admin
	pass: passwd

# upload a list of files
    node webdave Styles/styles.css Styles/font-lato.css Snippets/ProductAddToCart.html

# or git stage the files you want to push and do 
	node webdave staged