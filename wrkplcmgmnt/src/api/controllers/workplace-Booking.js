const db = require('../db');  


exports.getAllWorkplaces = (req, res) => {
    db.query('SELECT * FROM workplaces', (err, results) => {
        if (err) {
            console.error('Fehler bei der Abfrage der Arbeitsplätze:', err);
            return res.status(500).send('Fehler bei der Abfrage der Arbeitsplätze');
        }
        res.json(results);  
    });
};


exports.getWorkplaceById = (req, res) => {
    const { id } = req.params;


    db.query('SELECT * FROM workplaces WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Fehler bei der Abfrage des Arbeitsplatzes:', err);
            return res.status(500).send('Fehler bei der Abfrage des Arbeitsplatzes');
        }

        if (results.length === 0) {
            return res.status(404).send('Arbeitsplatz nicht gefunden');
        }

        res.json(results[0]);  
    });
};