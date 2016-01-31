var React = require('react');
var Style = require('./style.js');

var Cover = React.createClass({
  getInitialState() {

    var images = [
      'images/bg2.jpg',
      'images/bg3.jpg',
      'images/latte.jpg'
    ];

    return {
      images: images,
      url: images[0],
      index: 0
    }
  },

  componentDidMount() {

    var _this = this;
    var len = this.state.images.length;

    var timer ;

    this.toggleCover = function () {

      _this.setState({
        url: _this.state.images[this.state.index],
        index: (this.state.index + 1) % len
      });

      clearInterval(timer);

      timer = setInterval(() => {
        _this.setState({
          url: _this.state.images[this.state.index],
          index: (this.state.index + 1) % len
        });
      },3000);
    }

    this.toggleCover();

  },

  render: function() {
    return (
      <div>
        <div className="cover-img" style={{backgroundImage: `url(${this.state.url})`}} />
        <div style={Style.nav}>
        {this.state.images.map((v, k) => {
          return (
              <i key={k} className="iconfont icon-dot" style={Style.dot} onClick={this.click.bind(this, k)}></i>
            )
        })}
        </div>
      </div>
    );
  },

  click(index) {
    this.setState({
      index: index
    });

    this.toggleCover();
  }
});

module.exports = Cover;