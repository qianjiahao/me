module.exports = {
  panel: {
    display: 'none',
    width: '600px',
    height: '400px',
    position: 'absolute',
    left: '300px',
    top: '150px',
    backgroundColor: 'white',
    boxShadow: '0 1px 6px #333',
    padding: '10px',
    border: '10px #666 solid',
    overflow: 'hidden'
  },
  open: {
    display: 'block'
  },
  close: {
    position: 'absolute',
    right: '0',
    top: '0',
    padding: '10px',
    cursor: 'pointer',
  },
  tab: {
    display: 'inline-block',
    padding: '3px 10px',
    boxShadow: '0 1px 3px #999'
  },
  active: {
    color: 'white',
    backgroundColor: '#3dbcf5'
  },
  form: {
    display: 'none'
  },
  frame: {
    border: 'none',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0'
  },
  content: {
    width: '100%',
    display: 'none',
    marginTop: '10px',
  },
  uploadsArea: {
    cursor: 'pointer',
    height: '300px',
    backgroundImage: 'url("./images/default.png")',
    backgroundSize: 'contain',
    backgroundPosition: '50% 60%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ccc'
  },
  pictureArea: {
    height: '300px',
  },
  submit: {
    display: 'block',
    width: '100%',
    padding: '20px 0',
    backgroundColor: '#3dbcf5',
    fontSize: '24px',
    textAlign: 'center',
    lineHeight: '24px',
    color: 'white'
  },
  img: {
    width: '100px',
    height: '60px',
    overflow: 'hidden',
    float: 'left',
    margin: '10px'
  },
  page: {
    width: '400px',
    float: 'left',
    textAlign: 'center',
    marginTop: '20px',
    position: 'relative'
  },
  pre: {
    position: 'absolute',
    left: '0'
  },
  current: {
    textAlign: 'center'
  },
  next: {
    position: 'absolute',
    right: '0'
  },
  pageRight: {
    marginLeft: '420px',
    textAlign: 'right',
    marginTop: '20px'
  },
  settings: {
    margin: '0 10px',
  }
}