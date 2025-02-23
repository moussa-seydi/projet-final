// Sélectionner le formulaire par son ID
document.getElementById('contactForm').addEventListener('submit', function (event) {
    // Empêcher le comportement par défaut du formulaire (rechargement de la page)
    event.preventDefault();

    // Récupérer les valeurs des champs du formulaire
    const nom = document.getElementById('nom').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Variable pour stocker les erreurs
    let errors = [];

    // Validation du champ "Nom"
    if (!nom) {
        errors.push("Le champ 'Nom' est obligatoire.");
    }

    // Validation du champ "Email"
    if (!email) {
        errors.push("Le champ 'Email' est obligatoire.");
    } else if (!validateEmail(email)) {
        errors.push("Veuillez entrer une adresse e-mail valide.");
    }

    // Validation du champ "Message"
    if (!message) {
        errors.push("Le champ 'Message' est obligatoire.");
    }

    // Afficher les erreurs si elles existent
    if (errors.length > 0) {
        alert(errors.join("\n")); // Afficher chaque erreur dans une nouvelle ligne
        return; // Arrêter l'exécution du script
    }

    // Simuler l'envoi du formulaire avec une requête AJAX (ou fetch API)
    simulateFormSubmission(nom, email, message);
});

// Fonction pour valider l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Fonction pour simuler l'envoi du formulaire
function simulateFormSubmission(nom, email, message) {
    // Créer un objet contenant les données du formulaire
    const formData = {
        nom: nom,
        email: email,
        message: message
    };

    // Utiliser la méthode fetch pour envoyer les données au serveur
    fetch('contact.php', { // Remplacez 'contact.php' par l'URL de votre back-end
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Traiter la réponse JSON du serveur
        } else {
            throw new Error('Une erreur s\'est produite lors de l\'envoi du message.');
        }
    })
    .then(data => {
        // Réinitialiser le formulaire après succès
        document.getElementById('contactForm').reset();
        alert('Votre message a été envoyé avec succès !');
    })
    .catch(error => {
        // Gérer les erreurs
        console.error('Erreur :', error.message);
        alert('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    });
}