import { createMuiTheme } from "@material-ui/core"

// import variables from './variables';

const defaultTheme = createMuiTheme()
const req = require.context('./components', false, /.js$/)
let overrides = {};

req.keys().forEach(filename => {
  overrides = {
    ...overrides,
    ...req(filename).default(defaultTheme),
  }
})

export default {
  overrides: overrides
}