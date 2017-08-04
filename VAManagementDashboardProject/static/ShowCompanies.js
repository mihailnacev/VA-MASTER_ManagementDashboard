/**
 * Created by mnace on 7/20/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
            var SideBar=require('./Sidebar');
            var str2json=require('string-to-json');
			var NodeRSA=require('node-rsa');
            var keypair=require('keypair');
            //var express=require('express');
            //var cors=require('cors');
            //var app= express();


            class Companies extends React.Component{

                constructor(){
                    super();
                    this.state={companies:[]};
		            this.deleteComp = this.deleteComp.bind(this);
                }


                getCurrentCompanies () {
                    var me = this;
		    // var key = new NodeRSA({b: 512});
		    // var text = 'Hello RSA';
		    // var encrypted = key.encrypt(text, 'base64')
		    // console.log('encrypted: ', encrypted);
		    // var decrypted = key.decrypt(encrypted, 'utf8');
		    // console.log('decrypted: ', decrypted);

                   // var pair=keypair();
                   // console.log(pair);
                   // console.log(pair.public);
	               // var key_public = new NodeRSA(pair.public);
                   // var text = 'Hello RSA!';
		           // var encrypted = key_public.encrypt(text, 'base64');
		           // console.log('encrypted: ', encrypted);
                   // var key_private = new NodeRSA(pair.private);
		           // var decrypted = key_private.decrypt(encrypted, 'utf8');
		           // console.log('decrypted: ', decrypted);

		   // var keyPair = ursa.generatePrivateKey();
		   // console.log(keyPair);
                   // var pub = keyPair.toPublicPem('base64');
                   // console.log(pub);
                   // var data = 'Hello, world';
		   // var sig = keyPair.hashAndSign('md5', data);
                   // console.log(sig);
        //             var xhr = new XMLHttpRequest();;

                     // Feature detection for CORS
      //               if ('withCredentials' in xhr) {
    //                 xhr.open('GET', 'http://192.168.80.204:9443/app/getAllCompanies', true);
  //                   }else if (typeof XDomainRequest != "undefined") {
//
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
  //  xhr = new XDomainRequest();
  //  xhr.open('GET', 'http://192.168.80.204:9443/app/getAllCompanies');

//  } else {
    // Otherwise, CORS is not supported by the browser.
   // xhr = null;
 // }

//  xhr.onload = function() {
// var responseText = xhr.responseText;
// var response= xhr.response;
// console.log(responseText);
 //me.setState({companies: JSON.parse(responseText)});
// var object=JSON.parse(response);
// console.log(object[0]);
// console.log(object[0].fields);
 // process the response.
//};

//  xhr.send();

             //        var me = this;
			// var myHeaders= new Headers();
    			// myHeaders.append("Content-Type", "application/json");
			// //myHeaders.append("Origin", "http://192.168.80.204:9444");
			// var myInit= { method: 'GET',
			// 		headers: myHeaders,
			// 		mode: 'cors',
			// 		cache: 'default' };
			// var myRequest=new Request('http://192.168.80.204:9443/app/getAllCompanies',myInit);
             //        fetch(myRequest)
             //        .then(function(response){
			// 	console.log(response);
			//    me.setState({companies: response});
			// }).catch(function(err){
            //
			// });
                    request('http://127.0.0.1:8000/getAllCompanies',function (error, response, body) {
    //                  console.log('error:', error); // Print the error if one occurred
      //                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                      var info= JSON.parse(body);
                      var lista=[];
                      for(var i=0;i< info.length;i++){
                          lista.push(info[i]);
  //                      console.log(info[i]);
                      }
//                     console.log(lista);
                       me.setState({companies: lista});
                       });
                  // jquery.getJSON("http://127.0.0.1:8000/app/getAllCompanies", function( data ) {
                  //       me.setState({companies: data});
                  //   });
                  //me.setState({companies: [
                    //  {"Name":"Company1",
                      //"Description":"Description1",
                      //"Address":"Address1"},
                      //{"Name":"Company2",
                         // "Description":"Description2",
                          //"Address":"Address2"},
                      //{"Name":"Company3",
                        //  "Description":"Description3",
                          //"Address":"Address3"}
                  //]});
                }
deleteComp(e){ 
console.log(this);
console.log(e.target.value);
//var postData = 'name=Third_Company' ;

//var postData=JSON.parse(postText);
//http://192.168.80.204:9443/app/deleteCompany/

//var url = 'http://192.168.80.204:9443/app/deleteCompany/'
//var options = {
  //method: 'post',
 // body: postData,
 // json: true,
 // url: url
//}
//request(options, function (err, res, body) {
  //if (err) {
    //console.error('error posting json: ', err)
    //throw err
  //}
 // var headers = res.headers
 // var statusCode = res.statusCode
//  console.log('headers: ', headers)
//  console.log('statusCode: ', statusCode)
//  console.log('body: ', body)
//});
var me=this;
var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://127.0.0.1:/deleteCompany/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
        me.getCurrentCompanies();
     }
}
xhr.send("name="+e.target.value);
this.getCurrentCompanies();
}


                componentDidMount(){
                  this.getCurrentCompanies();
                }

               render(){
                    var company_rows=this.state.companies.map(function(company){
                        return (
                            <tr>
                            <td>{company.fields.Name}</td>
                            <td>{company.fields.Description}</td>
                            <td>{company.fields.Address}</td>
                                <td>{company.fields.ContactPerson}</td>
                                <td>{company.fields.ContactEmail}</td>
                                <td>{company.fields.ContactNumber}</td>
                    <td><Bootstrap.Button type="button" bsStyle='primary' onClick={this.deleteComp} value={company.fields.Name}>Delete</Bootstrap.Button></td>
                            </tr>
                        );
                    }.bind(this));

                    return (
                        <div>
                         <SideBar/>
                        <div className="col-md-offset-4 col-md-7">
                       <Bootstrap.PageHeader>Show Companies</Bootstrap.PageHeader>
                        <Bootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                    <td>Company name</td>
                    <td>Description</td>
                    <td>Company address</td>
                        <td>Contact Person</td>
                        <td>Contact Email</td>
                        <td>Contact Number</td>
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

            module.exports = Companies;
