import sha256 from "crypto-js/sha256.js"
import Base64 from "crypto-js/enc-base64.js"

export const sha256toBase64 = (pass:string) => {
    const hash = sha256(pass)
    const based = Base64.stringify(hash)
    return based
}