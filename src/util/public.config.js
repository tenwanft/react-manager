 export function objToUrl(object){
    if(object){
        let string = ''
        for(var key in object){
            string +=`${key}=${object[key]}&`
        }
        string=string.slice(0,string.length-1)
        return string
    }
 }
