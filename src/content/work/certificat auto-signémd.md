---
title: Signature d'un script PowerShell avec un certificat auto-signé
publishDate: 2025-02-11 00:00:00
img: /assets/powershell-certificate.jpg
img_alt: Signature d'un script PowerShell
description: |
  Ce guide vous explique comment créer et utiliser un certificat auto-signé pour signer un script PowerShell.
tags:
  - PowerShell
  - Certificat
  - Signature
  - Sécurité
---

### Étape 1 : Créer un nouveau certificat auto-signé
1. **Ouvrez PowerShell en tant qu'administrateur.**
2. **Exécutez la commande suivante pour créer un certificat auto-signé avec une clé privée exportable :**
   ```powershell
   New-SelfSignedCertificate -CertStoreLocation Cert:\LocalMachine\My -Subject "CN=NewCertificat" -KeyUsage DigitalSignature -Type CodeSigningCert -KeyExportPolicy Exportable
   ```
   *Vous pouvez changer "CN=NewCertificat" pour personnaliser le nom du certificat.*

### Étape 2 : Obtenir l'empreinte du certificat
1. **Exécutez la commande suivante pour obtenir l'empreinte du nouveau certificat :**
   ```powershell
   Get-ChildItem -Path Cert:\LocalMachine\My
   ```
2. **Notez l'empreinte du certificat (Thumbprint).** Par exemple, l'empreinte pourrait être `8106CB7FB65ADF929B517D750F52EE3A6811FE7F`.

### Étape 3 : Exporter le certificat
1. **Remplacez `8106CB7FB65ADF929B517D750F52EE3A6811FE7F` par l'empreinte réelle obtenue à l'étape précédente.**
2. **Exécutez la commande suivante pour exporter le certificat :**
   ```powershell
   $thumbprint = "8106CB7FB65ADF929B517D750F52EE3A6811FE7F"
   Export-PfxCertificate -Cert "Cert:\LocalMachine\My\$thumbprint" -FilePath "C:\powershell\newcertificat.pfx" -Password (ConvertTo-SecureString -String "PROTEC95870production$" -Force -AsPlainText)
   ```
   *Vous pouvez changer le chemin du fichier "C:\powershell\newcertificat.pfx" et le mot de passe "PROTEC95870production$".*

### Étape 4 : Importer le certificat
1. **Exécutez la commande suivante pour importer le certificat dans le magasin de certificats de l'utilisateur actuel :**
   ```powershell
   Import-PfxCertificate -FilePath "C:\powershell\newcertificat.pfx" -CertStoreLocation Cert:\CurrentUser\My -Password (ConvertTo-SecureString -String "PROTEC95870production$" -Force -AsPlainText)
   ```
   *Assurez-vous que le chemin du fichier et le mot de passe correspondent à ceux utilisés lors de l'exportation.*

### Étape 5 : Ajouter Signtool.exe au chemin d'accès (PATH)
1. **Ouvrez PowerShell en tant qu'administrateur.**
2. **Ajoutez le chemin d'accès à Signtool.exe à la variable d'environnement PATH :**
   ```powershell
   $path = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::Machine)
   $path += ";C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64"
   [System.Environment]::SetEnvironmentVariable("Path", $path, [System.EnvironmentVariableTarget]::Machine)
   ```
   *Vous pouvez changer le chemin si Signtool.exe est installé dans un autre répertoire.*

### Étape 6 : Signer le script avec Signtool.exe
1. **Ouvrez une nouvelle invite de commande (CMD) avec les privilèges d'administrateur.**
2. **Exécutez la commande suivante pour signer votre script :**
   ```cmd
   "C:\Program Files (x86)\Windows Kits\10\bin\10.0.26100.0\x64\signtool.exe" sign /f C:\powershell\newcertificat.pfx /p PROTEC95870production$ /fd SHA256 /tr http://timestamp.digicert.com /td SHA256 C:\powershell\synchroniser_ad.ps1
   ```
   *Vous pouvez changer le chemin du fichier, le mot de passe et le chemin du script si nécessaire.*

### Étape 7 : Vérifier la signature
1. **Ouvrez PowerShell en tant qu'administrateur.**
2. **Exécutez la commande suivante pour vérifier la signature du script :**
   ```powershell
   Get-AuthenticodeSignature -FilePath "C:\powershell\synchroniser_ad.ps1"
   ```
   *Vous pouvez changer le chemin du script si nécessaire.*

---

Ce guide vous a permis de créer et d'utiliser un certificat auto-signé pour signer un script PowerShell. Vous pouvez maintenant sécuriser vos scripts en toute confiance.
