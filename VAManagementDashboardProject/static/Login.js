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

class Login extends React.Component {
	constructor(props){
           super(props);
	}
	
	render(){
	   return(
	<div className="col-md-4 col-md-offset-4">
        <div className="text-center">
        <h1 className="login-brand-text">Login Page</h1>
        <h3 className="text-muted">Created by <a href="http://startreact.com">StartReact.com</a> team</h3></div>
      <Bootstrap.Panel header={<h3>Please Sign In</h3>} className="login-panel">
        <form role="form" onSubmit={(e) => { submitHandler(e); }}>
          <fieldset>
            <div className="form-group">
              <Bootstrap.FormControl
                type="text"
                className="form-control"
                placeholder="Username"
                name="name"
              />
            </div>
            <div className="form-group">
              <Bootstrap.FormControl
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
              />
            </div>
            <Bootstrap.Checkbox label="Remember Me" > Remember Me </Bootstrap.Checkbox>
            <Bootstrap.Button type="submit" bsSize="large" bsStyle="success" 
block>Login</Bootstrap.Button>
          </fieldset>
        </form>
      </Bootstrap.Panel>
    </div>);
    }
}

module.exports = Login;
