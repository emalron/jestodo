async function delete_event(e) {
    var num = e.getAttribute('value');
    var db = await filter(mode);
    var item = db[num];
    var key = item.key;
    var uid = auth.currentUser.uid;

    /*var ite = database.ref('todos/').child(key);
    ite.remove();
    */
    // to backup data, just change check property 
    item.check = "delete";
    
    var updates = {};
    updates['todos/'+ uid +'/'+key] = item;
    database.ref().update(updates);
    
    render_body(filter);
}