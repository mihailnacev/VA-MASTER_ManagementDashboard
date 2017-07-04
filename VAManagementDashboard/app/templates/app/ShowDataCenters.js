/**
 * Created by mnace on 7/3/2017.
 */
 var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
             var SideBar=require('./Sidebar');
            //var express=require('express');
            //var cors=require('cors');
            //var app= express();


            class ShowDataCenters extends React.Component{

                constructor(){
                    super();
                    this.state={companies:[]};
                }


                getCurrentCompanies () {
//                     var req = new XMLHttpRequest();
//
//                     // Feature detection for CORS
//                     if ('withCredentials' in req) {
//                     req.open('GET', 'http://127.0.0.1:8000/app/getAllCompanies', true);
//                     req.setRequestHeader('Content-Type', 'application/json');
//                     req.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
//                     // Just like regular ol' XHR
//                     req.onreadystatechange = function() {
//                     if (req.readyState === 4) {
//                     if (req.status >= 200 && req.status < 400) {
//                        me.setState({companies: JSON.parse(req.responseText)});
//                     } else {
//                 // Handle error case
//             }
//         }
//     };
//     req.send();
// }


                    var me = this;
                    // fetch(`http://127.0.0.1:8000/app/getAllCompanies`)
                    // .then(result=>result.json())
                    // .then(items=>this.setState({companies}))
                   // request('http://127.0.0.1:8000/app/getAllCompanies',function (error, response, body) {
                   //   console.log('error:', error); // Print the error if one occurred
                   //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                   //   console.log('body:', body); // Print the HTML for the Google homepage.
                   //   me.setState({companies: []});
                   //   });
                  // jquery.getJSON("http://127.0.0.1:8000/app/getAllCompanies", function( data ) {
                  //       me.setState({companies: data});
                  //   });
                  me.setState({companies: [
                      {"Name":"Company1",
                      "Description":"Description1",
                      "Address":"Address1"},
                      {"Name":"Company2",
                          "Description":"Description2",
                          "Address":"Address2"},
                      {"Name":"Company3",
                          "Description":"Description3",
                          "Address":"Address3"}
                  ]});
                }

                componentDidMount(){
                  this.getCurrentCompanies()
                }

               render(){
                    var company_rows=this.state.companies.map(function(company){
                        return (
                            <tr>
                            <td>{company.Name}</td>
                            <td>{company.Description}</td>
                            <td>{company.Address}</td>
                    <td><Bootstrap.Button type="button" bsStyle='primary'>Delete</Bootstrap.Button></td>
                            </tr>
                        );
                    }.bind(this));

                    return (
                        <div>
                         <SideBar className="col-md-3"/>
                        <div className="col-md-offset-4 col-md-7">
                       <Bootstrap.PageHeader>Show DataCenters</Bootstrap.PageHeader>
                        <Bootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                    <td>Company name</td>
                    <td>Description</td>
                    <td>Company address</td>
                    <td>Delete?</td>
                    </tr>
                </thead>
                <tbody>
                    {company_rows}
                </tbody>
            </Bootstrap.Table>
                        </div>
                    </div>);
               }

            };

            module.exports = ShowDataCenters;

