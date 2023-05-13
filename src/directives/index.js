// 定义懒加载插件
export const lazyPlugin = {
    install(app) {
        // 懒加载指令逻辑
        // 定义全局指令
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(element => {
                    const { isIntersecting, target } = element
                    if (isIntersecting) {
                        target.src = target.dataset.url
                        observer.unobserve(target)
                    }
                });
            },
            {
                root: null, // 要监听的根元素 默认是视窗
                rootMargin: '0px', // 根元素外边距
                threshold: 0,   // 交叉比例0-1
            }
        )
        app.directive('img-lazy', {

            mounted(el, binding) {
                // el:指令所绑定的元素,可以用来直接操作 DOM
                // binding:一个对象,包含以下属性
                // name:指令名,不包括 v- 前缀
                // value:指令的绑定值,例如: v-my-directive="1 + 1",value 的值是 2
                // oldValue:指令绑定的前一个值,仅在 update 和 componentUpdated 钩子中可用,无论值是否改变都可用
                // expression:字符串形式的指令表达式,例如: v-my-directive="1 + 1",expression 的值是 "1 + 1"
                // arg:传给指令的参数,例如: v-my-directive:foo,arg 的值是 "foo"
                // useIntersectionObserver(
                //     el,
                //     ([{ isIntersecting }], observerElement) => {
                //         if (isIntersecting) {
                //             el.src = binding.value
                //             stop()
                //         }
                //     }
                // )
                el.dataset.url = binding.value
                observer.observe(el) // 将当前元素加入监听
            }
        })
    }
}