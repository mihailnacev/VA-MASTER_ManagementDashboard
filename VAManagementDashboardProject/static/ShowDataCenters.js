/**
 * Created by mnace on 7/3/2017.
 */
 var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
			var Navbar=require('./Navbar');
             var SideBar=require('./Sidebar');
            //var express=require('express');
            //var cors=require('cors');
            //var app= express();


            class ShowDataCenters extends React.Component{

                constructor(){
                    super();
					var user=localStorage.getItem("loggedUser");
                    if(user==undefined||user=='')
                    {
						window.location.replace("http://127.0.0.1:8000/#/");
					}	
                    this.state={dataCenters:[]};
		            this.deleteDC=this.deleteDC.bind(this);
                }


                getCurrentDataCenters () {
                     var req = new XMLHttpRequest();
                     var me=this;
                     // Feature detection for CORS
                     if ('withCredentials' in req) {
                     req.open('GET','http://127.0.0.1:8000/getAllDataCenters', true);
                     req.setRequestHeader('Content-Type', 'application/json');
                    // req.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
                     // Just like regular ol' XHR
                     req.onreadystatechange = function() {
                     if (req.readyState === 4) {
                     if (req.status >= 200 && req.status < 400) {
//                        me.setState({dataCenters: JSON.parse(req.responseText)});
			//console.log(req.responseText);
                        var info= JSON.parse(req.responseText);
                      //console.log(info[0]);
                     var  lista=[];
                     for(var i=0;i< info.length;i++){
                        lista.push(info[i].fields);
                     //  console.log(info[i].fields);
                     }
                    // console.log(lista);
                     me.setState({dataCenters: lista});

                     } else {
                 // Handle error case
             }
         }
     };
     req.send();
 }


                    // var me = this;
                    // fetch('http://192.168.80.204:9443/app/getAllCompanies')
                    // .then(result=>result.json())
                    // .then(items=>this.setState({companies}))
                   // request('http://192.168.80.204:9443/app/getAllCompanies',function (error, response, body) {
                   //   console.log('error:', error); // Print the error if one occurred
                   //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                   //   console.log('body:', body); // Print the HTML for the Google homepage.
                   //   me.setState({companies: []});
                   //   });
                  // jquery.getJSON("http://127.0.0.1:8000/app/getAllCompanies", function( data ) {
                  //       me.setState({companies: data});
                  //   });
                 // me.setState({companies: [
                   //   {"Name":"Company1",
                   //   "Description":"Description1",
                   //   "Address":"Address1"},
                   //   {"Name":"Company2",
                   //       "Description":"Description2",
                   //       "Address":"Address2"},
                   //   {"Name":"Company3",
                   //       "Description":"Description3",
                   //       "Address":"Address3"}
                 // ]});
                 }

		deleteDC(e){
		  var me = this;
		  console.log(e.target.value);
                  var xhr = new XMLHttpRequest();
	          xhr.open("POST", 'http://127.0.0.1:8000/deleteDataCenter/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
        me.getCurrentDataCenters();
     }
}
xhr.send("name="+e.target.value);}

                componentDidMount(){
                  this.getCurrentDataCenters()
                }

               render(){
                    var rows=this.state.dataCenters.map(function(dataCenter){
                        return (
                            <tr>
                            <td>{dataCenter.Name}</td>
                            <td>{dataCenter.Description}</td>
                            <td>{dataCenter.Location}</td>
                                <td>{dataCenter.URL}</td>
                                <td>{dataCenter.Type}</td>
                    <td><Bootstrap.Button type="button" bsStyle='primary' onClick={this.deleteDC} value={dataCenter.Name}>Delete</Bootstrap.Button></td>
                            </tr>
                        );
                    }.bind(this));

                    return (
                        <div>
						<Navbar/>
                         <SideBar className="col-md-3"/>
                        <div className="col-md-offset-4 col-md-7">
                       <Bootstrap.PageHeader>Show DataCenters</Bootstrap.PageHeader>
                        <Bootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                    <td>DataCenter name</td>
                    <td>Description</td>
                    <td>Location</td>
                        <td>URL</td>
                        <td>Type</td>
                    <td>Delete?</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Bootstrap.Table>
                        </div>
                    </div>);
               }

            };

            module.exports = ShowDataCenters;

