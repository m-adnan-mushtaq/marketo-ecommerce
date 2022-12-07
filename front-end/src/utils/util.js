const bg=['primary','success','danger','warning']
export function pickRandowBg() {
    return bg[Math.floor(Math.random()*bg.length)]
}



export function extractExtrasFromProduct(product) {
    if(!product) return 
    if(product.image) delete product['image']
    if(product.imageType) delete product['imageType']
    return product
}


export function findTargetElmHelper(resultArr,id) {
    return resultArr.find(elm=>elm._id.toString() === id.toString())
}

