/**
 * Created by mnace on 6/29/2017.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var Bootstrap=require('react-bootstrap');
var classNames=require('classnames');
var SideBar=require('./Sidebar');
var Navbar=require('./Navbar');
var Company=require('./ShowCompanies');

class Main extends React.Component {
            
			constructor(){
                    super();
                    var user=localStorage.getItem("loggedUser");
                    if(user==undefined||user=='')
                    {
						window.location.replace("http://127.0.0.1:8000/#/");
					}						
            }
			render() {
                return (
                <div>
                    <Navbar/>
					<SideBar class="col-md-offset-3"/>
                </div>);
            }
        }

        module.exports = Main;
