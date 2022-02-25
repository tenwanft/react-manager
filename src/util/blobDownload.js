import axios from "axios"
import {message} from "antd";

const mimeMap = {
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip"
}
const token = window.localStorage.getItem("access_token")
// const baseUrl = process.env.BASE_API
const baseUrl = ""
export function downLoadZip(str, filename) {
    var url = baseUrl + str
    axios({
        method: "get",
        url: url,
        responseType: "blob",
        headers: { "Authorization": "Bearer " + token }
    }).then(res => {
        resolveBlob(res, mimeMap.zip)
    })
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} fileName 文件名
 */
export function downloadExcel(res, fileName) {
    const aLink = document.createElement("a")
    var blob = new Blob([res], { type: mimeMap.xlsx })// 构造一个blob对象来处理数据
    if (blob.size === 0) {
        // this.downloadLoading = false
        message.error("下载数据失败")
        return
    }
    fileName = fileName.replace(/\"/g, "")
    aLink.href = URL.createObjectURL(blob)
    aLink.setAttribute("download", fileName) // 设置下载文件名称
    document.body.appendChild(aLink)
    aLink.click()
    document.body.appendChild(aLink)
}

/**
 * 解析blob响应内容并下载
 * @param {*} res blob响应内容
 * @param {String} mimeType MIME类型
 */
export function resolveBlob(res, mimeType) {
    const aLink = document.createElement("a")
    var blob = new Blob([res.data], { type: mimeType })
    // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
    var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
    var contentDisposition = decodeURI(res.headers["Content-disposition"])
    var result = patt.exec(contentDisposition)
    var fileName = result[1]
    fileName = fileName.replace(/\"/g, "")
    aLink.href = URL.createObjectURL(blob)
    aLink.setAttribute("download", fileName) // 设置下载文件名称
    document.body.appendChild(aLink)
    aLink.click()
    document.body.appendChild(aLink)
}
