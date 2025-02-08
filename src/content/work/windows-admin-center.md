---
title: Centralisation des PC avec Windows Admin Center et Traccar
publishDate: 2023-10-01 00:00:00
img: /assets/windows-admin-center.jpg
img_alt: Illustration de Windows Admin Center
description: |
  Ce guide explique comment centraliser la gestion des PC en utilisant Windows Admin Center et Traccar pour le suivi de localisation.
tags:
  - Windows Admin Center
  - Traccar
  - Gestion des PC
  - Localisation
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
  # Centralisation des PC avec Windows Admin Center et Traccar

  Dans cette documentation, nous allons centraliser la gestion des PC en utilisant Windows Admin Center et Traccar pour le suivi de localisation.

  ---

## 1. Installer Windows Admin Center

### Étape 1 : Télécharger et installer Windows Admin Center

1. **Télécharger Windows Admin Center**  
   Téléchargez Windows Admin Center depuis le site officiel de Microsoft.

2. **Installer Windows Admin Center**  
   Exécutez le fichier d'installation et suivez les instructions de l'assistant d'installation.  
   Sélectionnez **Déployer comme passerelle de bureau à distance** si vous prévoyez d'accéder à Windows Admin Center depuis d'autres appareils.

3. **Configurer l'accès**  
   Ouvrez un navigateur web et accédez à Windows Admin Center via l'adresse fournie (généralement `https://[NomDuServeur]:[Port]`).  
   Connectez-vous en utilisant les identifiants administrateur du domaine.

---

### Étape 2 : Configurer les stratégies de groupe pour la localisation

1. **Ouvrir la console GPMC**  
   Ouvrez la console de gestion des stratégies de groupe (GPMC) sur le contrôleur de domaine.

2. **Créer une nouvelle GPO**  
   Cliquez droit sur votre domaine ou l'OU cible et sélectionnez **Créer un objet de stratégie de groupe dans ce domaine et le lier ici...**.  
   Nommez la GPO et cliquez sur **OK**.

3. **Configurer les paramètres de localisation**  
   Cliquez droit sur la GPO créée et sélectionnez **Modifier**.  
   Ajoutez et configurez les paramètres nécessaires pour activer la localisation des appareils.

---

### Étape 3 : Visualiser la localisation en temps réel

1. **Configurer Windows Admin Center pour afficher la localisation**  
   Ouvrez Windows Admin Center et accédez à l'interface de gestion des appareils.  
   Configurez les options de localisation dans les paramètres de chaque appareil pour activer le suivi en temps réel.

2. **Surveiller et maintenir les PC**  
   Utilisez Windows Admin Center pour surveiller l'état et la localisation des PC en temps réel.  
   Configurez des alertes pour être informé des changements de localisation ou des problèmes potentiels.

---

## 2. Installer et configurer Traccar

### Étape 1 : Préparer l'environnement

1. **Télécharger Traccar**  
   Téléchargez Traccar depuis le site officiel (traccar.org) pour Windows.

2. **Installer Traccar**  
   Exécutez le fichier d'installation et suivez les instructions de l'assistant d'installation.  
   Traccar démarre en tant que service Windows par défaut.

---

### Étape 2 : Configurer Traccar

1. **Accéder à l'interface web**  
   Ouvrez un navigateur web et accédez à Traccar via l'adresse `http://localhost:8082`.  
   Connectez-vous avec l'identifiant par défaut (`admin`) et le mot de passe (`admin`).

2. **Configurer les utilisateurs**  
   Dans l'interface web, allez dans **Administration > Utilisateurs**.  
   Créez des comptes pour chaque utilisateur ou appareil que vous souhaitez suivre.

3. **Ajouter les appareils**  
   Allez dans **Appareils** et cliquez sur **Ajouter**.  
   Entrez les informations nécessaires pour chaque PC, y compris l'identifiant unique de l'appareil.

---

### Étape 3 : Configurer les PC pour le suivi

1. **Installer le client Traccar sur chaque PC**  
   Téléchargez le client Traccar pour Windows depuis le site officiel.  
   Installez le client sur chaque PC que vous souhaitez suivre.

2. **Configurer le client Traccar**  
   Ouvrez l'application Traccar sur chaque PC.  
   Entrez l'adresse du serveur (par exemple, `http://[AdresseIPDuServeur]:8082`) et l'identifiant de l'appareil configuré précédemment.

---

### Étape 4 : Visualiser la localisation en temps réel

1. **Accéder à la carte**  
   Dans l'interface web de Traccar, allez dans **Carte**.  
   Vous pourrez voir la localisation des PC en temps réel sur une carte.

---

## Points à considérer

- **Confidentialité et sécurité** : Assurez-vous que les utilisateurs sont informés et consentent à la collecte de leurs données de localisation.
- **Exactitude des données** : La précision des données de localisation peut varier en fonction de la méthode utilisée et de la configuration du réseau.

---

### Télécharger la documentation

Si vous souhaitez télécharger cette documentation au format PDF, cliquez sur le bouton ci-dessous :

<a href="/public/assets/annexes/Windows Admin Center & Traccar.pdf.pdf" download="Windows Admin Center & Traccar.pdf">
  <button style="background-color: #7611a6; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 5px;">
    Télécharger la documentation
  </button>
</a>