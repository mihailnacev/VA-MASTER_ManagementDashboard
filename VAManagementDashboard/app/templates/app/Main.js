/**
 * Created by mnace on 6/29/2017.
 */
var React=require('react');
var ReactDOM=require('react-dom');
var Bootstrap=require('react-bootstrap');
var classNames=require('classnames');
var SideBar=require('./Sidebar');
var NavBar=require('./Navbar');
var Company=require('./ShowCompanies');

class Main extends React.Component {
            render() {
                return (
                <div>
                    <SideBar className="col-md-3"/>
                    <Company/>
                </div>);
            }
        }

        module.exports = Main;
