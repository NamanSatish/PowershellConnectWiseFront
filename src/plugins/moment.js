import moment from 'moment';
export default function install (Vue) {
  Object.defineProperties(Vue.prototype, {
    $moment: {
      get () {
        return moment;
      }
    }
  })
}