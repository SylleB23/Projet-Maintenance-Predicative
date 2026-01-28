const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('leMenu');
const FermerMenu = document.getElementById('FermerMenu');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});


FermerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

function Seconnecter() {
    const email = document.getElementById('email').value;
    const motdepasse = document.getElementById('motdepasse').value;
    
    if (email && motdepasse) {
        alert('Connexion réussie !');
    } else {
        alert('Veuillez remplir tous les champs');
    }
}




function suiviAjax(){
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("section").innerHTML = this.responseText; // on récupère le fichier suivi.html et on le complète avec les valeurs
        recupererNombreDrone();
        recupererNombreUtilisateur();
        recupererNombreVol();
        
      if(document.getElementById("nb_drone"))
    document.getElementById("nb_drone").addEventListener("click",recupererDonneesCapteurs);

  if(document.getElementById("nb_vol"))
    document.getElementById("nb_vol").addEventListener("click",recupererDonneesVols);

  if(document.getElementById("nb_utilisateur"))
    document.getElementById("nb_utilisateur").addEventListener("click",recupererDonneesUtilisateurs);

          
      }
    };
    xhttp.open("GET", "suivi.html");
    xhttp.send();
  }
function recupererDonneesCapteurs() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let reponseAPI = JSON.parse(this.responseText);
      var table = "<div><table class='tableau_statistique'>";
      table += "<tr class='centrer'><th>Numéro Vol</th><th>Date de Vol</th><th>Numéro Drone</th><th>Nom utilisateur</th><th>Graphe</th>";

      for (let i = 0; i < reponseAPI.length; i++) {
        let donneesCapteurs = reponseAPI[i];
        table += "<tr class='centrer'>";
        table += "<td>" + donneesCapteurs.idvol + "</td>";
        table += "<td>" + donneesCapteurs.dateVol + "</td>";
        table += "<td>" + donneesCapteurs.iddrone + "</td>";
        table += "<td>" + donneesCapteurs.idutilisateur+ "</td>";
        table += '<td><button id="button-' + reponseAPI[i].idvol+ '">Graphe </button></td>'
        table += "</tr>";
      }

      table += "</table></div>";
      
      document.getElementById("section").innerHTML = table;
      for (let i = 0; i < reponseAPI.length; i++){
      document.getElementById("button-"+ reponseAPI[i].idvol).addEventListener("click",function (){TraceGrapheFesto(reponseAPI[i].idvol)});

      }
    }
  };
  xhttp.open("GET", "http://127.0.0.1/M07_WEB/rest2.php/vol");
  xhttp.send();
}
function TraceGrapheFesto(idvol){
document.getElementById("section").innerHTML ='<canvas id="monGraphe"><canvas>';
const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
     let reponseAPI = JSON.parse(this.responseText);
     console.log(reponseAPI);

var x=[];var y=[];
for (let i = 0; i <reponseAPI.length; i++){
x[i]=reponseAPI[i].idetat;
y[i]=reponseAPI[i].h;
}

Graph(x,y);
}
  };
  xhttp.open("GET",'rest2.php/graphe/'+idvol+'/h');
  xhttp.send();
}

function recupererDonneesUtilisateurs() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let reponseAPI = JSON.parse(this.responseText);
      var table = "<div><table class='tableau_statistique'>";
      table += "<tr class='centrer'><th>ID Utilisateur</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Date de Naissance</th><th>Pseudo</th></tr>";

      for (let i = 0; i < reponseAPI.length; i++) {
        let utilisateur = reponseAPI[i];
        table += "<tr class='centrer'>";
        table += "<td>" + utilisateur.idutilisateur + "</td>";
        table += "<td>" + utilisateur.nom + "</td>";
        table += "<td>" + utilisateur.prenom + "</td>";
        table += "<td>" + utilisateur.email + "</td>";
        table += "<td>" + utilisateur.naissance + "</td>";
        table += "<td>" + utilisateur.pseudo + "</td>";
        table += "</tr>";
      }

      table += "</table></div>";
      document.getElementById("section").innerHTML = table;
    }
  };
  xhttp.open("GET", "http://127.0.0.1/M07_WEB/rest2.php/utilisateur");
  xhttp.send();
}
