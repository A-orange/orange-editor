import {createStore} from "vuex";

import {page} from "./page";

export const store = createStore({
  modules: {
    page
  }
})
