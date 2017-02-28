import inputRange   from 'postcss-input-range';
import lh           from 'postcss-lh';
import customMedia  from 'postcss-custom-media';
import minmax       from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';

const themeName = 'wp-starter';
const jsSrc = 'content/themes/' + themeName + '/js/'

export default {
  root: './',
  output: './',
  css: {
    src: 'content/themes/' + themeName + '/scss/**/*.?(s)css',
    dest: 'content/themes/' + themeName,
    postcss: [
      inputRange,
      lh,
      customMedia,
      minmax,
      autoprefixer
    ]
  },
  js: {
    src: [
      jsSrc + 'site.js'
    ],
    dest: 'content/themes/' + themeName + '/static'
  },
  images: {
    src: 'source/images/**',
    dest: '.tmp/images/'
  }
}
