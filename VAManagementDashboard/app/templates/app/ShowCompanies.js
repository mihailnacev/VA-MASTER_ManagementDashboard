/**
 * Created by mnace on 6/30/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            var request=require('request');
            var jquery=require('jquery');



            var Companies= React.createClass({
                getInitialState: function(){
                    return {companies: []};
                },

                getCurrentCompanies: function () {
                    var me = this;
                    request('http://127.0.0.1:8000/app/getAllCompanies',function (error, response, body) {
                     console.log('error:', error); // Print the error if one occurred
                     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                     console.log('body:', body); // Print the HTML for the Google homepage.
                     me.setState({companies: response});
                     });
                  /*  jquery.getJSON("http://127.0.0.1:8000/app/getAllCompanies", function( data ) {
                        me.setState({companies: data});
                    });*/
                },

                componentDidMount: function(){
                  this.getCurrentCompanies()
                },

               render: function(){
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

                    return (<div>
                        <Bootstrap.PageHeader>Name <small>Description</small></Bootstrap.PageHeader>
                        <Bootstrap.Table striped bordered hover>
                <thead>
                    <tr>
                    <td>Company name</td>
                    <td>Description</td>
                    <td>Company address</td>
                    </tr>
                </thead>
                <tbody>
                    {company_rows}
                </tbody>
            </Bootstrap.Table>

                    </div>);
               }

            });

            module.exports = Companies;
