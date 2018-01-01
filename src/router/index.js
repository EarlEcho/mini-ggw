const videoTest = () => import('@/views/videoTest')
const CloudStorage = () => import('@/views/cloudStorage')
const TransactionMonitor = () => import('@/views/transactionMonitor')


export default new VueRouter({
    routes: [
        {
            path: '/video',
            meta: {title: "首页"},
            component: videoTest
        },
        {
            path: '/cloud-storage',
            meta: {title: "云仓储"},
            component: CloudStorage
        },
        {
            path: '/',
            meta: {title: "交易监控"},
            component: TransactionMonitor
        }
    ]
})
