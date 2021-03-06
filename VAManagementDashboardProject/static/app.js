/**
 * Created by mnace on 6/28/2017.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var Router = require('react-router-dom');

var Main = require('./Main');
var Company=require('./ShowCompanies');
var DataCenter=require('./ShowDataCenters');
var VAMaster=require('./ShowVAMasters');
var AddVAMaster=require('./AddVAMaster');
var Login=require('./Login');
var Register=require('./Register');
var Navbar=require('./Navbar');

//var Panel2 = require('./new1');

var App = React.createClass({
 render: function() {
   return (
       <Router.HashRouter>
           <div>
               <Router.Route exact path='/' component={Login}>
               {/*<Router.IndexRoute component={Overview} />*/}
               {/*<Router.Route path='/hosts' component={Hosts} />*/}
            </Router.Route>
            <Router.Route path='/Company' component={Company}>
            </Router.Route>

            <Router.Route path='/DataCenter' component={DataCenter}>
            </Router.Route>
	
            <Router.Route path='/VAMaster' component={VAMaster}>
            </Router.Route>

            <Router.Route path='/AddVAMaster' component={AddVAMaster}>
            </Router.Route>

            <Router.Route path='/Main' component={Main}>
            </Router.Route>

             <Router.Route path='/Register' component={Register}>
            </Router.Route>
			
			<Router.Route path='/Navbar' component={Navbar}>
            </Router.Route>


            </div>
        </Router.HashRouter>
    );
  }
});



ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
