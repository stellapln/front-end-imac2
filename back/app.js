const express = require('express');
var http = require('http');

var app = express();

const pool = require('./config/config');

app.get('/', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.query('SELECT * FROM departements WHERE numero = ?', ["55"],(error, result) => {
        res.send(JSON.stringify(result));
    });
})
app.get('/departement/:numero', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    // res.send(req.params.numero);
    pool.query('SELECT * FROM departements WHERE numero = ?', [req.params.numero],(error, result) => {
        res.send(JSON.stringify(result));
    });
})
app.get('/ville/:nom', function(req, res) {
    // res.send(req.params.numero);
    pool.query('SELECT * FROM villes_france WHERE ville_slug = ?', [req.params.nom.toLowerCase()],(error, result) => {
        res.setHeader('Access-Control-Allow-Origin','*')
        res.send(JSON.stringify(result));
    });
})
app.get('/ville_autocomplete/:nom', function(req, res) {
    res.setHeader('access-control-allow-origin','*')
    // res.send(req.params.numero);
    pool.query('SELECT ville_nom_reel as nom FROM villes_france WHERE ville_slug LIKE ? ORDER BY ville_population_2010 DESC LIMIT 10',[req.params.nom.toLowerCase()+"%"],(error, result) => {
        res.send(JSON.stringify(result));
    });
})
app.get('/crime/:ville', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    let zone = "";
    let ret = {};
    pool.query('SELECT * FROM departements, (SELECT FLOOR(ville_code_postal/1000) as cp FROM villes_france WHERE ville_slug = ?) as curdep WHERE cp = numero',[req.params.ville.toLowerCase()], (error, departementId) => {
        ret.departement = departementId
        pool.query('SELECT *, SUM(nombre) as s_nombre FROM crimes_2014 WHERE ? = dept AND nombre > 0 GROUP BY categorie ORDER BY s_nombre DESC',[departementId[0].numero], (error, result) => {
            ret.crimeForDept = result
            pool.query('SELECT ROUND((current_dept.n/all_dept.n)*100) as prob, all_dept.categorie as categorie FROM (SELECT AVG(nombre) as n, categorie FROM crimes_2014 WHERE dept = ? GROUP BY categorie) as current_dept, (SELECT AVG(nombre) as n, categorie FROM crimes_2014 GROUP BY categorie) as all_dept WHERE current_dept.categorie = all_dept.categorie ORDER BY prob DESC',[departementId[0].numero], (error, result2) => {
                ret.probCrime = result2
                res.send(JSON.stringify(ret));
            });
        });
    });
})
console.log('Server ready : http://localhost:8080/');
app.listen(8080);