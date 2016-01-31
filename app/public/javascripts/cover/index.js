var React = require('react');
var Style = require('./style.js');
var assign = require('javascripts/Object.assign.js');

var Cover = React.createClass({
  getInitialState() {

    var images = [
      'images/bg2.jpg',
      'images/bg3.jpg',
      'images/latte.jpg'
    ];

    return {
      images: images,
      index: 0,
      time: 5000
    }
  },

  componentDidMount() {

    var _this = this;
    var len = this.state.images.length;

    var timer ;

    this.toggleCover = function (index) {

      _this.setState({
        index: (index) % len
      });

      clearInterval(timer);

      timer = setInterval(() => {
        _this.setState({
          index: (index + 1) % len
        });
      },_this.state.time);
    }

    this.toggleCover(this.state.index);

  },

  render: function() {
    return (
      <div>
        {this.state.images.map((v, k) => {
          return (<div key={k} className="cover-img" style={assign({}, {backgroundImage: `url(${v})`}, Style.image, (this.state.index == k ? Style.show : Style.hide))} />)
        })}
        
        <div style={Style.nav}>
        {this.state.images.map((v, k) => {
          return (<i key={k} className="iconfont icon-dot" style={Style.dot} onClick={this.click.bind(this, k)}></i>)
        })}
        </div>
      </div>
    );
  },

  click(index) {
    this.toggleCover(index);
  }
});

module.exports = Cover;