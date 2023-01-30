
/**
 * 
 * @param origin 字符串，为空是直接返回空值
 * @returns 返回转化后的Unicode编码，Unicode编码间由/u隔开
 */
export function encryption(origin: string){
    if(!origin){ return '' }
	let result: string = '';
    let len: number = origin.length;
	for(let i = 0; i < len; i++){
		result  += '\\u' + origin.charCodeAt(i)
	}
	return result
}

/**
 * 
 * @param origin 整串由/u隔开的Unicode编码，为空直接返回空值
 * @returns 返回转换后的中文字符
 */
export function decrypt(origin: string){
    if(!origin){ return '' }
	let result: string = '';
    let originArr: Array<string> = [];
    originArr = origin.split('\\u');
    originArr.shift()
    let len: number = originArr.length;
    for(let i = 0; i < len; i++){
		result += String.fromCharCode(Number(originArr[i]))
    }
    return result
}

/**
 * 
 * @param origin 需要加密的对象或数组
 * @returns 将值全部加密后返回
 */

export function encryptionObj(origin: any){

    let result: any;
    if(Array.isArray(origin)){
        // 为数组加密
        result = [];
        let len = origin.length;
        for(let i = 0; i < len; i++){
            if(typeof origin[i] == 'object'){
                result[i] = encryptionObj(origin[i]);
            } else {
                result[i] = encryption(origin[i]);
            }
        }
    } else {
        // 为对象加密
        result = {};
        let keys = Object.keys(origin);
        let len = keys.length;
        for(let i = 0; i < len; i++){
            if(typeof origin[keys[i]] == 'object'){
                result[keys[i]] = encryptionObj(origin[keys[i]]);
            } else {
                result[keys[i]] = encryption(origin[keys[i]]);
            }
        }
    }
    return result
}

/**
 * 
 * @param origin 需要解密的对象或数组
 * @returns 值全部解密后返回
 */
export function decryptObj(origin: any){
    let result: any;
    if(Array.isArray(origin)){
        result = [];
        let len = origin.length;
        for(let i = 0; i < len; i++){
            if(typeof origin[i] == 'object'){
                result[i] = decryptObj(origin[i]);
            } else {
                result[i] = decrypt(origin[i]);
            }
        }
    } else {
        result = {};
        let keys = Object.keys(origin);
        let len = keys.length;
        for(let i = 0; i < len; i++){
            if(typeof origin[keys[i]] == 'object'){
                result[keys[i]] = decryptObj(origin[keys[i]]);
            } else {
                result[keys[i]] = decrypt(origin[keys[i]]);
            }
        }
    }
    return result
}