/**
 * Created by mnace on 7/14/2017.
 */
 var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
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
                    this.state={VAMasters:[], showModal: false};
		    this.deleteVA=this.deleteVA.bind(this);
                    this.decrypt=this.decrypt.bind(this);
                }


                getCurrentVAMasters () {
                     var req = new XMLHttpRequest();
                     var me=this;
                     // Feature detection for CORS
                     if ('withCredentials' in req) {
                     req.open('GET','http://127.0.0.1:8000/getAllVAMasters', true);
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
		
		close(){
		  this.setState({ showModal: false});
		}
                decrypt(e,c,b){
                  var me=this;
                  me.setState({showModal: true});
                  //console.log(e);
		  //var file = document.getElementById("picker").files[0];
		  var file=document.getElementsByClassName("picker")[b].files[0];
		  if(file==undefined){
		    alert('Insert a private key for decryption!!!');
	          }
		  else{
		  var reader=new FileReader()
		  reader.onload=function(e){
		     var text=reader.result;
		     //console.log(text);
		     try{
                     var key_private=new NodeRSA(text);
		     //console.log(c);
                     var decrypted=key_private.decrypt(c, 'utf8');
                     console.log("Decrypted password: ");
		     console.log(decrypted);
	             alert("Decrypted password: " + decrypted);
		     }
		     catch(err){alert('Incorrect private key!!!');}
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
		deleteVA(e){
		  var me = this;
		  console.log(e.target.value);
                  var xhr = new XMLHttpRequest();
	          xhr.open("POST", 'http://127.0.0.1:8000/deleteVAMaster/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");


xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
        me.getCurrentVAMasters();
     }
}
xhr.send("domain="+e.target.value);}

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
                            <td>{VAMaster.Password}</td>                            <td>{VAMaster.VPNPort}</td>
                            <td>{VAMaster.Company}</td>
                            <td>{VAMaster.DataCenter}</td>
                    <td><Bootstrap.Button type="button" bsStyle='danger' onClick={this.deleteVA} value={VAMaster.Domain}>Delete</Bootstrap.Button></td>
                    <td><Bootstrap.Button type="button" bsStyle='primary' onClick={() => this.decrypt(VAMaster, VAMaster.Password, index)}>Decrypt</Bootstrap.Button></td>
                    <td><input className='picker' id="picker" type="file"/></td>
                            </tr>
                        );
                    }.bind(this));

                    return (
                        <div>
                         <SideBar className="col-md-3"/>
                        <div className="col-md-offset-4 col-md-7">
                       <Bootstrap.PageHeader>Show VAMasters</Bootstrap.PageHeader>
                        <Bootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                    <td>Domain</td>
                    <td>URL</td>
                    <td>InternalIP</td>
                    <td>Username</td>
                    <td>Password</td>
                    <td>VPNPort</td>
                    <td>Company</td>
                    <td>Data Center</td>
                    <td>Delete?</td>
		    <td>Decrypt password?</td>
		    <td>BROWSE</td>
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

            module.exports = ShowVAMasters;
