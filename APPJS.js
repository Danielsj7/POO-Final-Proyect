//Login
alert("CONECTADOOOO");
var provider = new firebase.auth.GoogleAuthProvider();
var databaseRef = firebase.database().ref();


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    $('h1').text("Usuario actual: " + user.displayName);
    $('#ok').click(mandarInfo);
  } else {
    $('h1').text("No se encuentra logeado");
      $('#ok').click(function () {
        alert("Debe iniciar sesión primero");
      });
  }
});

$('#logout').click(function () {
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});
})

$('#login').click(function(){
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
    	var user = {
    		uid:result.user.uid,
    		displayName:result.user.displayName,
    		email:result.user.email,
    	}
    	console.log(result);
    	guardarUser(user);
  });
});

//guardar en base de datos
function guardarUser(user){
	firebase.database().ref('users/' + user.uid)
	.set(user)
	.then(result =>{
		console.log("guardé");
	});
}


function mandarInfo(){
	let user_id = firebase.auth().currentUser.uid;
  alert(user_id);
	let urlText = $('#urlText').val();
  let precioText = $('#precioText').val();
	if (urlText != "" && precioText != "") {
    var newPostKey = databaseRef.child('urls').push().key;
  	firebase.database().ref('users/' + user_id +'/urls')
  	.push({url: urlText, price: precioText})
  	.then(s =>{
  		console.log("envié");
  	});
  }else{
    alert("Alguno de los campos está vacío");
  }
}
