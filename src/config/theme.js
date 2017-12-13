import Color from 'color';

const UNIT = 10;

const GREEN = '#00CED9';
const RED = '#FF5C84';
const BLUE = '#2283CD';
const WHITE = '#ffffff';
const BLACK = '#000000';

export default {
  // -- Transitions
  ANIMATION_DURATION: 400,
  ANIMATION_QUICK_DURATION: 225,
  ANIMATION_EASING: 'ease-in-out-sine',

  // -- Colors
  WHITE: 'white',
  BLACK: 'black',
  PRIMARY: '#3920F5',
  ACCENT: '#C668FD',
  CONTRAST: 'rgba(255, 255, 255, 0.75)',
  COLOR_LOW: 'rgba(255,0,0,0.35)',
  COLOR_HIGH: 'rgba(0,255,0,0.35)',
  FONT_PRIMARY_COLOR: 'black',
  COLOR_SECONDARY: 'rgba(0, 0, 0, 0.5)',

  TRANSPARENT: 'transparent',
  BACKGROUND_HIGHLIGHT: 'rgba(255, 255, 255, 0.15)',
  BACKGROUND_DARK: 'rgba(0, 0, 0, 0.15)',
  BACKGROUND_DARK_HIGHLIGHT: 'rgba(0, 0, 0, 0.1)',
  MODAL_BACKDROP: 'rgba(0, 0, 0, 0.5)',

  // -- Fonts
  FONT_SIZE_SMALL: UNIT * 1.2,
  FONT_SIZE_NORMAL: UNIT * 1.6,
  FONT_SIZE_LARGE: UNIT * 2,
  FONT_SIZE_EXTRA_LARGE: UNIT * 2.4,
  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_BOLD: '700',

  // -- Sizes
  UNIT,
  OFFSET: UNIT * 1.6,
  MAIN_LAYOUT_HEIGHT: '55%',
  SECOND_LAYOUT_HEIGHT: '45%',
};
