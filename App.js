//Login
var provider = new firebase.auth.GoogleAuthProvider();
//Cojo la referencia en de mi rama en la base de datos
var databaseRef = firebase.database().ref();

//La notación $('#elemento') me "trae" el botón para que pueda trabajar con el en JS, esto lo hago gracias a JQuery
$('#login').click(function(){
	//Cuando se le hace click al botón de login 
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
    	var user = {
    		uid:result.user.uid,
    		displayName:result.user.displayName,
    		email:result.user.email,
    	}
    	console.log(result);
	  //Cojo los datos que me interesan y los mando a la base de Datos
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
