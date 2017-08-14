/**
 * Created by mnace on 8/14/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            global.jQuery = require('jquery');
            var bootstrap=require('bootstrap');



        class Navbar extends React.Component {
            constructor(props) {
                super(props);
				this.state={ user: localStorage.getItem("loggedUser")};
            }
			
			logOut() {
				localStorage.removeItem("loggedUser");
				sessionStorage.removeItem("loggedUser");
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