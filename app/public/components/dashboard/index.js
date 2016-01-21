var React = require('react');
var Style = require('./style.js');
var { msg, mixins } = require('iflux');
var store = require('./store.js');

var Dashboard = React.createClass({
  mixins: [mixins.StoreMixin(store)],

  componentDidMount() {
    msg.emit('init');
  },
  render: function() {

    var data = store.data();

    console.log(data && data.toJS());
    return (
      <div>
        dashboard .

        <table style={Style.table}>
          <thead>
            <tr>
              <th style={Style.th}>title</th>
              <th style={Style.th}>tags</th>
              <th style={Style.th}>content</th>
              <th style={Style.th}>create_date</th>
              <th style={Style.th}>modify_date</th>
              <th style={Style.th}>publish</th>
            </tr>
          </thead>
          <tbody>
            {data.get('result') && data.get('result').map((v, k) => {
              return (
                <tr key={k} style={Style.tr}>
                  <td style={Style.td}>{v.get('title')}</td>
                  <td style={Style.td}>
                    {v.get('tags').size
                      ? v.get('tags').map((t, i) => {
                          return (<span key={i}>{t}</span>)
                        })
                      : null
                    }
                  </td>
                  <td style={Style.td}>{v.get('h_content').slice(0, 60)}</td>
                  <td style={Style.td}>{v.get('publish')}</td>
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