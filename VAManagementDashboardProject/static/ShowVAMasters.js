/**
 * Created by mnace on 7/14/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
			var Navbar=require('./Navbar');
            var SideBar=require('./Sidebar');
	        var NodeRSA=require('node-rsa');
            var keypair=require('keypair');
            var sshpk=require('sshpk');
            var fs=require('fs');
            //var express=require('express');
            //var cors=require('cors');
            //var app= express();


            class ShowVAMasters extends React.Component{

                constructor(){
                    super();
					var user=localStorage.getItem("token");
                    if(user==undefined||user=='')
                    {
						window.location.replace("/#/");
					}	
                    this.state={VAMasters:[], showModal: false, password: '', index: '', domain:'', showModalDelete: false};
					this.delete=this.delete.bind(this);
		            this.deleteVA=this.deleteVA.bind(this);
                    this.decrypt=this.decrypt.bind(this);
					this.close=this.close.bind(this);
					this.modal=this.modal.bind(this);
					this.modalDelete=this.modalDelete.bind(this);
					this.closeDelete=this.closeDelete.bind(this);
                }


                getCurrentVAMasters () {
                     var req = new XMLHttpRequest();
                     var me=this;
                     // Feature detection for CORS
                     if ('withCredentials' in req) {
                     req.open('GET','/getAllVAMasters', true);
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
                        lista.push(info[i]);
                     //  console.log(info[i].fields);
                     }
                    // console.log(lista);
                     me.setState({VAMasters: lista});
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
		modal(pwd, i) {
			var me=this;
			me.setState({showModal: true, password: pwd, index: i});
		}
		
		modalDelete(domain,password){
			var me=this;
			me.setState({showModalDelete: true, domain: domain, password:password});
		}
		
		close(){
		  this.setState({ showModal: false, password:'', index:'', message:''});
		}
		
		closeDelete(){
		  this.setState({ showModalDelete: false, message:''});
		}
		
		delete(domain, password){
			var me=this;
			var file=document.getElementsByClassName("pickerdelete")[0].files[0];
		  
		  if(file==undefined){
		    //alert('Insert a private key for decryption!!!');
			me.setState({message: 'Insert a private key!!!'});
	          }
		  else{
		  var reader=new FileReader()
		  reader.onload=function(e){
		     var text=reader.result;
		     //console.log(text);
		     try{
                     var key_private=new NodeRSA(text);
		     //console.log(c);
                     var decrypted=key_private.decrypt(password, 'utf8');
                     console.log("Decrypted password: ");
		     //console.log(decrypted);
	             //alert("Decrypted password: " + decrypted);
				 me.setState({message: 'Public-private key correspondate'});
				 if(me.state.message=='Public-private key correspondate'){
			console.log(domain);
			me.deleteVA(domain);
			me.setState({showModalDelete: false, message:''});
			}
		     }
		     catch(err){//alert('Incorrect private key!!!'); 
			 me.setState({message: 'Incorrect private key !'}); }
 		  }
		  //reader.readAsText('C:\Users\mnace\Desktop\Model.txt', 'utf8');
	          reader.readAsText(file);
                }
		}
		
        
		decrypt(password, index){
                  var me=this;
                 // me.setState({showModal: true});
                  //console.log(e);
		  //var file = document.getElementById("picker").files[0];
		  var file=document.getElementsByClassName("picker")[0].files[0];
		  
		  if(file==undefined){
		    //alert('Insert a private key for decryption!!!');
			me.setState({message: 'Insert a private key for decryption!!!'});
	      }
		  else{
		  var reader=new FileReader()
		  reader.onload=function(e){
		     var text=reader.result;
		     //console.log(text);
		     try{
                     var key_private=new NodeRSA(text);
		     //console.log(c);
                     var decrypted=key_private.decrypt(password, 'utf8');
                     console.log("Decrypted password: ");
		     console.log(decrypted);
	             //alert("Decrypted password: " + decrypted);
				 me.setState({message: 'Decrypted password: '+decrypted});
		     }
		     catch(err){//alert('Incorrect private key!!!'); 
			 me.setState({message: 'Incorrect private key !'}); }
 		  }
		  //reader.readAsText('C:\Users\mnace\Desktop\Model.txt', 'utf8');
	          reader.readAsText(file);
                }
                  //console.log(text);
                 // this.state.VAMasters.slice()
                  //e['Password']=c;
	          // console.log(e);
                  //me.setState({VAMasters: [e]})

                }
				
		redirect(){
			window.location.replace("/#/AddVAMaster");
		}
		
		deleteVA(e){
		  var me = this;
		  //console.log(e.target.value);
                  var xhr = new XMLHttpRequest();
	          xhr.open("POST", '/deleteVAMaster/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
        me.getCurrentVAMasters();
     }
}
xhr.send("domain="+e);}

                componentDidMount(){
                  this.getCurrentVAMasters()
                }

               render(){
                    // Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
		   var rows=this.state.VAMasters.map(function(VAMaster, index){
                    //var pair=keypair();
                    //console.log(pair);
                    //console.log(pair.public);
                    //var key_public = new NodeRSA(pair.public);
                    //var text = VAMaster.Password;
                    //var encrypted = key_public.encrypt(text, 'base64');
                    //console.log('encrypted: ', encrypted)
					//if(this.state.brojac=='0'){
					//VAMaster.Password=encrypted;}
//                      var pvt_key = '-----BEGIN RSA PRIVATE KEY-----\n'+
//'MIICXAIBAAKBgQC5ZfPYMH7D06QVLG2tQObZKlGaEwqHEqPen439gkNfE/g6F8Yu\n'+
//'Jq7NqBzDnLKAV+25u8GJ2X8MzSCvlBoOfaZ+e0hEEXLNcdi3RYW2F8Nc266HHJZ1\n'+
//'FVzrX0iPft5H0AHCGoWUlCr+h6uchmGfBQrDI5FZkJvLbrkkpm9IY68+cQIDAQAB\n'+
//'AoGAXdOR/5QzY0mlna2ZZ/gTnE4FdDM0vb0aP52CD40wKVsC4euMOWkMSDpPLFQO\n'+
//'JlPZlIjH3sq6uLDLXPBX64N9kWISfa5koQvPUDSrGsfT3SSO5Jb1Cf1VaDTT6jpX\n'+
//'4ibbquqXCD/o7e0fJnNU0+aVlRcv0+jQVf6BVmmkHL19610CQQDKEqx3TyZx5Zvu\n'+
//'zaGXccVKxm7h0ZkiyDRkmUOxeSUNZft6Lzge7LhktIDau0yXxMeeghgz+ECDBU7H\n'+
//'RQdPorM/AkEA6uAWoGl6deivygIU7SEeuMHNTKPk0DMYMykCSghk3RGnoHQaEkxY\n'+
//'mVALS7rEO7GQ0CVcQ39r5ra5CRh/qcCSTwJAI3e5m8thtRYXE4g2N625clF3/tza\n'+
//'Ixe+0nVwQ0M/NKXUyPJmyE7GYq6n+zxqyiy42OJ+uwh00kppNGKyUND+4wJBAIDf\n'+
//'OasElPvTE3kckUzXCltHgxTVLHwMPO/9RVNHrcgaosYITjHSEB7262u+62Lxd8qt\n'+
//'ZSVn6dVqVral6Y5DqkMCQDQDoeh8JFIgSp+cgURtVvM/NX+fDSrKnFx3V0ayyZRW\n'+
//'wejMtm9O1ueqVcdpifXCM0nlMczQLFlsmWMKSFJls0Q=\n'+
//'-----END RSA PRIVATE KEY-----';

                    //var key_private = new NodeRSA(pvt_key);
                    //var decrypted = key_private.decrypt(VAMaster.Password,'utf8');
		    //console.log(decrypted);
                        return (
                            <tr>
                            <td>{VAMaster.Domain}</td>
                            <td>{VAMaster.URL}</td>
                            <td>{VAMaster.InternalIP}</td>
                            <td>{VAMaster.Username}</td>                       
							<td>{VAMaster.VPNPort}</td>
                            <td>{VAMaster.Company}</td>
                            <td>{VAMaster.DataCenter}</td>
				<td>
	<Bootstrap.DropdownButton bsStyle='primary' title='Action' id='action'>
      <Bootstrap.MenuItem bsClass='primary' eventKey="1" onClick={() => this.modalDelete(VAMaster.Domain, VAMaster.Password)}>Delete</Bootstrap.MenuItem>
      <Bootstrap.MenuItem bsClass='primary' eventKey="2" onClick={() => this.modal(VAMaster.Password, index)}>Get password</Bootstrap.MenuItem>
    </Bootstrap.DropdownButton>
					</td>
                            </tr>
                        );
                    }.bind(this));

                    return (
                        <div>
						<Navbar/>
                         <SideBar className="col-md-3"/>
                        <div className="col-md-offset-4 col-md-4">
						<br/>
					   <Bootstrap.Button type="button" bsStyle='success' bsSize="medium" onClick={this.redirect}><span className="glyphicon glyphicon-plus"> ADD_VAMASTER</span></Bootstrap.Button>
                       <Bootstrap.PageHeader>Show VAMasters</Bootstrap.PageHeader>
                        <Bootstrap.Table striped bordered hover className="table">
                <thead>
                    <tr>
                    <td>Domain</td>
                    <td>URL</td>
                    <td>InternalIP</td>
                    <td>Username</td>
                    <td>VPNPort</td>
                    <td><a className="item" href="#/Company">Company</a></td>
                    <td><a className="item" href="#/DataCenter">Data Center</a></td>
                    <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Bootstrap.Table>
			
			<Bootstrap.Modal show={this.state.showModal} onHide={this.close}>
          <Bootstrap.Modal.Header closeButton>
            <Bootstrap.Modal.Title>Decryption status</Bootstrap.Modal.Title>
          </Bootstrap.Modal.Header>

          <Bootstrap.Modal.Body>
			<label for="picker">Insert private key for decryption</label>
		    <input className='picker' id="picker" type="file"/>
            <hr/>
			<p>{this.state.message}</p>
          </Bootstrap.Modal.Body>
		  
          <Bootstrap.Modal.Footer>
		    <Bootstrap.Button onClick={() => this.decrypt(this.state.password, this.state.index)}>Confirm</Bootstrap.Button>
            <Bootstrap.Button onClick={this.close}>Close</Bootstrap.Button>
          </Bootstrap.Modal.Footer>
        </Bootstrap.Modal>
		
		<Bootstrap.Modal show={this.state.showModalDelete} onHide={this.closeDelete}>
          <Bootstrap.Modal.Header closeButton>
            <Bootstrap.Modal.Title>Deletion status</Bootstrap.Modal.Title>
          </Bootstrap.Modal.Header>

          <Bootstrap.Modal.Body>
			<label for="pickerdelete">Insert private key</label>
		    <input className='pickerdelete' id="pickerdelete" type="file"/>
            <hr/>
			<p>{this.state.message}</p>
          </Bootstrap.Modal.Body>
		  
          <Bootstrap.Modal.Footer>
		    <Bootstrap.Button onClick={() => this.delete(this.state.domain, this.state.password)}>Confirm</Bootstrap.Button>
            <Bootstrap.Button onClick={this.closeDelete}>Close</Bootstrap.Button>
          </Bootstrap.Modal.Footer>
        </Bootstrap.Modal>
                        </div>
                    </div>);
               }

            };

            module.exports = ShowVAMasters;

