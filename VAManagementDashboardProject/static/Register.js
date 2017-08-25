/**
 * Created by mnace on 8/10/2017.
 */

            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
			var NodeRSA=require('node-rsa');
            var keypair=require('keypair');
            var request=require('request');
			var sshpk = require('sshpk');

 class Register extends React.Component{

                constructor(){
                    super();
					this.register=this.register.bind(this);
                }

                componentDidMount(){

                }

				register(){
				   var me=this;
				   var file=document.getElementById("publickey").files[0];
				   var firstname=document.getElementById("firstname").value;
				   var lastname=document.getElementById("lastname").value;
				   var email=document.getElementById("email").value;
				   var username=document.getElementById("username").value;
				   var password=document.getElementById("password").value;
				   var cpassword=document.getElementById("cpassword").value;
		           if(file==undefined){
		             alert('Insert a public key for encryption!!!');
	               }
	               else if(password!=cpassword){
		             alert('Passwords do not match !!!');
                   }
		         else{
		             var reader=new FileReader()
		             reader.onload=function(e){
		                var publickey=reader.result;
						console.log(publickey);
						console.log(firstname);
						console.log(lastname);
						console.log(email);
						console.log(username);
						console.log(password);
						console.log(cpassword);
						publickey = sshpk.parseKey(publickey).toString('pkcs8');
						var key_public = new NodeRSA(publickey);
		                var encrypted = key_public.encrypt(password, 'base64');
						console.log(encrypted);
						var xhr = new XMLHttpRequest();
                        xhr.open("POST", '/register/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
		window.location.replace("/#/");
     }
}
xhr.send("firstname="+firstname+"&lastname="+lastname+"&email="+email+"&username="+username+"&password="+password+"&publickey="+publickey);
 		             }
		      //reader.readAsText('C:\Users\mnace\Desktop\Model.txt', 'utf8');
	          reader.readAsText(file);

           }
				}

               render(){

					return (
                        <div>

                        <div className="col-md-offset-4 col-md-7">
                         <h1>Registration</h1>

						   <Bootstrap.FormGroup controlId="firstname">
						      <Bootstrap.ControlLabel>First Name</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter first name"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="lastname">
						      <Bootstrap.ControlLabel>Last Name</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter last name"/>
						   </Bootstrap.FormGroup>

                           <Bootstrap.FormGroup controlId="email">
						      <Bootstrap.ControlLabel>Email</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="email" placeholder="Enter email"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="username">
						      <Bootstrap.ControlLabel>Username</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter username"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="password">
						      <Bootstrap.ControlLabel>Password</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="password" placeholder="Enter password"/>
						   </Bootstrap.FormGroup>

                           <Bootstrap.FormGroup controlId="cpassword">
						      <Bootstrap.ControlLabel>Confirm Password</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="password" placeholder="Enter password again"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="publickey">
						      <Bootstrap.ControlLabel>Import Public Key</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="file" placeholder="Public key ... "/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.Button type="submit" onClick={() => this.register()}>Register</Bootstrap.Button>

                       </div>
                    </div>);
               }

            };

            module.exports = Register;