import crypto from 'crypto'
import logger from '../../../lib/logger'

export default (provider, callback) => {
  const { callbackUrl, secret, url } = provider

  crypto.randomBytes(16, function(err, buf) {
    if (err) {
      logger.error('GET_AUTHORISATION_URL_ERROR', err)
    }

    // Create payload for Discourse
    const nonce = buf.toString('hex')
    
    const payload = "nonce="+nonce+"&return_sso_url="+callbackUrl
    const payload_b64 = Buffer.from(payload).toString('base64')
    
    let hmac = crypto.createHmac('sha256', secret)
    hmac.update(payload_b64)
    
    const hex_sig = hmac.digest('hex')
    const urlenc_payload_b64 = encodeURIComponent(payload_b64)
    const url_redirect = url+"/session/sso_provider?sso="+urlenc_payload_b64+"&sig="+hex_sig
    
    // Return nonce hash
    hmac = crypto.createHmac('sha256', secret)
    hmac.update(nonce)
    const nonceHash = hmac.digest('hex')

    // Return
    callback(err, nonceHash, url_redirect)
  })
}
