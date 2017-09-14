const fs = require('fs');

const PATH = "bo";

function processWg(wgStr) {
    const wg = wgStr.replace(new RegExp("\\$", "g"), "").replace(new RegExp("\\,", "g"), "");
    return Number(wg);
}

function processLine(line, date) {
    const parts = line.split("\t");
    const title = parts[2];
    const wg = processWg(parts[4]);

    return {
        date: date,
        title: title,
        wg: wg
    }
}

function processFile(filename, content) {
    const we = [];
    const lines = content.split("\n");
    lines.forEach(function (line) {
        const element = processLine(line, filename.replace(".csv", ""));
        we.push(element);
    });

    return we;
}

function readFile(filename) {
    const content = fs.readFileSync(PATH + "/" + filename, 'utf8');
    const we = processFile(filename, content);

    return we;
}

fs.readdir('bo', (err, files) => {
    const data = [];
    files.forEach(filename => {
        console.log(filename);
        const we = readFile(filename);
        data.push(we);
    });

    const dataStr = JSON.stringify(data);
    fs.writeFileSync("bo.json", dataStr);
});

process.exit(1);