var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var { msg, mixins } = require('iflux');
var { Link } = require('react-router');

var Style = require('./style.js');
var store = require('./store.js');

var Dashboard = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  componentDidMount() {
    msg.emit('dashboard:init');
  },
  render: function() {

    var data = store.data();

    return (
      <div>
        <table style={Style.table}>
          <thead>
            <tr>
              <th style={Style.th}>title</th>
              <th style={Style.th}>content</th>
              <th style={Style.th}>publish</th>
              <th style={Style.th}>edit</th>
              <th style={Style.th}>remove</th>
            </tr>
          </thead>
          <tbody>
            {data.get('result') && data.get('result').map((v, k) => {
              return (
                <tr key={k} style={Style.tr}>
                  <td style={Style.td}>{v.get('title')}</td>
                  <td style={Style.td}>{v.get('h_content').slice(0, 60)}</td>
                  <td style={Style.td}>{v.get('publish')}</td>
                  <td style={Style.td}><Link to={`/console/writer/${v.get('uuid')}`}>编辑</Link></td>
                  <td style={Style.td}><a href="javascript:;" onClick={() => msg.emit('doc:remove', v.get('uuid'))}>remove</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }

});

module.exports = Dashboard;