<?php
header("Content-Type: application/json");

try {
    // Connexion à la base de données
    $pdo = new PDO(
        "mysql:host=172.18.201.103;dbname=festo;charset=utf8", "sylleman","festo"
    );
} catch (PDOException $erreurmec) {
    http_response_code(500);
    echo json_encode(["erreur" => "Connexion base de données échouée"]);
    exit;
}

$req_type = $_SERVER['REQUEST_METHOD'];
$cheminURL = $_SERVER['PATH_INFO'] ?? '/';
$cheminURL_tableau = explode('/', trim($cheminURL, '/'));

// GESTION DU POST (Connexion)

if ($req_type === 'POST') {
    // Lecture du JSON envoyé par Festo.js
$json = file_get_contents('php://input');
$donneesRecues = json_decode($json, true);
    
$email = $donneesRecues['email'] ?? '';
$motdepasse = $donneesRecues['motdepasse'] ?? '';

if (!empty($email) && !empty($motdepasse)) {
// va dans la bd et recherche email et mdp
$requete = $pdo->prepare("SELECT * FROM utilisateur WHERE email = ? AND mdp = ?");
    $requete->execute([$email, $motdepasse]);
$user = $requete->fetch(PDO::FETCH_ASSOC);

if ($user) {
// Réponse attendue par Festo.js
    echo json_encode([
    "status" => "success",
    "user" => $user['nom']
     ]);
} 
    
else {
http_response_code(401);
echo json_encode(["status" => "error", "message" => "Email ou mot de passe incorrect"]);
    }
} 
else {
http_response_code(400);
echo json_encode(["status" => "error", "message" => "Veuillez remplir tous les champs"]);
    }
    exit;
}

// GESTION DU GET qui récupération les données en les lisant et en verifiant si elles sont bien presentes dans la BD

if ($req_type === 'GET') {
    if (isset($cheminURL_tableau[0]) && $cheminURL_tableau[0] === 'utilisateur') {
        $requete = $pdo->prepare("SELECT * FROM utilisateur");
        $requete->execute();
        echo json_encode($requete->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    http_response_code(404);
    echo json_encode(["erreur" => "La route du GET inconnue"]);
    exit;
}

// Si la méthode n'est ni GET ni POST
http_response_code(405);
echo json_encode(["erreur" => "Méthode interdite"]);