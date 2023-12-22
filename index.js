
const { spawn } = require('node:child_process');
const os = require('os');
const generate = require('nanoid-esm/generate');
const path = require('path');
const fs = require('fs');

class LibreofficeConvert {
    officePath = 'soffice';
    constructor(opts) {
        opts.libreofficePath && (this.officePath = opts.libreofficePath);
    }
    async convert(filePath, type, newFilePath) {
        const tempDir = os.tmpdir();
        return new Promise((resolve, reject) => {
            const ls = spawn(this.officePath, ['--headless', '--convert-to', type, filePath, '--outdir', tempDir]);
            let errInfo = '';
            let convertInfo = '';
            ls.stdout.on('data', (data) => {
                convertInfo = data.toString();
            })
            ls.stderr.on('data', err => {
                errInfo = err.toString();
            })
            ls.on('close', code => {
                if(!errInfo) {
                    const uuid = generate('1DgPePAE5zPYmtHaq2UN2x5prCK9UZveobyzABCDEFGHIGKLMNOPQRSTUVWXYZ_', 10);
                    const basename = path.parse(filePath);
                    const fileName = basename.name;
                    const oldFile = tempDir + '/' + fileName + '.' + type;
                    const newFilename = uuid + '.' + type;
                    const newFile = !newFilePath ? tempDir + '/' + newFilename: newFilePath + '/' + newFilename;
                    // fs.renameSync(oldFile, newFile);
                    const oldFileBuffer = fs.readFileSync(oldFile);
                    fs.writeFileSync(newFile, oldFileBuffer);
                    resolve({
                        libreInfo: convertInfo,
                        file: newFilename
                    });
                    if(newFilePath) {
                        fs.unlinkSync(oldFile);
                    }
                }else{
                    reject(errInfo);
                }
            })
        })
    }
}

module.exports = LibreofficeConvert;