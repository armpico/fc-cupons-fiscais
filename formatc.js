
const source = document.getElementById('input-cupons');
const result = document.getElementById('output-cupons');

const inputHandler = function(e) {
    var keys = e.target.value.toLowerCase();

    keys = keys.replace(/[^0-9\n]/g,'');
    var splitLines =  keys.split(/\r?\n/);
    removeAllChildNodes(result);

    var id = 0;
    splitLines.forEach(line => {
        if (line != ""){
            // result.innerHTML = line;
            newEntry(line, id);
            id++;
        }
    });
}

const toClipboard = function(label) {
    var copyText = label;
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    // feedback.innerHTML = "Copiado para a área de transferência";
    setTimeout(function(){ div.style.display = "none"; }, 600);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function newEntry(key, id) {
    var input = document.createElement("input");
    input.type = "input";
    input.value = key;
    input.name = "lb-" + id;
    input.readOnly = true;

    var button = document.createElement('button');
    button.type = 'button';
    button.innerHTML = "Copiar";
    button.name = "bt-" + id;
    button.onclick = function() {
        input.select();
        input.setSelectionRange(0, 99999)
        document.execCommand("copy");
    };
    
    var br = document.createElement("label");
    br.innerHTML = "<br><br>";
    result.appendChild(button);
    result.appendChild(input);
    result.appendChild(br);
}

source.addEventListener('input', inputHandler);
source.addEventListener('propertychange', inputHandler);