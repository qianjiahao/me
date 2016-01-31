var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Style = require('./style.js');
var { msg , mixins } = require('iflux');
var store = require('./store.js');
var moment = require('moment');
var { Link } = require('react-router');

var Index = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  componentDidMount() {
    msg.emit('index:init');
  },

  render() {
    var data = store.data();
    var result = {};

    data.get('data')
      .groupBy(item => new Date(item.get('create_date')).getFullYear())
      .forEach((v, year) => {
        result[year] = {};
        v
        .groupBy(item => new Date(item.get('create_date')).getMonth() + 1)
        .forEach((v, month) => {
          result[year][month] = {};
          v
          .groupBy(item => new Date(item.get('create_date')).getDate())
          .forEach((v, day) => {
            result[year][month][day] = [];
            v.forEach((v, k) => {
              result[year][month][day].push(v.toJS());
            });
          });
        });
      });

    return (
      <div style={Style.container}>
        <div style={Style.rightAside}>
          <div className="cover-img" style={{backgroundImage: 'url(images/bg2.jpg)'}} />
        </div>
        <div style={Style.warpper}>
          <div style={Style.head}>
            <span style={Style.headOne}>“所谓诚其意者，毋自欺也”<br /></span>
            <span style={Style.headSecond}>--《礼记·大学》</span>
          </div>
          <div style={Style.content}>
            {
              Object.keys(result).map((year, k) => {
                return (
                  <div key={k}>
                    <h2 style={Style.year}>{year}年</h2>
                    {
                      Object.keys(result[year]).map((month, k) => {
                        return (
                          <div key={k}>
                            <h2 style={Style.month}>{month}月</h2>
                            {
                              Object.keys(result[year][month]).map((day, k) => {
                                return (
                                  <div key={k}>
                                    <h3 style={Style.day}>{day}日</h3>
                                    {
                                      result[year][month][day].map((doc, k) => {
                                        return (
                                          <div key={k} style={Style.doc}>
                                            <span style={Style.date}>{moment(doc.modify_date).format('HH:mm:ss')}</span>
                                            <Link style={Style.title} to={`/doc/${doc.uuid}`}>{doc.title}</Link>
                                          </div>
                                        )
                                      })         
                                    }
                                  </div>
                                )
                              })
                            }
                          </div>
                        )
                      })                      
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Index;