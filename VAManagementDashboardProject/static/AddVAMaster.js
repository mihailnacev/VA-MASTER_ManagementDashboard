/**
 * Created by mnace on 8/4/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
			var NodeRSA=require('node-rsa');
            var keypair=require('keypair');
            var request=require('request');
			var Navbar=require('./Navbar');
            var SideBar=require('./Sidebar');
            //var express=require('express');
            //var cors=require('cors');
            //var app= express();


            class AddVAMaster extends React.Component{

                constructor(){
                    super();
					var user=localStorage.getItem("token");
                    if(user==undefined||user=='')
                    {
						window.location.replace("/#/");
					}	
                    this.state={dataCenters:[], companies:[]};
					this.createVAMaster=this.createVAMaster.bind(this);
                }


                getCurrentDataCenters () {
                     var req = new XMLHttpRequest();
                     var me=this;
                     // Feature detection for CORS
                     if ('withCredentials' in req) {
                     req.open('GET','/getAllDataCenters', true);
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
                    
                     var oReq = new XMLHttpRequest();
                     oReq.addEventListener("load", reqListener);
                     oReq.open("GET", "/getAllCompanies");
                     oReq.send();
					 
                     function reqListener () {
                      console.log(this.responseText);
					  var info= JSON.parse(this.responseText);
                      var lista=[];
                      for(var i=0;i< info.length;i++){
                          lista.push(info[i]);
  //                      console.log(info[i]);
                      }
//                     console.log(lista);
                       me.setState({companies: lista});
					}
					
					
                  // jquery.getJSON("/app/getAllCompanies", function( data ) {
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

                componentDidMount(){
                  this.getCurrentDataCenters();
				  this.getCurrentCompanies();
                }
				
				createVAMaster(){
				   var me=this;
				   //var file=document.getElementById("publickey").files[0];
				  // var loggedUser=localStorage.getItem("loggedUser");
				   var publickey='';
				   var domain=document.getElementById("domain").value;
				   var url=document.getElementById("url").value;
				   var ip=document.getElementById("internalip").value;
				   var username=document.getElementById("username").value;
				   var password=document.getElementById("password").value;
				   var vpnport=document.getElementById("vpnport").value;
				   var e1=document.getElementById("company");
				   var company=e1.options[e1.selectedIndex].text;
				   var e2=document.getElementById("dataCenter");
				   var dataCenter=e2.options[e2.selectedIndex].text;

						console.log(domain);
						console.log(url);
						console.log(ip);
						console.log(username);
						console.log(password);
						console.log(vpnport);
						console.log(company);
						console.log(dataCenter);
						//request('/getUsername?token='+localStorage.getItem("token"), function (error, response, body) {
                     //console.log('error:', error); // Print the error if one occurred
                     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was receive
							//var loggedUser=body;
						var oReq = new XMLHttpRequest();
                        oReq.addEventListener("load", reqListener);
                        oReq.open("GET", "/getUsername?token="+localStorage.getItem("token"));
                        oReq.send();
					    
                       function reqListener () {
                           
						var Req = new XMLHttpRequest();
                        Req.addEventListener("load", reqlistener);
                        Req.open("GET", "/getPublicKey?username="+this.responseText);
                        Req.send();
						
						function reqlistener () {
						 
						var key_public = new NodeRSA(this.responseText);
		                var encrypted = key_public.encrypt(password, 'base64');
						console.log(encrypted);
					    var xhr = new XMLHttpRequest();
                        xhr.open("POST", '/addVAMaster/', true);

						//Send the proper header information along with the request
						xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

						xhr.onreadystatechange = function() {//Call a function when the state changes.
						if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
						// Request finished. Do processing here
						window.location.replace("/#/VAMaster");
						}
							}
xhr.send("domain="+domain+"&url="+url+"&ip="+ip+"&username="+username+"&password="+encrypted+"&vpnport="+vpnport+"&company="+company+"&dataCenter="+dataCenter+"&publickey="+this.responseText);
						
						}   
						   
					   }	
							
							

						//request('/getPublicKey?username='+loggedUser, function (error, response, body) {
                     //console.log('error:', error); // Print the error if one occurred
                     //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
					    //var key_public = new NodeRSA(body);
		                //var encrypted = key_public.encrypt(password, 'base64');
						//console.log(encrypted);
					    //var xhr = new XMLHttpRequest();
                        //xhr.open("POST", '/addVAMaster/', true);

//Send the proper header information along with the request
//xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//xhr.onreadystatechange = function() {//Call a function when the state changes.
    //if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
		//window.location.replace("/#/VAMaster");
     //}
//}
//xhr.send("domain="+domain+"&url="+url+"&ip="+ip+"&username="+username+"&password="+encrypted+"&vpnport="+vpnport+"&company="+company+"&dataCenter="+dataCenter+"&publickey="+body);
					 
		            // });

						//});
 		           
			  
				}

               render(){

                    console.log(this.state.dataCenters);
					console.log(this.state.companies);
					
					var company_options=this.state.companies.map(function(company){
                        return (
                            <option value="{company.fields.Name}">{company.fields.Name}</option>
                        );
                    }.bind(this));
					
					var dataCenter_options=this.state.dataCenters.map(function(dataCenter){
                        return (
                            <option value="{dataCenter.Name}">{dataCenter.Name}</option>
                        );
                    }.bind(this));
					
					return (
                        <div>
						<Navbar/>
                         <SideBar className="col-md-3"/>
                        <div className="col-md-offset-4 col-md-7">
                         <h1>Add VAMaster</h1>
                           
						   <Bootstrap.FormGroup controlId="domain">
						      <Bootstrap.ControlLabel>Domain</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter domain"/> 
						   </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="url">
						      <Bootstrap.ControlLabel>URL</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter URL"/> 
						   </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="internalip">
						      <Bootstrap.ControlLabel>Internal IP address</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter IP address"/> 
						   </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="username">
						      <Bootstrap.ControlLabel>Username</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter username"/> 
						   </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="password">
						      <Bootstrap.ControlLabel>Password</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="password" placeholder="Enter password"/> 
						   </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="vpnport">
						      <Bootstrap.ControlLabel>VPN Port</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="number" placeholder="Enter VPN port"/> 
						   </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="company">
							  <Bootstrap.ControlLabel>Company</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl componentClass="select" placeholder="select company" onChange={(e) => this.setState({ value: e.target.value })}>
							  {company_options}
						      </Bootstrap.FormControl>
                           </Bootstrap.FormGroup>
						   
						   <Bootstrap.FormGroup controlId="dataCenter">
							  <Bootstrap.ControlLabel>DataCenter</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl componentClass="select" placeholder="select dataCenter">
							  {dataCenter_options}
						      </Bootstrap.FormControl>
                           </Bootstrap.FormGroup>
						   
						   <Bootstrap.Button type="submit" onClick={() => this.createVAMaster()}>Submit</Bootstrap.Button>
						   
                       </div>
                    </div>);
               }

            };

            module.exports = AddVAMaster;

