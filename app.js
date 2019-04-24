const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/rust', (req, res) => {
    exec(
        'Cargo build --target wasm32-unknown-unknown',
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            let file;

            try {
                file = fs.readFileSync(
                    `${__dirname}/target/wasm32-unknown-unknown/debug/rust_module.wasm`
                );
            } catch (e) {
                console.log(e);
            }

            res.writeHead(200, { 'Content-Type': 'application/wasm' });
            res.end(file);
        }
    );
});

app.listen(port, () =>
    console.log(`Server running at http://127.0.0.1:${port}`)
);
