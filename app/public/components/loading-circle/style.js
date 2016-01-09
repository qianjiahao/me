module.exports = {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a2a',
    opacity: '0.7',
    position: 'absolute',
    overflow: 'hidden'
  },
  circle: {
    width: '26vw',
    height: '26vw',
    position: 'absolute',
    zIndex: '999',
    top: '25%',
    right: '38vw',
    /*border: 1px #b1b1b1 solid;*/
    transform: 'rotate(45deg)',
    animationName:'round',
    animationDuration: '2.4s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',

    WebkitAnimationName:'round',
    WebkitAnimationDuration: '2.4s',
    WebkitAnimationTimingFunction: 'ease-in-out',
    WebkitAnimationIterationCount: 'infinite',
  },
  dot: {
    width: '1.5vw',
    height: '1.5vw',
    borderRadius: '1.5vw',
    position: 'absolute',
    boxShadow: '0px 0px 2px #333'
  },

  d8: { backgroundColor: '#000000' },
  d7: { backgroundColor: '#8B00FF' },
  d6: { backgroundColor: '#0000FF' },
  d5: { backgroundColor: '#00FFFF' },
  d4: { backgroundColor: '#00FF00' },
  d3: { backgroundColor: '#FFFF00' },
  d2: { backgroundColor: '#FF7F00' },
  d1: { backgroundColor: '#FF0000' },
  d0: { backgroundColor: '#FFFFFF' },

  c0: { WebkitAnimationDelay: '0.0s' },
  c1: { WebkitDnimationDelay: '0.1s' },
  c2: { WebkitAnimationDelay: '0.2s' },
  c3: { WebkitAnimationDelay: '0.3s' },
  c4: { WebkitAnimationDelay: '0.4s' },
  c5: { WebkitAnimationDelay: '0.5s' },
  c6: { WebkitAnimationDelay: '0.6s' },
  c7: { WebkitDnimationDelay: '0.7s' },
  c8: { WebkitAnimationDelay: '0.8s' },
}