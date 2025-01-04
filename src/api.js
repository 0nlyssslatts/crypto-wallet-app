import {cryptoAssets, cryptoData} from "./data.js"

export function fetchCrypto(){
    return new Promise((resolve) =>{
        setTimeout(() =>{
            resolve(cryptoData)
        }, 300)
    })
}

export function fetchAssets(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cryptoAssets)
        }, 300)
    })
}