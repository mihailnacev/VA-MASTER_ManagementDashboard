/**
 * Created by mnace on 7/14/2017.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var Bootstrap=require('react-bootstrap')
var className=require('classnames')
var Icons=require('glyphicons')
global.jQuery = require('jquery');
var bootstrap=require('bootstrap');
var request=require('request');
var NodeRSA=require('node-rsa');

class Login extends React.Component {
	constructor(){
           super();
		   //var user=localStorage.getItem("loggedUser");
		   this.state={message:''};
		   this.login=this.login.bind(this);
	}
	login() {
		//console.log('Successfull login');
		var me=this;
		var username=document.getElementById("username").value;
		var pwd=document.getElementById("password").value;
		//console.log(username);
		//console.log(pwd+"\n");
		  
		/*request('http://127.0.0.1:8000/login?username='+username, function (error, response, body) {
                     //console.log('error:', error); // Print the error if one occurred
                     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                     console.log(body);
					 if (body=="Successful_sign_in") {
                         request('http://127.0.0.1:8000/getPassword?username=' + username, function (error, response, body) {
                             //console.log('error:', error); // Print the error if one occurred
                             //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                             //console.log(body);
                             var returnedPass = body;
                             console.log(returnedPass);

                             request('http://127.0.0.1:8000/getPublicKey?username=' + username, function (error, response, body) {
                             //console.log('error:', error); // Print the error if one occurred
                             //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                             //console.log(body);
                                var pk=body;
                                var key_public = new NodeRSA(pk);
                                var encrypted = key_public.encrypt(pwd, 'base64');
                                console.log(encrypted);


                                if (encrypted==returnedPass) {
                                 window.location.replace("http://127.0.0.1:8000/#/Main");
					          }
                             else {
                                  console.log("Unsuccesful Login: Try again");
                             }

                             });
                         });
                     }
					 else
					 {
						 console.log("Unsuccesful Login: Try again");
					 }
         });*/
		 
		 if (typeof(Storage) !== "undefined") {
			// Code for localStorage/sessionStorage.
			console.log("Supported local storage");
		} 
		else {
    // Sorry! No Web Storage support..
			console.log("Unsupported local storage");
        }
		 
		// request('http://192.168.50.4:8000/login?username='+username+"&password="+pwd, function (error, response, body) {
                     //console.log('error:', error); // Print the error if one occurred
                     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "/login?username="+username+"&password="+pwd);
oReq.send();                    	  
                                function reqListener () {
                           console.log(this.responseText);

                                      if (this.responseText=="Unsuccessful_sign_in") {
						   me.setState({message: 'Unsuccesful Login: Try again'})
						   console.log("Unsuccesful Login: Try again");
					  }
					  else {
                          console.log("Successful_sign_in");
						  //console.log(body);
						  //localStorage.setItem("loggedUser", username);
						  localStorage.setItem("token", this.response.text);
						  //sessionStorage.loggedUser=username;
						  window.location.replace("/#/Main");
					  }
                           }
		 //});
	}
	render(){
	   return(
	<div className="col-md-4 col-md-offset-4">
        <div className="text-center">
        <h1 className="login-brand-text">Login Page</h1>
        <h3 className="text-primary">Created by VA-MK team</h3></div>
      <Bootstrap.Panel header={<h3>Please Sign In</h3>} className="login-panel">
        
          <fieldset>
            
              <Bootstrap.FormGroup controlId="username">
			  <Bootstrap.FormControl
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
              />
           </Bootstrap.FormGroup>
			  <Bootstrap.FormGroup controlId="password">
              <Bootstrap.FormControl
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
              />
			  </Bootstrap.FormGroup>
            <Bootstrap.Button type="submit" bsSize="large" bsStyle="success" onClick={() => this.login()} block>Login</Bootstrap.Button>
          </fieldset>
		  
      </Bootstrap.Panel>
	   <span className="text-danger">{this.state.message}</span>
	   <br/>
	   <div className="text-primary"> <a href='/#/Register' className="text-primary">Click here to register ...</a> </div>
    </div>);
    }
}

module.exports = Login;
