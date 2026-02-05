<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription - Maintenance Prédictive</title>
    <link rel="stylesheet" href="connexion.css">
</head>
<body>
    <div class="ContenuBlocConnexion">
        <h2>Inscription</h2>
        <form id="loginForm" onsubmit="event.preventDefault(); Seconnecter();">
             <div class="forme">
                <label for="NomUser">Nom</label>
                <input type="NomUser" id="NomUser" placeholder="Baby" required>
            </div>
             <div class="forme">
                <label for="PrenomUser">Prenom</label>
                <input type="PrenomUser" id="PrenomUser" placeholder="Souly" required>
            </div>
             <div class="forme">
                <label for="PseudoUser">Pseudonyme</label>
                <input type="PseudoUser" id="PseudoUser" placeholder="Souly94" required>
            </div>
            <div class="forme">
                <label for="email">Email</label>
                <input type="email" id="email" placeholder="votre@email.com" required>
            </div>
            <div class="forme">
                <label for="motdepasse">Mot de passe</label>
                <input type="password" id="motdepasse" placeholder="••••••••" required>
            </div>
            <div id="errorMessage"></div>
            <button type="submit">S'inscrire</button>
        </form>

    <script src="Festo.js"></script>
</body>
</html>