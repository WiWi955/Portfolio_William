---
title: Installation d'un serveur LAMP sous Debian 12
publishDate: 2023-10-01 00:00:00
img: /assets/lamp-server.jpg
img_alt: Illustration d'un serveur LAMP
description: |
  Ce guide vous explique comment installer et configurer un serveur LAMP (Linux, Apache, MariaDB, PHP) sous Debian 12 pour héberger un site web.
tags:
  - Serveur
  - Debian
  - LAMP
  - Apache
  - MariaDB
  - PHP
---

<!-- Formulaire de mot de passe -->
<script>
  document.addEventListener('DOMContentLoaded', function() {
    const correctPassword = "0955"; // Remplacez par votre mot de passe
    const passwordForm = document.getElementById('password-form');
    const content = document.getElementById('content');
    const passwordProtected = document.getElementById('password-protected');

    passwordForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const enteredPassword = document.getElementById('password').value;

      if (enteredPassword === correctPassword) {
        content.style.display = 'block';
        passwordProtected.style.display = 'none';
      } else {
        alert('Mot de passe incorrect');
      }
    });
  });
</script>

<!-- Styles pour harmoniser le formulaire -->
<style>
#password-protected {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent; /* Utiliser rgba pour la transparence */
}

  
  #password-form {
    background: #fff;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  
  #password-form label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  #password-form input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 20px; /* Bordures arrondies */
    background-color: transparent; /* Fond transparent */
  }
  
  #password-form button {
    background-color: #7611a6;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 16px;
  }
  
  #password-form button:hover {
    background-color: #520873;
  }
</style>

<!-- Contenu masqué initialement -->
<div id="password-protected">
  <form id="password-form">
    <label for="password">Entrez le mot de passe :</label>
    <input type="password" id="password">
    <button type="submit">Soumettre</button>
  </form>
</div>

<div id="content" style="display: none;">
  # Installation d'un serveur LAMP sous Debian 12

  Dans cette documentation, nous allons créer un serveur Web "LAMP" sous Debian 12 afin de pouvoir héberger un site Internet.

  ---

  ### 1. Mettre à jour le système

  Pour mettre à jour la liste des paquets disponibles et installer les dernières versions des paquets déjà installés, exécutez les commandes suivantes :  

  ```bash
  sudo apt update  
  sudo apt upgrade -y




 ```

---

### 2. Configurer une adresse IP statique

Ouvrez le fichier de configuration des interfaces réseau pour édition :  
 ```bash
sudo nano /etc/network/interfaces
 ```

Ajoutez ou modifiez la configuration suivante pour définir une adresse IP statique :  
 ```bash
auto eth0
iface eth0 inet static
address 192.168.102.110
netmask 255.255.255.0
gateway 192.168.102.1
dns-nameservers 8.8.8.8 8.8.4.4
 ```

Redémarrez les services réseau pour appliquer la nouvelle configuration :  
 ```bash
sudo systemctl restart networking
 ```

---

### 3. Installer Apache

Installez le serveur web Apache :  
 ```bash
sudo apt install apache2 -y
 ```

Vérifiez l'état du service Apache :  
 ```bash
sudo systemctl status apache2
 ```

---

### 4. Installer MariaDB

Installez le serveur de base de données MariaDB :  
 ```bash
sudo apt install mariadb-server -y
 ```

Lancez l'utilitaire de sécurité pour configurer MariaDB :  
 ```bash
sudo mysql_secure_installation
 ```

Vérifiez l'état du service MariaDB :  
 ```bash
sudo systemctl status mariadb
 ```

---

### 5. Installer PHP

Installez PHP et le module PHP pour Apache :  
 ```bash
sudo apt install php libapache2-mod-php -y
 ```

Vérifiez la version de PHP installée :  
 ```bash
php -v
 ```

---

### 6. Configurer Apache pour utiliser PHP

Créez un fichier de test PHP pour vérifier que PHP fonctionne correctement avec Apache :  
 ```bash
echo "<?php phpinfo(); ?>" | sudo tee /var/www/html/info.php
 ```

Ouvrez votre navigateur et allez à `http://192.168.102.110/info.php` pour voir la page d'information PHP.

---

### 7. Activer le module rewrite

Activez le module `mod_rewrite` pour permettre la réécriture des URL :  
 ```bash
sudo a2enmod rewrite
 ```

---

### 8. Redémarrer Apache

Redémarrez le service Apache pour appliquer les modifications :  
 ```bash
sudo systemctl restart apache2
 ```

---

### 9. Configurer les fichiers de configuration Apache pour permettre les réécritures

Ouvrez le fichier de configuration du site par défaut d'Apache pour édition :  
 ```bash
sudo nano /etc/apache2/sites-available/000-default.conf
 ```

Ajoutez ou modifiez la configuration suivante pour permettre les réécritures :  
 ```bash
<Directory /var/www/html>
AllowOverride All
</Directory>
 ```

---

### 10. Redémarrer Apache à nouveau

Redémarrez le service Apache pour appliquer les modifications :  
 ```bash
sudo systemctl restart apache2
 ```

---

### 11. Créer des fichiers pour la page d'inscription et de connexion

Créez un fichier pour la page d'inscription :  
 ```bash
sudo nano /var/www/html/inscription.php
 ```

Créez un fichier pour la page de connexion :  
 ```bash
sudo nano /var/www/html/connexion.php
 ```

Vous pouvez accéder à ces pages web via :  
- `http://192.168.102.110/inscription.php`  
- `http://192.168.102.110/connexion.php`

---

### 12. Importer la base de données

Ouvrez une session MySQL en tant qu'utilisateur root :  
 ```bash
sudo mysql -u root -p
 ```

Créez la base de données :  
 ```sql
CREATE DATABASE users-base1;
 ```

Utilisez la base de données créée :  
 ```sql
USE users-base1;
 ```

Créez la table :  
 ```sql
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
id int NOT NULL AUTO_INCREMENT,
nom varchar(140) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
prenom varchar(140) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
email varchar(140) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
password text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

COMMIT;
 ```

---

Ce guide vous a permis d'installer et de configurer un serveur LAMP sous Debian 12. Vous pouvez maintenant héberger votre site web et gérer les utilisateurs via la base de données MariaDB.

### Télécharger la documentation

Si vous souhaitez télécharger cette documentation au format PDF, cliquez sur le bouton ci-dessous :

<a href="/public/assets/annexes/Documentation_LAMP_Debian12.pdf" download="Documentation_LAMP_Debian12.pdf">
  <button style="background-color: #7611a6; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;">
    Télécharger la documentation
  </button>
</a>
