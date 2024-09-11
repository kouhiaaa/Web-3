var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());

var cors = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(cors);

/************************************/
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // ÄLÄ KOSKAAN käytä root:n tunnusta tuotannossa
    password: 'root',
    database: 'customer',
    dateStrings: true
});

const executeSQL = (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, function (error, results, fields) {
            error ? reject(error) : resolve(results);
        });
    })
}
module.exports = {

    initializeDatabase: async () => {

        await executeSQL("delete from asiakas", []);
        await executeSQL("delete from asiakastyyppi", []);

		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (1, 'KALLE TAPPINEN', 'OPISTOTIE 2', '70100', 'KUOPIO', '2011-12-01', 1, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (2, 'VILLE VALLATON', 'MICROKATU 2', '70100', 'KUOPIO', '2011-12-03', 2, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (3, 'Kalle Östilä', 'Teku', '70100', 'Kuopio', '2018-09-22', 1, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (4, 'Keke Amstrong', 'Viasat', '00010', 'Tsadi', '2018-09-22', 2, 'xx', 'ss')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (7, 'Pasi Rautiainen', 'Viaplay', '89100', 'Rovaniemi', '2018-09-22', 1, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (8, 'mauri', 'Toivalantie 25', '7100', 'Siili', '2018-09-22', 2, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (11, 'Ã„mmÃ¤lÃ¤ Ã„ijÃ¤', 'Kotipolku 8', '71820', 'JOssain', '2018-09-25', 2, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (12, 'Ã„mmÃ¤lÃ¤ Ã„ijÃ¤', 'Kotipolku 8', '71820', 'JOssain', '2018-09-25', 2, 'Tunnus', 'Salasana')", []);
		await executeSQL("insert into asiakas (AVAIN, NIMI, OSOITE, POSTINRO, POSTITMP, LUONTIPVM, ASTY_AVAIN, Tunnus, Salasana) values (13, 'Ämmälä', 'Kotipolku 8', '71820', 'JOssain', '2018-09-25', 2, 'Tunnus', 'Salasana')", []);

		await executeSQL("insert into asiakastyyppi (AVAIN, LYHENNE, SELITE) values (1, 'YA', 'YRITYSASIAKAS')", []);
		await executeSQL("insert into asiakastyyppi (AVAIN, LYHENNE, SELITE) values (2, 'KA', 'KULUTTAJA ASIAKAS')", []);
    }

}