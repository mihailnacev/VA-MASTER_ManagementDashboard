/*
 * Created by mnace on 8/14/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
            global.jQuery = require('jquery');
            var bootstrap=require('bootstrap');



        class Navbar extends React.Component {
            constructor() {
                super();
				var me=this;
				this.set=this.set.bind(this);
				this.state={ user: ''};
                request('http://127.0.0.1:8000/getUsername?token='+localStorage.getItem("token"), function (error, response, body) {
                     //console.log('error:', error); // Print the error if one occurred
                     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was receive
							me.set(body);
                    });
            }

            set(value){
				var me=this;
                me.setState({user: value});
            }

			logOut() {
                var xhr = new XMLHttpRequest();
	          xhr.open("POST", 'http://127.0.0.1:8000/deleteToken/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
     }
}
xhr.send("content="+localStorage.getItem("token"));
				//localStorage.removeItem("loggedUser");
				//sessionStorage.removeItem("loggedUser");
				localStorage.removeItem("token");
				window.location.replace("http://127.0.0.1:8000/#/");
			}
			
          render() {
    return (
	
		<div id="wrapper" className="content">
      <Bootstrap.Navbar fluid={true}  style={ {margin: 0} } className='bg-primary'>
            <Bootstrap.Navbar.Header>
            <Bootstrap.Navbar.Brand>
              <a href="#/Main" className="text-primary">Vapour Apps</a>
            </Bootstrap.Navbar.Brand>
          </Bootstrap.Navbar.Header>
          <ul className="nav navbar-top-links navbar-right">

           <Bootstrap.NavDropdown title={<span><span className="glyphicon glyphicon-user"></span>&nbsp;{this.state.user}</span> } id = 'navDropdown4'>
                  <Bootstrap.MenuItem  onClick={() => this.logOut()}>
                    <span> <span className = "glyphicon glyphicon-log-out" /> Logout </span>
                  </Bootstrap.MenuItem>
            </Bootstrap.NavDropdown>

          </ul>
    </Bootstrap.Navbar>
    </div>
        
    );
  }
  
}

 module.exports = Navbar;