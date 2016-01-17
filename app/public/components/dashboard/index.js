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

    return (
      <div>
        dashboard .

        <table>
          {data.get('result').map((v, k) => {
            return (
              <tr key={k}>
                <td>{v.title}</td>
                <td>
                  {v.tags.size 
                    ? v.tags.map((t, i) => {
                        return (<span key={i}>{t}</span>)
                      })
                    : null
                  }
                </td>
                <td>{v.content.slice(0, 20)}</td>
                <td>{v.create_date}</td>
                <td>{v.modify_date}</td>
              </tr>
            )
          })}
        </table>
        
      </div>
    );
  }

});

module.exports = Dashboard;