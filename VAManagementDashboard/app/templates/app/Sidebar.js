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
        <div className="col-md-3">
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
              <a href="" onClick={(e) => { e.preventDefault(); }} >
                <span className="glyphicon glyphicon-dashboard" /> &nbsp;Dashboard
              </a>
            </li>

            <li className={classNames({ active: !this.state.chartsElementsCollapsed })}>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  this.setState({ chartsElementsCollapsed: !this.state.chartsElementsCollapsed });
                  return false;
                }}
              >
                  <span className="glyphicon glyphicon-align-left">&nbsp;Tables&nbsp;</span>
                <span className="glyphicon glyphicon-arrow-right" />
              </a>
              <ul
                className={
                  classNames({
                    'nav nav-second-level': true,
                    collapse: this.state.chartsElementsCollapsed,
                  })
              }
              >
                <li>
                  <a href="#/DataCenter">
                    Data Centers
                  </a>
                </li>

                <li>
                  <a href="" onClick={(e) => { e.preventDefault(); }}>
                    VA-Masters
                  </a>
                </li>

                  <li>
                  <a href="#/Company">
                    Companies
                  </a>
                </li>

              </ul>
            </li>

            <li>
              <a href="" onClick={(e) => { e.preventDefault(); }} >
                  <span className="glyphicon glyphicon-list">&nbsp;Charts&nbsp;</span>
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
