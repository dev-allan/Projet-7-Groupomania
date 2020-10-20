# Projet-7-Groupomania

### Cloner le dépôt

Clonez le repository via la commande `git clone https://github.com/dev-allan/Projet-7-Groupomania.git`

### Installer les dépendances

#### Dossier back-end

Pour installer les dépendances du back-end, utilisez la commande `npm install` dans le dossier _back-end_

#### Dossier front-end

Pour installer les dépendances du front-end, utilisez la commande `npm install` dans le dossier _front-end_

### Mettre en place la base de donnée

Afin de mettre en place la base de données, vous devez vous rendre dans le dossier _back-end_ et modifiez le fichier _connection.js_.
Remplissez la variable mysqlConnection par vos données de connection de votre base de données (host, user, password) :

```
var mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'projet7_development',
    multipleStatements : true
});
```

Ensuite, utilisez la commande `npx sequelize-cli db:migrate`. Cette commande mettra en place les tables nécessaires à l'utilisation de l'application dans votre base de données.

### Executez l'application

#### Dossier back-end

Utilisez la commande `node server` afin d'executer le serveur qui utilisera le *port 3000* 

#### Dossier font-end

Utilisez la commande `npm run serve` et rendez vous sur le navigateur *http://localhost:8080/*


### NOTA BENE

Pour élever les privilège d'un utilisateur, rendez-vous sur la table _utilisateurs_ et modifiez l'utilisateur concerné en modifiant la cellule de la colonne _permission_ par `Moderator`
