function filter(mode) {
    let body = [];
    let user = auth.currentUser;
    let uid = user.uid;
    var db = database.ref('todos/').child(uid);
    
    return db.orderByChild('check').equalTo(mode).once('value').then(function(sp) {
        var b = sp.val();
        if(b != null) {
            Object.keys(b).map(function(key) {
                body.push(b[key]);
            })
        }
        
        return body;
    })
}

function filterChange() {
    if(mode == "") {
        // to be deternmined
        mode = "checked"
        render_filter('할 일 보여줘');
        render_body(filter);
    }

    else if (mode == "checked") {
        // to be determined
        mode = ""
        render_filter('끝낸 일 보여줘');
        render_body(filter);
    }
}