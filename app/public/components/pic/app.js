var React = require('react');
var Style = require('./style.js');
var assgin = require('../../javascripts/Object.assign.js');
var { msg, mixins } = require('iflux');
var StoreMixin = mixins.StoreMixin;
var store = require('./store.js');

var Pic = React.createClass({
  mixins: [StoreMixin(store)],

  getDefaultProps() {
    return {
      styles: {}
    }
  },
  render: function() {
    var data = store.data();

    return (
      <div style={this.props.styles}>
        <span onClick={() => msg.emit('toggle_panel', true)}>pic</span>

        <div style={assgin({}, Style.panel, (data.get('toggle_panel') ? Style.open : {}))}>
          <span onClick={() => msg.emit('toggle_panel', false)} style={Style.close}>X</span>
          <span style={assgin({}, Style.tab, (data.get('tab') == 0 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 0)}>upload</span>
          <span style={assgin({}, Style.tab, (data.get('tab') == 1 ? Style.active : {}))} onClick={() => msg.emit('toggle_tab', 1)}>picture</span>
        
          <div style={assgin({}, Style.content, (data.get('tab') == 0 ? Style.open : {}))}>
            <div style={Style.uploadsArea}  onClick={this.chooseFile}>
              <form ref="form" action="/uploads" method="post" encType="multipart/form-data" target="frameFile" style={{visibility: 'hidden'}}>
                <div style={Style.group}>
                  <input type="file" name="file" ref="file" multiple="multiple"/>
                </div>
              </form>
              <iframe id='frameFile' name='frameFile' style={{display: 'none'}}></iframe>
            </div>
            <div onClick={() => this.refs.form.submit()} style={Style.submit}>uploads</div>
          </div>
          <div style={assgin({}, Style.content, (data.get('tab') == 1 ? Style.open : {}))}>
            <div style={Style.pictureArea}>
              {data.get('images').map((v, k) => {
                return (<img key={k} src={'uploads/' + v} width='100'/>);
              })}
            </div>
            <div style={Style.pre}>pre</div>
            <div onClick={() => msg.emit('choose_picture')} style={Style.choose}>choose</div>
            <div style={Style.next}>next</div>
          </div>
        </div>
      </div>
    );
  },

  chooseFile(e) {
    this.refs.file.click();
  }
});

module.exports = Pic;