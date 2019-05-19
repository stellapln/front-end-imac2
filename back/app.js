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
    pool.query('SELECT ville_nom_reel, ville_code_postal FROM villes_france WHERE ville_slug LIKE ? OR ville_code_postal LIKE ? ORDER BY ville_population_2010 DESC LIMIT 10 ',[req.params.nom.toLowerCase()+"%", req.params.nom.toLowerCase()+"%"],(error, result) => {
        res.send(JSON.stringify(result));
    });
})
app.get('/crime/:ville', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    let zone = "";
    let ret = {};
    pool.query('SELECT * FROM departements, (SELECT FLOOR(ville_code_postal/1000) as cp FROM villes_france WHERE ville_slug = ?) as curdep WHERE cp = numero',[req.params.ville.toLowerCase()], (error, departementId) => {
        if(departementId.length == 0) {
            res.send(JSON.stringify({error: "La ville "+req.params.ville+" n'existe pas."}));
        }
        else {
            ret.departement = departementId
            pool.query('SELECT *, SUM(nombre) as s_nombre FROM crimes_2014 WHERE ? = dept AND nombre > 0 GROUP BY categorie ORDER BY s_nombre DESC',[departementId[0].numero], (error, result) => {
                ret.crimeForDept = result
                pool.query('SELECT id, ROUND((current_dept.n/all_dept.n)*100) as prob, all_dept.categorie as categorie FROM (SELECT id, AVG(nombre) as n, categorie FROM crimes_2014 WHERE dept = ? GROUP BY categorie) as current_dept, (SELECT AVG(nombre) as n, categorie FROM crimes_2014 GROUP BY categorie) as all_dept WHERE current_dept.categorie = all_dept.categorie ORDER BY prob DESC',[departementId[0].numero], (error, result2) => {
                    ret.probCrime = result2
                    pool.query('SELECT SUM(nombre)/pop as ratio, SUM(nombre) as nbcrime, pop FROM crimes_2014, (SELECT SUM(ville_population_2010) as pop FROM villes_france WHERE FLOOR(ville_code_postal/1000) = ?) as population WHERE dept = ?',[departementId[0].numero, departementId[0].numero], (error, result3) => {
                        ret.ratioCrimePop = result3[0];
                        res.send(JSON.stringify(ret));
                    })
                });
            });
        }
    });
})
app.get('/evolution/:id', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.query('SELECT DATE_FORMAT(date, "%m/%Y") as date, SUM(quantity) as n FROM crimes_2000_2019, crimes_2014 WHERE crimes_2014.id = ? AND libelle = categorie GROUP BY date ORDER BY date ASC ', [req.params.id], (error, result) => {
        res.send(result);
    })
})
console.log('Server ready : http://localhost:8080/');
app.listen(8080);