# Add a webdave.yml file to your repo root. 

	remote: https://store-xxxxxx.mybigcommerce.com/dav/template/
	user: admin
	pass: passwd

# upload a list of files

    node webdave Styles/styles.css Styles/font-lato.css Snippets/ProductAddToCart.html

# or git stage the files you want to push and do 

	node webdave staged