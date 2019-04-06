projet jeu
1 étape: 
le serveur express sert des fichiers statiques et des fichiers pug.
Il est installé sur un vps, sur Debian 9
Plusieurs serveurs sont installés sur différent portes, 
dont Mongo
Coté serveur, pm2 sert comme daemon à les relancer, (avec une configuration startup).
Coté prod, je n'utilise pas pm2, qui n'est pas inclus dans ce commit.