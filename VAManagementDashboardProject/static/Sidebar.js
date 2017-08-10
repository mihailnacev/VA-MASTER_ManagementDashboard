/**
 * Created by mnace on 6/28/2017.
 */
            var React=require('react');
            var ReactDOM=require('react-dom');
            var Bootstrap=require('react-bootstrap');
            var classNames=require('classnames');
            var Icons=require('glyphicons');
            global.jQuery = require('jquery');
            var bootstrap=require('bootstrap');



        class Sidebar extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    uiElementsCollapsed: true,
                    chartsElementsCollapsed: true,
                    multiLevelDropdownCollapsed: true,
                    thirdLevelDropdownCollapsed: true,
                    samplePagesCollapsed: true,
                };

            }
          render() {
    return (
        <div className="sidebar">
      <div className="navbar-default sidebar" style={{ marginLeft: '-20px' }} role="navigation">
        <div className="sidebar-nav navbar-collapse collapse">
          <ul className="nav in" id="side-menu">
            <li className="sidebar-search">
              <div className="input-group custom-search-form">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="input-group-btn">
                  <button className="btn btn-default" type="button">
                    <span className="glyphicon glyphicon-search" />
                  </button>
                </span>
              </div>
            </li>

            <li>
              <a href="#/DataCenter">
                  <span className="glyphicon glyphicon-align-justify">&nbsp;DataCenters&nbsp;</span>
              </a>
            </li>
			
			  <li>
              <a href="#/VAMaster">
                  <span className="glyphicon glyphicon-align-justify">&nbsp;VAMasters&nbsp;</span>
              </a>
            </li>
			
			  <li>
              <a href="#/Company">
                  <span className="glyphicon glyphicon-align-justify">&nbsp;Companies&nbsp;</span>
              </a>
            </li>

          </ul>
        </div>
      </div>
        </div>
    );
  }
}

 module.exports = Sidebar;
