// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 2000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost', // ou votre hôte de base de données
    user: 'root',      // votre utilisateur de base de données
    password: '',      // votre mot de passe
    database: 'medoc' // changez cela en votre nom de base de données
});

// Vérifier la connexion
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données:', err);
        return;
    }
    console.log('Connecté à la base de données MySQL');
});

// API pour ajouter un médicament
app.post('/medicaments', (req, res) => {
    const { nom, date_expiration, prix_unitaire, categorie, forme_pharmaceutique, famille, concentration } = req.body;

    const sql = `INSERT INTO medicaments (nom, date_expiration, prix_unitaire, categorie, forme_pharmaceutique, famille, concentration) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nom, date_expiration, prix_unitaire, categorie, forme_pharmaceutique, famille, concentration], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion:', err);
            return res.status(500).send('Erreur lors de l\'insertion du médicament');
        }
        res.status(201).json({ id: result.insertId, nom });
    });
});

// Récupérer les médicaments actifs uniquement
app.get('/medicaments', (req, res) => {
    const sql = `SELECT * FROM medicaments WHERE status = 'actif'`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des médicaments:', err);
            return res.status(500).send('Erreur lors de la récupération des médicaments');
        }
        res.json(results);
    });
});


// API pour mettre à jour un médicament
app.put('/medicaments/:id', (req, res) => {
    const { id } = req.params; // Récupérer l'id du médicament à partir des paramètres de l'URL
    const { nom, date_expiration, prix_unitaire, categorie, forme_pharmaceutique, famille, concentration } = req.body;

    const sql = `UPDATE medicaments SET nom = ?, date_expiration = ?, prix_unitaire = ?, categorie = ?, forme_pharmaceutique = ?, famille = ?, concentration = ? WHERE id = ?`;
    db.query(sql, [nom, date_expiration, prix_unitaire, categorie, forme_pharmaceutique, famille, concentration, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour:', err);
            return res.status(500).send('Erreur lors de la mise à jour du médicament');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Médicament non trouvé');
        }
        res.json({ message: 'Médicament mis à jour avec succès' });
    });
});
app.delete('/medicaments/:id', (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE medicaments SET status = 'supprimé' WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du statut du médicament:', err);
            return res.status(500).send('Erreur lors de la mise à jour du statut du médicament');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Médicament non trouvé');
        }
        res.json({ message: 'Médicament supprimé (logiquement) avec succès' });
    });
});





// Ajouter une entrée de médicament
app.get('/entrees', (req, res) => {
    const sql = 'SELECT * FROM entrees';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des entrées:', err);
            return res.status(500).send('Erreur lors de la récupération des entrées');
        }
        res.json(results);
    });
});

// API pour ajouter une entrée
app.post('/entrees', (req, res) => {
    const { medicament_id, quantite, date , nom_medicament } = req.body;

    const sql = `INSERT INTO entrees (medicament_id, quantite, date,nom_medicament) VALUES (?, ?, ?,?)`;
    db.query(sql, [medicament_id, quantite, date,nom_medicament], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion:', err);
            return res.status(500).send('Erreur lors de l\'insertion de l\'entrée');
        }
        res.status(201).json({ id: result.insertId, medicament_id, quantite, date });
    });
});


app.put('/entrees/:id', (req, res) => {
    const { id } = req.params;
    const { medicament_id, quantite, date, nom_medicament } = req.body;

    const sql = `UPDATE entrees SET medicament_id = ?, quantite = ?, date = ?, nom_medicament = ? WHERE id = ?`;
    db.query(sql, [medicament_id, quantite, date, nom_medicament, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'entrée:', err);
            return res.status(500).send('Erreur lors de la mise à jour de l\'entrée');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Entrée non trouvée');
        }
        res.status(200).json({ id, medicament_id, quantite, date, nom_medicament });
    });
});


app.delete('/entrees/:id', (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM entrees WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression de l\'entrée:', err);
            return res.status(500).send('Erreur lors de la suppression de l\'entrée');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Entrée non trouvée');
        }
        res.status(204).send(); // No content
    });
});


// Afichage  une sortie de médicament
app.get('/sorties', (req, res) => {
    const sql = 'SELECT * FROM sorties';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des sorties:', err);
            return res.status(500).send('Erreur lors de la récupération des sorties');
        }
        res.status(200).json(results);
    });
});


// Ajouter une sortie de médicament
app.post('/sorties', (req, res) => {
    const { medicament_id, quantite, date } = req.body;

    // Requête SQL pour insérer une sortie
    const sql = `INSERT INTO sorties (medicament_id, quantite, date) VALUES (?, ?, ?)`;
    
    // Note : Assurez-vous de définir le type comme 'sortie' dans la requête
    db.query(sql, [medicament_id, quantite, date, ], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion:', err);
            return res.status(500).send('Erreur lors de l\'insertion de la sortie');
        }
        res.status(201).json({ id: result.insertId, medicament_id, quantite, date });
    });
});
app.put('/sorties/:id', (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la sortie à mettre à jour
    const { medicament_id, quantite, date } = req.body;

    // Requête SQL pour mettre à jour une sortie
    const sql = `UPDATE sorties SET medicament_id = ?, quantite = ?, date = ? WHERE id = ?`;

    db.query(sql, [medicament_id, quantite, date, id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour:', err);
            return res.status(500).send('Erreur lors de la mise à jour de la sortie');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Sortie non trouvée');
        }
        res.status(200).json({ id, medicament_id, quantite, date });
    });
});
app.delete('/sorties/:id', (req, res) => {
    const { id } = req.params; // Récupérer l'ID de la sortie à supprimer

    // Requête SQL pour supprimer une sortie
    const sql = `DELETE FROM sorties WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de la suppression:', err);
            return res.status(500).send('Erreur lors de la suppression de la sortie');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Sortie non trouvée');
        }
        res.status(204).send(); // Renvoie un code 204 No Content
    });
});



// Récupérer l'historique des mouvements
// Récupérer l'historique des mouvements
app.get('/entrees_sorties', async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM entrees_sorties');
        res.status(200).send(results);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
        res.status(500).send({ message: 'Erreur lors de la récupération de l\'historique', error: error.message });
    }
});




// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
