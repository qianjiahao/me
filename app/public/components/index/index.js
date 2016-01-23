var React = require('react');
var Style = require('./style.js');
var { msg , mixins } = require('iflux');
var store = require('./store.js');

var Index = React.createClass({
  mixins: [mixins.StoreMixin(store)],

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
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>

          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          555</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdsffdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>

          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdsdf</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
          <p>sfsdfksdjfksdjlsjflkdfdsjfksdf
          sdflksdjfsdfjsdfjsdjfsdj</p><br/>
        </div>
      </div>
    );
  }

});

module.exports = Index;