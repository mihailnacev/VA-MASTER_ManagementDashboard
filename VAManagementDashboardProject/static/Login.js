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

class Login extends React.Component {
	constructor(){
           super();
		   this.state={};
		   this.login=this.login.bind(this);
	}
	login() {
		//console.log('Successfull login');
		var username=document.getElementById("username").value;
		var pwd=document.getElementById("password").value;
		console.log(username);
		console.log(pwd);
		  request('http://127.0.0.1:8000/login?username='+username+'&password='+pwd, function (error, response, body) {
                     //console.log('error:', error); // Print the error if one occurred
                     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                     //console.log(body);
					 if (body=="Successful_sign_in")
					 {
						 window.location.replace("http://127.0.0.1:8000/#/Main");
					 }
					 else
					 {
						 console.log("Unsuccesful Login: Try again");
					 }
         });
	}
	render(){
	   return(
	<div className="col-md-4 col-md-offset-4">
        <div className="text-center">
        <h1 className="login-brand-text">Login Page</h1>
        <h3 className="text-muted">Created by VA-MK team</h3></div>
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
    </div>);
    }
}

module.exports = Login;
