
var filter = {};
var database;
var mode;
var auth;

window.onload = function() {
    init();
    mode = "";
    render_filter('끝낸 일 보여줘');
    // render_body(filter);
}

function init() {
    var button = document.getElementById("input-button");
    button.addEventListener("click", write_event);

    auth = firebase.auth();
    auth.onAuthStateChanged(auth_change_event);

    // database setting
    database = firebase.database();
}

function login_event() {
    var provider = new firebase.auth.GoogleAuthProvider();
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    auth.signInWithPopup(provider).then(result => {
        database.goOnline();
        console.log('login sucess');
    })
    .catch(error => {
        console.log('error in google login', error);
    })
}

function logout_event() {
    if(database) {
        database.goOffline();
    }
    auth.signOut();
}

function auth_change_event(user) {
    let login_button = document.getElementById("login-button");
    let logout_button = document.getElementById("logout-button");

    if(user) {
        login_button.style.display = "none";
        logout_button.style.display = "block";
        render_body(filter);
    }
    else {
        login_button.style.display = "block";
        logout_button.style.display = "none";
        render_clear("board-body");
    }
}