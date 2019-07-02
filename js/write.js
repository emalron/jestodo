async function write_event(e) {
    var text = document.getElementById("input").textContent;

    await makeToDo(text);
    render(filter);
}

async function makeToDo(text) {
    let output = {check: false, text: "", date: "", key: ""};

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0
    let date = mm + "-" + dd;
    
    output.check = '';
    output.date = date;
    output.text = text;

    saveItem(output);
}

function saveItem(item) {
    var newKey = database.ref().child('todos').push().key;
    var updates = {};
    
    item.key = newKey;
    updates['todos/' + newKey] = item;
    database.ref().update(updates);
}

async function check_event(e) {
    var node = e;
    var id = node.value;
    var db = await filter();
    var item = db[id];
    var key = item.key;
    
    if(e.checked) {
        item.check = 'checked';
    }
    else {
        item.check = '';
    }
    
    var updates = {};
    updates['todos/' + key] = item;
    database.ref().update(updates);
    
    render(filter);
}