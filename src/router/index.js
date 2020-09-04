import Vue from 'vue';
import Router from 'vue-router';

import WalletManager from '../components/WalletManager';
import Contact from '../components/Contact';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'WalletManager',
            component: WalletManager
        },
        {
            path: '/contact',
            name: 'Contact',
            component: Contact
        },

    ]
})