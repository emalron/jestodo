async function write_event(e) {

    if(auth.currentUser) {
        var text = document.getElementById("input").textContent;

        if(text_check(text)) {
            await makeToDo(text);
            render_body(filter);
            washing();
        }
        else {
            you_have_to("input");
        }
    }
    else {
        you_have_to("login-button");
    }
}

function text_check(text) {
    if(!text) {
        return false;
    }
    return true;
}

function you_have_to(id) {
    let button = document.getElementById(id);

    console.log("you have to login");

    button.style.backgroundColor = "red";
    setTimeout(function() {
        button.style.backgroundColor = "white";
    }, 200)
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

function washing() {
    let input = document.getElementById("input");

    // remove text in the input box
    input.innerText = "";

    // move focus to the input box
    input.focus();

    // if mode is "checked" then back to mode ""
    if (mode == "checked") {
        // to be determined
        mode = ""
        render_filter('끝낸 일 보여줘');
        render_body(filter);
    }
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