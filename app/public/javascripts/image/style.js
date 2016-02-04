module.exports = {
  // base style
  container: {
    width: '700px',
    height: '400px',
    boxShadow: '0px 0px 6px #666',
    position: 'relative',
    margin: '-500px auto',    
    backgroundColor: 'white',
    transition: 'all 0.3s'
  },
  show: {
    zIndex: '1',
    opacity: '1'
  },
  hide: {
    zIndex: '-1',
    opacity: '0'
  },
  left: {
    float: 'left'
  },
  right: {
    float: 'right'
  },
  fontSize22: {
    fontSize: '22px'
  },
  paddingLeft: {
    paddingLeft: '10px'
  },
  bg: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    transition: 'all 0.3s'
  },

  // 头部
  topBar: {
    padding: '10px',
    height: '50px',
    width: '100%',
    position: 'absolute',
    top: '0px',
    boxSizing: 'border-box',
    borderBottom: '1px #b1b1b1 solid'
  },

  // 左侧导航
  leftAside: {
    position: 'absolute',
    top: '50px',
    left: '0px',
    bottom: '0px',
    width: '50px',
    borderRight: '1px #b1b1b1 solid'
  },
  tab: {
    float: 'left',
    width: '50px',
    fontSize: '28px',
    boxSizing: 'border-box',
    padding: '10px'
  },
  activeTab: {
    color: 'white',
    backgroundColor: '#3dbcf5',
    borderColor: '#3dbcf5'
  },

  // 内容区域
  content: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50px',
    left: '50px',
    right: '0px',
    bottom: '0px',
    padding: '10px'
  },

  // 图片样式
  box: {
    width: '160px',
    height: '98px',
    float: 'left',
    overflow: 'hidden',
    margin: '10px',
    position: 'relative'
  },
  boxTop: {
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
    backgroundColor: 'black',
    textAlign: 'center',
    lineHeight: '98px'
  },
  selected: {
    opacity: '0.7'
  },
  unselected: {
    opacity: '0'
  },
  boxIcon: {
    color: 'white',
    fontSize: '34px'
  },
  imageContent: {
    marginLeft: '45px'
  },

  // 分页样式
  pageBtn: {
    width: '45px',
    height: '216px',
    textAlign: 'center',
    marginTop: '10px',
    lineHeight: '216px',
    position: 'absolute',
    top: '10px'
  },
  pagePre: {
    left: '10px'
  },
  pageNext: {
    right: '10px'
  },
  pageInfo: {
    position: 'absolute',
    right: '245px',
    bottom: '20px',
    width: '160px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '20px',
    textAlign: 'center'
  },

  // 完成按钮
  finish: {
    position: 'absolute',
    right: '65px',
    bottom: '20px',
    width: '160px',
    height: '40px',
    lineHeight: '40px',
    backgroundColor: '#eee',
    fontSize: '24px',
    textAlign: 'center',
  },

  uploadContent: {

  },
  iframe: {
    width: '100%',
    border: 'none',
    height: '320px',
    boxSizing: 'border-box'
  }

}