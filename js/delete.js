async function delete_event(e) {
    var num = e.getAttribute('value');
    var db = await filter();
    var item = db[num];
    var key = item.key;

    /*var ite = database.ref('todos/').child(key);
    ite.remove();
    */
    
    // to backup data, just change check property 
    item.check = "delete";
    
    var updates = {};
    updates['todos/'+key] = item;
    database.ref().update(updates);
    
    render(filter);
}