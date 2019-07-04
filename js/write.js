async function write_event(e) {
    var text = document.getElementById("input").textContent;

    await makeToDo(text);
    render_body(filter);
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

    make_item_key(output);
}

function make_item_key(item) {
    var uid = auth.currentUser.uid;
    var newKey = database.ref().child('todos').child(uid).push().key;
    
    item.key = newKey;
    updateItem(item);
}

function updateItem(item) {
    var updates = {};
    let uid = auth.currentUser.uid;

    updates['todos/' + uid + '/' + item.key] = item;
    database.ref().update(updates);
}

async function check_event(e) {
    var node = e;
    var id = node.value;
    var db = await filter(mode);

    var item = db[id];
    var key = item.key;
    
    if(e.checked) {
        item.check = 'checked';
    }
    else {
        item.check = '';
    }
    
    updateItem(item);
    render_body(filter);
}