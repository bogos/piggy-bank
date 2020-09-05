import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import { ValidationProvider, ValidationObserver, extend, localize} from 'vee-validate';
import en from 'vee-validate/dist/locale/en.json';
import * as rules from 'vee-validate/dist/rules';

Vue.config.productionTip = false;

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('en', en);

new Vue({
  router,
  store,
  ValidationProvider,
  ValidationObserver,
  render: h => h(App),
}).$mount('#app')
