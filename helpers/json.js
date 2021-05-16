const fs = require('fs');

jsonLoader = filename => {
    try {
        let rawData = fs.readFileSync(filename);
        return JSON.parse(rawData);
    } catch (e) {
        console.error(e);
        return [];
    }
}

jsonWriter = (json, file) => {
    let data = JSON.stringify(json);
    fs.writeFileSync(file, data);
}

module.exports = {
    jsonLoader: jsonLoader,
    jsonWriter: jsonWriter
};