const category = {
                ALL: '/category/all',
                UPDATE: '/category/update',
                PRODUCT: '/category/productList'
        },
        index = {
                All: '/all',
                UPDATE: '/update',
                PRODUCT: '/productList'
        },
        product = {
                ALL: '/product/all'
        },
        cart = {
                ALL: '/cart/all',
                ADD: '/cart/add',
                REDUCE: '/cart/reduce',
                REMOVE: '/cart/remove'
        },
        user = {
                ACCOUNT: '/user/account',
                LOGOUT: '/user/signout',
                LOGIN: '/user/signin',
                SIGNUP: '/user/signup',
                CHANGEPWD: '/user/changepwd'
        },
        order = {
                GET: '/order/get',
                ADD: '/order/add'
        },
        site = {
                GET: '/site/get',
                CHANGE: '/site/change',
                ADD: '/site/add'
        };
export default {category, index, product, cart, user, order, site}