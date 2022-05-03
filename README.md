# Quoi ? Feur.
Petit bot discord qui répond "feur" quand on envoie un message finissant par le son "quoi". Le message contient également un émoji aléatoire du serveur.
Mentionner le bot permet d'obtenir le nombre de fois où il a répondu à la personne depuis le dernier lancement du bot.

## Installation
```
git clone https://github.com/MaximeDrml/QuoiFeurBot
cd ./QuoiFeurBot
npm install
```

Mettre le token de bot dans un fichier `.env` comme dans `.env.example`

## Lancer le bot
```
npm start
```

### TODO

- Ajouter un leaderboard par serveur
- Connecter le bot à une BD pour ne pas perdre les scores si le bot est déconnecté.