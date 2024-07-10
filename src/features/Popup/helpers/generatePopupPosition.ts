export const calculatePopupPosition = (parameters: any) => {
  let top, left, right, bottom, TransformTranslate, animatfirst, animateLast

  if (parameters['position'] === 'bottomL') {
    top = ''
    left = '5%'
    right = ''
    bottom = '5%'
    TransformTranslate = '(0, 0)'
    animatfirst = '-100%'
    animateLast = '0'
  } else if (parameters['position'] === 'bottomR') {
    top = ''
    left = ''
    right = '5%'
    bottom = '5%'
    TransformTranslate = '(0, 0)'
    animatfirst = '100%'
    animateLast = '0'
  } else if (parameters['position'] === 'topL') {
    top = '5%'
    left = '5%'
    right = ''
    bottom = ''
    TransformTranslate = '(0, 0)'
    animatfirst = '-100%'
    animateLast = '0'
  } else if (parameters['position'] === 'topR') {
    top = '5%'
    left = ''
    right = '5%'
    bottom = ''
    TransformTranslate = '(0, 0)'
    animatfirst = '100%'
    animateLast = '0'
  } else {
    TransformTranslate = '(-50%,-50%)'
    top = '50%'
    left = '50%'
    right = ''
    bottom = ''
  }

  return {
    top: top,
    left: left,
    right: right,
    bottom: bottom,
    TransformTranslate: TransformTranslate,
    animatfirst,
    animateLast,
  }
}
