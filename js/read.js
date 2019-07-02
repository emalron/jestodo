function filter_unchecked() {
    let body = [];
    var db = database.ref('todos/');
    
    return db.once('value').then(function(sp) {
        var b = sp.val();
        
        if(b != null) {
            Object.keys(b).map(function(key) {
                if(b[key].check == '')
                    body.push(b[key]);
            })
        }
        
        return body;
    })
}

function filter_checked() {
    let body = [];
    var db = database.ref('todos/');
    
    return db.once('value').then(function(sp) {
        var b = sp.val();
        
        if(b != null) {
            Object.keys(b).map(function(key) {
                if(b[key].check == 'checked')
                    body.push(b[key]);
            })
        }
        
        return body;
    })
}

function filterChange() {
    if(filter == filter_unchecked) {
        // to be deternmined
        filter = filter_checked;
        render_filter('checked');
        render(filter);
    }

    else if (filter == filter_checked) {
        // to be determined
        filter = filter_unchecked;
        render_filter('unchecked');
        render(filter);
    }
}