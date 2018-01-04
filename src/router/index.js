const TransactionMonitor = () => import('@/views/transactionMonitor')
const CloudStorage = () => import('@/views/cloudStorage')
const homePage = () => import('@/views/homePage')


export default new VueRouter({
    routes: [
        {
            path: '/',
            meta: {title: "交易监控"},
            component: TransactionMonitor
        },
        {
            path: '/cloud-storage',
            meta: {title: "云仓储"},
            component: CloudStorage
        },
        {
            path: '/temp',
            meta: {title: "钢谷网大数据交易监控系统"},
            component: homePage
        }
    ]
})
