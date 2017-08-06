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
            var SideBar=require('./Sidebar');
            //var express=require('express');
            //var cors=require('cors');
            //var app= express();


            class AddVAMaster extends React.Component{

                constructor(){
                    super();
                    this.state={dataCenters:[], companies:[]};
					this.createVAMaster=this.createVAMaster.bind(this);
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
                }
				
				
				getCurrentCompanies () {
                    var me = this;
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
                }

                componentDidMount(){
                  this.getCurrentDataCenters();
				  this.getCurrentCompanies();
                }
				
				createVAMaster(){
				   var me=this;
				   var file=document.getElementById("publickey").files[0];
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
		           if(file==undefined){
		             alert('Insert a public key for encryption!!!');
	               }
		         else{
		             var reader=new FileReader()
		             reader.onload=function(e){
		                var text=reader.result;
						console.log(text);
						console.log(domain);
						console.log(url);
						console.log(ip);
						console.log(username);
						console.log(password);
						console.log(vpnport);
						console.log(company);
						console.log(dataCenter);
						var key_public = new NodeRSA(text);
		                var encrypted = key_public.encrypt(password, 'base64');
						console.log(encrypted);
						var xhr = new XMLHttpRequest();
                        xhr.open("POST", 'http://127.0.0.1:8000/addVAMaster/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
     }
}
xhr.send("domain="+domain+"&url="+url+"&ip="+ip+"&username="+username+"&password="+encrypted+"&vpnport="+vpnport+"&company="+company+"&dataCenter="+dataCenter+"&publickey="+publickey);
 		             }
		      //reader.readAsText('C:\Users\mnace\Desktop\Model.txt', 'utf8');
	          reader.readAsText(file);
			  
           }
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
						   
						   <Bootstrap.FormGroup controlId="publickey">
						      <Bootstrap.ControlLabel>Import Public Key</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="file" placeholder="Public key ... "/> 
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

