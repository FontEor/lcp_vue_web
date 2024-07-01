import axios from "axios";
import request from "@/utils/request";
interface BaseSdk {
    id: number,
    language: number,
    version: string,
    fileName: string,
    jssKey: string,
    name: string,
    description: string
}

export function getBaseSdkList(): Promise<BaseSdk[]> | null {
    return  request({
        url:"/bizapinterface/getUsingBaseSdkList",
        method: "get"
      }).then(response => response.data)
}


export function downloadBaseSdk(jssKey: string, fileName: string) {
    console.info(`jsskey: ${jssKey} will be download as ${fileName}`)
    if (fileName != null) {
        const gwUploadRequest = axios.create({
            // 本地配置了proxyTable之后不需要配置baseUrl，其他环境需要这个baseUrl
            baseURL: window.env.gatewayFileBaseApi, // url = base url + request url
            withCredentials: true, // send cookies when cross-domain requests
            timeout: 100000, // request timeout
            headers: {
                'LOP-DN': window.env.gatewayUploadLopDn,
                fileName: jssKey
            },
            responseType: 'blob'
        })
        gwUploadRequest({
            url: '/lop/file/download',
            method: 'get'
        }).then((drsp) => {
            console.info(`file fetch succeed! jsskey: ${jssKey} will be download as ${fileName}`)
            const blob = new Blob([drsp.data], { type: 'application/octet-stream' })
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
                window.navigator.msSaveBlob(blob, decodeURI(fileName))
            } else {
                // 创建新的URL并指向File对象或者Blob对象的地址
                const blobURL = window.URL.createObjectURL(blob)
                // 创建a标签，用于跳转至下载链接
                const tempLink = document.createElement('a')
                tempLink.style.display = 'none'
                tempLink.href = blobURL
                tempLink.setAttribute('download', decodeURI(fileName))
                // 兼容：某些浏览器不支持HTML5的download属性
                if (typeof tempLink.download === 'undefined') {
                    tempLink.setAttribute('target', '_blank')
                }
                // 挂载a标签
                document.body.appendChild(tempLink)
                tempLink.click()
                document.body.removeChild(tempLink)
                // 释放blob URL地址
                window.URL.revokeObjectURL(blobURL)
            }
        }).catch((de) => {
            console.log(de)
        })
    }
}
