import { message } from 'ant-design-vue'

export default function({ $axios, store }) {
    $axios.onRequest(config => {
        if (store.state.user.token) {
            config.headers.Authorization = "Bearer " + store.state.user.token;
        }
        return config;
    })

    $axios.onResponse(response => {
            const res = response.data
            if (res.statusCode == -2 || res.statusCode == -1) {
                message.warning({
                    content: res.message,
                    duration: 3
                })
            }
            return res
        }

    )

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        const res = error.response.data
        if (res.message) {
            message.error({
                content: res.message instanceof Object ? res.message.message : res.message,
                duration: 3
            })
        } else {
            console.log('请求发生未知错误')
        }
        if (code == 401) {
            redirect("/?redirect=" + route.path + '&' + 'islogin=false');
        }
        return Promise.reject(error)
    })
}