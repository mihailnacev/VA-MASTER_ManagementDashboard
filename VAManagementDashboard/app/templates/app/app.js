/**
 * Created by mnace on 6/28/2017.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var Router = require('react-router-dom');

var Main = require('./Main');
var Company=require('./ShowCompanies');
//var Panel2 = require('./new1');

//var App = React.createClass({
 // render: function() {
   // return (
     //   <Router.HashRouter>
       //     <div>
         //       <Router.Route exact path='/' component={Panel1}>
           //     {/*<Router.IndexRoute component={Overview} />*/}
             //   {/*<Router.Route path='/hosts' component={Hosts} />*/}
            //</Router.Route>
            //<Router.Route path='/panel1' component={Panel2}>
            //</Router.Route>
            //</div>
        //</Router.HashRouter>
    //);
  //}
//});


ReactDOM.render(
  <Main/>,
   document.getElementById('main')
);

ReactDOM.render(
  <Company/>,
   document.getElementById('main1')
);

//ReactDOM.render(
  //<App/>,
  //document.getElementById('root')
//);