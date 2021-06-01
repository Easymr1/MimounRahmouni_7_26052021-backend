const mysql = require('mysql');

require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
});

db.connect(err => {
    if (err) {
        console.log('Not Connected');
        return;
    }
    console.log('MySQL Connected');
})


exports.signup = (req, res, next) => {

    let post = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        image_url: req.body.image_url,
    };

    let sql = 'INSERT INTO employes SET ?'
    db.query(sql, post, err => {
        if (err) {
            console.log('Probleme à la création de employee', err)
        }
        console.log(sql, post)

        res.send('Employee crée')
    })
};

exports.login = (req, res) => {
    let sql = `SELECT * FROM employes WHERE email='${req.body.email}'`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(400).json({ error: 'Une erreur c\'est produit !' });
        }
        if (results == '') {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        res.send(results)
    })
}

exports.updateEmploye = (req, res) => {
    let newName = 'Lee';
    let sql = `UPDATE employes SET firstname = '${newName}' WHERE id = ${req.params.id}`;
    db.query(sql, err => {
        if (err) {
            console.log('Modification echouer', err)
        }
        res.send('Modification réussi')
    })
}

exports.deleteEmploye = (req, res) => {
    let sql = `DELETE FROM employes WHERE id = ${req.params.id}`;
    db.query(sql, err => {
        if (err) {
            console.log('Employer non supprimer', err)
        }
        res.send('Employer supprimer avec succés');
    })
}