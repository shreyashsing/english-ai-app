// nlpService.js
const { spawn } = require('child_process');

function analyzeText(text) {
    return new Promise((resolve, reject) => {
        const process = spawn('python', ['path/to/your/script.py', text]);

        let result = '';
        process.stdout.on('data', (data) => {
            result += data.toString();
        });

        process.stderr.on('data', (data) => {
            reject(data.toString());
        });

        process.on('close', (code) => {
            if (code !== 0) {
                reject(`Process exited with code: ${code}`);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { analyzeText };
