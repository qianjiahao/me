var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');
var Style = require('./style.js');
var { msg , mixins } = require('iflux');
var store = require('./store.js');
var moment = require('moment');

var Index = React.createClass({
  mixins: [mixins.StoreMixin(store), PureRenderMixin],

  componentDidMount() {
    msg.emit('index:init');
  },

  render() {
    var data = store.data();

    console.log(data && data.toJS());
    
    return (
      <div style={Style.container}>
        <div style={Style.rightAside}>
          <img className="cover-img" src="../../images/bg2.jpg" />
        </div>
        <div style={Style.warpper}>
          <div style={Style.head}>
            <span style={Style.headOne}>记录生活<br /></span>
            <span style={Style.headSecond}>点滴</span>
          </div>
          <div style={Style.content}>
            {data.get('data').size 
              ? data.get('data').map((v, k) => {

                return (
                  <div key={k} style={Style.group} className="clearFix">
                    <div style={Style.groupCoverBox}>
                      <img src={`uploads/images/${v.get('cover')}`} width="40px"/>
                    </div>
                    <div style={Style.groupContent}>
                      <span style={Style.groupTitle}>{v.get('title')}</span>
                      <span style={Style.groupDate}>{moment(v.get('modify_date')).format('MM-DD YYYY')}</span>
                    </div>
                  </div>
                )
              })
              : <span>nothing right now ...</span>
            }

          </div>
        </div>
      </div>
    );
  }

});

module.exports = Index;