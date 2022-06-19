import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = new VueRouter({
    mode:'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: () =>
                import ('../components/Index.vue')
        },
        {
        path: '/signup',
        name: 'signup',
        component: () =>
            import ('../components/Signup.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../components/Login.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        component: () =>
            import ('../components/Profile.vue')
    },
    {
        path: '/addproduct',
        name: 'AddProduct',
        component: () =>
            import ('../components/AddProduct.vue')
    },
    {
        path: '/productlist',
        name: 'ProductList',
        component: () =>
            import ('../components/ProductList.vue')
    },
    {
        path: '/foodList',
        name: 'Foods',
        component: () =>
            import ('../components/AdminTools/FoodList.vue')
    },
    {
        path: '/createFood',
        name: 'Foods',
        component: () =>
            import ('../components/AdminTools/CreateFood.vue')
    },
    {
        path: '/recipientList',
        name: 'Recipients',
        component: () =>
            import ('../components/AdminTools/RecipientList.vue')
    },
    {
        path: '/createRecipient',
        name: 'Recipients',
        component: () =>
            import ('../components/AdminTools/CreateRecipient.vue')
    },
    {
        path: '/transportList',
        name: 'Transports',
        component: () =>
            import ('../components/AdminTools/TransportList.vue')
    },
    {
        path: '/createTransport',
        name: 'Transports',
        component: () =>
            import ('../components/AdminTools/CreateTransport.vue')
    },
    {
        path: '/typeprods',
        name: 'TypeProds',
        component: () =>
            import ('../components/AdminTools/TypeProd.vue')
    },
    {
        path: '/viewproduct',
        name: 'ViewProduct',
        component: () =>
            import ('../components/ViewProduct.vue')
    },
    {
        path: '/createtransport',
        name: 'CreateTransport',
        component: () =>
            import ('../components/AdminTools/CreateTransport.vue')
    },
]});

export default routes