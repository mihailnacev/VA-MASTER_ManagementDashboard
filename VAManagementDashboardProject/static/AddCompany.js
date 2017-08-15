/**
 * Created by mnace on 8/15/2017.
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


            class AddCompany extends React.Component{

                constructor(){
                    super();
					var user=localStorage.getItem("token");
                    if(user==undefined||user=='')
                    {
						window.location.replace("/#/");
					}
                    this.state={};
					this.createCompany=this.createCompany.bind(this);
                }

                componentDidMount(){

                }

				createCompany() {
				   var me=this;
				   //var file=document.getElementById("publickey").files[0];
				  // var loggedUser=localStorage.getItem("loggedUser");
				   var name=document.getElementById("name").value;
				   var description=document.getElementById("description").value;
				   var address=document.getElementById("address").value;
				   var contactemail=document.getElementById("contactemail").value;
				   var contactnumber=document.getElementById("contactnumber").value;

						console.log(name);
						console.log(description);
						console.log(address);
						console.log(contactemail);
						console.log(contactnumber);

                        xhr.open("POST", '/addCompany/', true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

xhr.onreadystatechange = function() {//Call a function when the state changes.
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        // Request finished. Do processing here
		window.location.replace("/#/Company");
     }
}
xhr.send("name="+name+"&description="+description+"&address="+address+"&contactemail="+contactemail+"&contactnumber="+contactnumber);


				}

               render(){

					return (
                        <div>
						<Navbar/>
                         <SideBar className="col-md-3"/>
                        <div className="col-md-offset-4 col-md-7">
                         <h1>Add Company</h1>

						   <Bootstrap.FormGroup controlId="name">
						      <Bootstrap.ControlLabel>Company name</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter company name"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="description">
						      <Bootstrap.ControlLabel>Description</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter Description"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="address">
						      <Bootstrap.ControlLabel>Address</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter company address"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="contactemail">
						      <Bootstrap.ControlLabel>Contact email</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter contact email"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.FormGroup controlId="contactnumber">
						      <Bootstrap.ControlLabel>Contact number</Bootstrap.ControlLabel>
							  <Bootstrap.FormControl type="text" placeholder="Enter contact number"/>
						   </Bootstrap.FormGroup>

						   <Bootstrap.Button type="submit" onClick={() => this.createCompany()}>Submit</Bootstrap.Button>

                       </div>
                    </div>);
               }

            };

            module.exports = AddCompany;

