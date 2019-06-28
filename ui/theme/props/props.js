
const req = require.context('./components', false, /.js$/);
let props = {};

req.keys().forEach(filename => {
  props = {
    ...props,
    ...req(filename).default,
  }
})

export default {
  // ...variables.theme,
  props: props
}