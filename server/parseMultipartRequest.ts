import formidable from 'formidable'

export function parseMultipartRequest(req) {
    return new Promise((resolve, reject) => {
      const form = formidable({ multiples: true })
      form.parse(req, (error, fields, files) => {
        if (error) {
            reject(error)
            return
        }
        resolve({ ...fields, ...files })
        })
    })
}