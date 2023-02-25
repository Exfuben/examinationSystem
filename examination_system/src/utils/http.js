import axios from "axios"

// axios.defaults.baseURL = 'localhost/'
axios.defaults.timeout = 20 * 1000

const http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .get(url, {params})
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },

    post(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, JSON.stringify(params))
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },

    put(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .put(url, JSON.stringify(params))
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    },

    delete(url, params) {
        return new Promise((resolve, reject) => {
            axios
                .delete(url, {params})
                .then((res) => {
                    resolve(res.data)
                })
                .catch((err) => {
                    reject(err.data)
                })
        })
    }
}

export default http;