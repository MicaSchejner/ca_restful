const crearServer = require ("../../config/server");
const crearCliente = require("./alumnoCliente");

async function testPostWithBody(cli) {
    let testFailed = false;
    let msg = "post with body: ok";

    try {
        await cli.crearAlumno({
            nombre: 'post',
            apellido: 'withbody',
            edad: 33,
            dni: '25647895'
        });
        
    } catch (err) {
        testFailed = true;
        msg = 'post with body ' + err.message;
        
    }
    return { testFailed, msg};
    
}

async function testPostWithBodyError(cli) {
    let testFailed = false;
    let msg = "post with body: ok";

    try {
        await cli.crearAlumno({
            nombre: 'post',
            edad: 33,
            dni: '25647895'
        });

    } catch (err) {
        testFailed = true;
        msg = 'post with body ' + err.message;

    }
    return { testFailed, msg };

}


async function main() {

    const tests = [
        testPostWithBody,
        testPostWithBodyError
    ];

    const app = crearServer.main();
    const serverUrl = "http://127.0.0.1";
    const RAND_PORT = 0;

    const server = app.listen(RAND_PORT, async() =>{
        const actualPort = server.address().port;
        const cli = crearCliente.crearCliente(serverUrl, actualPort);

        let done = 0;
        let passed = 0;
        let error = 0;

        console.log('corriendo test....\n');

        for (const test of tests) {
            const { testFailed, msg } = await test(cli);
            if (testFailed) {
                error ++;
                console.log(msg);
            }else{
                passed++;
                console.log(msg);
            }
            done++;
        }
        console.log(`done: ${done}`);
        console.log(`passed: ${passed}`);
        console.log(`errors: ${error}`);
    })
 
}

main();

