import  E  from  "wangEditor"
export default ({ app }) => {

    app.router.afterEach(() => {
        //console.time();
        Window.prototype.wangEditor = E
            //console.timeEnd()
    })
}