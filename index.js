const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cors = require('cors');

var sql = require("mssql");
var query = require("mssql");

// config for your database
var config = {
    user: 'sa',
    password: 'Contpaqi.',
    server: 'localhost\\COMPAC', 
    database: 'DCAdmin' 
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.get('/users',(req,res)=>{
    sql.connect(config, function (err) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from usuarios', function (err, recordset) {
            if (err) console.log(err)
            // send records as a response
            res.json(recordset.recordset);
            sql.close();
        });
    });
});
app.post('/users', (req, res)=> {
var datos=req.body;
var name=datos.Nombre;
var lastname1=datos.Apellidop;
var lastname2=datos.Apellidom;
var usuario=datos.usuario;
var contra=datos.contra;
var typeuser=datos.Tusuario;
var Tel=datos.Telefono;
var foto=null;
var perfil=datos.id_perfil;
query.connect(config, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query("insert into usuarios (Nombre, Apellidop, Apellidom, usuario, contra, Tusuario, Telefono, foto, id_perfil)"+
    " values ('"+name+"','"+lastname1+"','"+lastname2+"','"+usuario+"','"+contra+"','"+typeuser+"','"+Tel+"','"+foto+"','"+perfil+"')", function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        query.close();
    });
});

});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



var server = app.listen(3001, function () {
    console.log('Server is running..');
});