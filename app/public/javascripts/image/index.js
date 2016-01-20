var React = require('react');
var Style = require('./style.js');
var assign = require('javascripts/Object.assign.js');
var store = require('./store.js');
var { msg, mixins } = require('iflux');


var Image = React.createClass({
  mixins: [mixins.StoreMixin(store)],

  componentDidMount() {
    msg.emit('image:tab', 0);
  },
  render: function() {

    var data = store.data();
    var active = data.get('active');
    var tab = data.get('tab');
    var images = data.get('images');
    var selected = data.get('selected');

    return (
      <div style={assign({}, Style.container, (active ? Style.show : Style.hide))}>
        {/* 头部 */}
        <div style={Style.topBar}>
          <span style={assign({}, Style.left, Style.fontSize22)}>选择图片</span>
          <span style={assign({}, Style.right, )}><i className="iconfont icon-close" style={Style.fontSize22}></i></span>
        </div>

        {/* 左边 tab */}
        <div style={Style.leftAside}>
          <i className="iconfont icon-image hoverBtn" style={assign({}, Style.tab, Style.left, (tab == 0 ? Style.activeTab : {}))} onClick={() => msg.emit('image:tab', 0)}></i>
          <i className="iconfont icon-upload hoverBtn" style={assign({}, Style.tab, Style.left, (tab == 1 ? Style.activeTab : {}))} onClick={() => msg.emit('image:tab', 1)}></i>
          <i className="iconfont icon-wrench hoverBtn" style={assign({}, Style.tab, Style.left, (tab == 2 ? Style.activeTab : {}))} onClick={() => msg.emit('image:tab', 2)}></i>
        </div>

        {/* 内容 content */}
        <div style={Style.content}>
          {tab == 0 
            ? (
                <div>
                  {/* 图片 */}
                  {images.map((v, k) => {

                    var s = selected.indexOf(v) != -1;

                    return (
                      <div style={Style.box} key={k} onClick={() => msg.emit('image:select', v)}>
                      <div style={assign({}, Style.boxTop, (s ? Style.show : Style.hide))}><i className="iconfont icon-done" style={Style.boxIcon}></i></div>
                        <img src={`uploads/images/${v}`} width="100%"/>
                      </div>
                    )
                  })}
                </div>
              ) 
            : (
                <div>
                  {/* 上传 */}   
                </div>
              )
          }
          

          
        </div>
      </div>
    );
  }

});

module.exports = Image;