self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
});

const ENV_NAME = 'x-fe-env';

const sharingHosts = [
    'fe-sharing.b.net',
    'fe-sharing.b.com',
    'fe-sharing-internal.b.com',
]

// entry pattern: http://${host}/entry/${env}/${resourceId}/entry.js
// resource pattern http://${host}/resource/${env}/${resourceId}/${resourceVersion}/...

// http://fe-sharing.b.com/entry/prod/dsadsad/entry.js
// http://fe-sharing.b.com/resource/prod/dsadsad/0.0.1/wocao/anpai.js

const sharingEntryReg = /https?:\/\/([\w\d\-\.]+)\/entry\/(\w+)\/(\w+)\/entry\.js/
const sharingResourceReg = /https?:\/\/([\w\d\-\.]+)\/resource\/(\w+)\/(\w+)\/([\w\d\.\-_]+)\/(.*)/



self.addEventListener( "fetch", event => {
    let is = event.request.url === 'https://ad.me/api/shit'
    console.log('WORKER: Fetching', event.request, is);
    const url = new URL(event.request.url)
    let isShareHost = false
    for (let i = 0; i < sharingHosts.length - 1; i ++) {
        let targetHost = sharingHosts[i]
        if (targetHost === url.host) {
            isShareHost = true;
            break;
        }
    }



    if (is) {
        console.log('run!')
        var init = { "status" : 200 , "statusText" : "I am a custom service worker response!" };
        event.respondWith(fetch('/test.json'))
    }
});


