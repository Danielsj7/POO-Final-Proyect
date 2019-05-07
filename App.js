//Login
var provider = new firebase.auth.GoogleAuthProvider();

var databaseRef = firebase.database().ref();

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


$('#ok').click(mandarURL);

function mandarURL(){
	//Si usuario loged
	let user_id = firebase.auth().currentUser.uid;
	//Texto en el TextField
	let urlText = $('#urlText').val();
	
	var newPostKey = databaseRef.child('urls').push().key;
	firebase.database().ref('users/' + user_id +'/urls')
	.push({url: urlText})
	.then(s =>{
		console.log("envié");
	});
}
