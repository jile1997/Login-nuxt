let authList = ['/md']

export default function({ route, redirect, store }) {
    if (authList.indexOf(route.path) != -1) {
        if (!store.state.user.token) {
            redirect("/?redirect=" + route.path + '&' + 'islogin=false')
        }
    }
}