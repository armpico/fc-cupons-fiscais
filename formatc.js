
const source = document.getElementById('input-cupons');
const result = document.getElementById('output-cupons');
const btCopyAll = document.getElementById('button-copy-all');

var splitLines = [''];

const getKeys = function () {
    var keys = source.value.toLowerCase();

    keys = keys.replace(/[^0-9\n]/g, '');
    splitLines = keys.split(/\r?\n/);
}

const inputHandler = function () {
    getKeys();
    removeAllChildNodes(result);

    var id = 0;
    splitLines.forEach(line => {
        if (line != "") {
            newEntry(line, id);
            id++;
        }
    });
}

function newEntry(key, id) {
    var input = document.createElement("input");
    input.type = "input";
    input.value = key;
    input.style.width = "330px";
    input.name = "lb-" + id;
    input.readOnly = true;

    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = "Copiar";
    button.name = "bt-" + id;
    button.onclick = function () {
        input.select();
        input.setSelectionRange(0, 99999)
        document.execCommand("copy");
    };

    var span = document.createElement('span');
    span.style.color = "gray";
    span.innerHTML = " " + getTipoNota(key) + " - " + getDatas(key) + " - " + getUF(key);

    var br = document.createElement("label");
    br.innerHTML = "<br><br>";
    result.appendChild(button);
    result.appendChild(input);
    result.appendChild(span);
    result.appendChild(br);
}

function getTipoNota(key) {
    var tipo = key.substr(20, 2);
    if (tipo == "55") return "NFe";
    if (tipo == "65") return "NFCe";
    if (tipo == "59") return "SAT";

    return "";
}
function getUF(key) {
    var ufIbge = key.substr(0, 2);

    if (ufIbge == "11") return "RO";
    if (ufIbge == "12") return "AC";
    if (ufIbge == "13") return "AM";
    if (ufIbge == "14") return "RR";
    if (ufIbge == "15") return "PA";
    if (ufIbge == "16") return "AP";
    if (ufIbge == "17") return "TO";

    if (ufIbge == "21") return "MA";
    if (ufIbge == "22") return "PI";
    if (ufIbge == "23") return "CE";
    if (ufIbge == "24") return "RN";
    if (ufIbge == "25") return "PB";
    if (ufIbge == "26") return "PE";
    if (ufIbge == "27") return "AL";
    if (ufIbge == "28") return "SE";
    if (ufIbge == "29") return "BA";

    if (ufIbge == "31") return "MG";
    if (ufIbge == "32") return "ES";
    if (ufIbge == "33") return "RJ";
    if (ufIbge == "35") return "SP";

    if (ufIbge == "41") return "PR";
    if (ufIbge == "42") return "SC";
    if (ufIbge == "43") return "RS";

    if (ufIbge == "50") return "MS";
    if (ufIbge == "51") return "MT";
    if (ufIbge == "52") return "GO";
    if (ufIbge == "53") return "DF";

    return "";
}
function getDatas(key) {
    var YY = key.substr(2, 2);
    var MM = key.substr(4, 2);

    return MM + "/20" + YY;
}

const copyAllToClipboard = function () {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = "";
    splitLines.forEach(line => {
        if (line != "") {
            dummy.value += line + "\n";
        }
    });
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

window.addEventListener('load', inputHandler)
source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);
btCopyAll.addEventListener('click', copyAllToClipboard);
