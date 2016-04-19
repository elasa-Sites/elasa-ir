this repo contain PHP folder files from ELASA.ir server , for merging in openshift you need to :

```

#mv  ~/app-root/data/sites ~/app-root/data/sites0



rm -rf  ~/app-root/data/sites

mkdir  ~/app-root/data/sites

cd  ~/app-root/data/sites

git clone https://github.com/elasa-Sites/elasa-ir.git

mv  elasa-ir/* .

#mv ~/app-root/runtime/repo/php-old ~/app-root/runtime/repo/php
mv ~/app-root/runtime/repo/php ~/app-root/runtime/repo/php-old

mkdir ~/app-root/runtime/repo/php

mv php/* ~/app-root/runtime/repo/php/

cd ~/app-root/runtime/repo/php/

rm -rf sites

ln -s ~/app-root/data/sites sites

cp ~/app-root/data/downloads/drupal-7.43/.htaccess  ~/app-root/runtime/repo/php/


```
### sincerly yours :

Elasa.group@gmail.com
