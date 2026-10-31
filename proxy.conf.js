/**
 * Angular dev-server proxy for local CRANIX development (branch: dev-test).
 *
 * Why: the app talks to the CRANIX API at `<origin>/api` (see
 * src/app/services/utils.service.ts). In production the GUI is served by the
 * CRANIX server itself, so the API is same-origin. On a development machine it
 * is not — this proxy forwards `/api` to a CRANIX server instead of letting the
 * browser hit a foreign origin (which would also break cookies/CORS).
 *
 * Default target: an SSH tunnel to the CRANIX vhost, e.g.
 *   ssh -N -L 127.0.0.1:18443:172.16.0.2:443 root@<vpn-peer>
 * The tunnel target on the CRANIX side (172.16.0.2:443) is the Apache vhost
 * which proxies /api to the CRANIX API on 127.0.0.1:9080.
 *
 * Override without editing this file:
 *   CRX_API_TARGET=https://10.8.0.4:443 CRX_API_HOST=admin.crx.mob.eu npm start
 */
const target = process.env.CRX_API_TARGET || 'https://127.0.0.1:18443';
const hostHeader = process.env.CRX_API_HOST || 'admin.crx.mob.eu';

module.exports = {
  '/api': {
    target,
    // CRANIX uses a self-signed / private CA certificate.
    secure: false,
    // Keep the original Host based on `headers` below (changeOrigin would
    // rewrite it to the tunnel address and Apache would pick the wrong vhost).
    changeOrigin: false,
    headers: {
      Host: hostHeader
    },
    logLevel: process.env.CRX_API_LOGLEVEL || 'info'
  }
};
