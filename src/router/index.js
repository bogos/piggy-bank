import Vue from 'vue';
import Router from 'vue-router';

import WalletManager from '../components/WalletManager';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'WalletManager',
            component: WalletManager
        },
    ]
})