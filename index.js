const crearServidor = require('./config/server');

const puerto = 3000;
const app = crearServidor.main();
const server = app.listen(puerto, () => {
    console.log(`servidor inicializado en puerto ${server.address().port} `);
});
