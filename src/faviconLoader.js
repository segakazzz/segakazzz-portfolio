module.exports = function () {
  const favicons = {
    default: {
      type: 'image/x-icon',
      rel: 'icon',
      href: require('./favicon/favicon.ico')
    },
    android192: {
      type: 'image/png',
      rel: 'icon',
      href: require('./favicon/android-chrome-192x192.png'),
      sizes: '192x192'
    },
    android512: {
      type: 'image/png',
      rel: 'icon',
      href: require('./favicon/android-chrome-512x512.png'),
      sizes: '512x512'
    },
    appletouch: {
      type: null,
      rel: 'apple-touch-icon',
      href: require('./favicon/apple-touch-icon.png'),
      sizes: '180x180'
    },
    favicon16: {
      type: 'image/png',
      rel: 'icon',
      href: require('./favicon/favicon-16x16.png'),
      sizes: '16x16'
    },
    favicon32: {
      type: 'image/png',
      rel: 'icon',
      href: require('./favicon/favicon-32x32.png'),
      sizes: '32x32'
    }
  }

  const header = document.getElementsByTagName('head')[0]
  Object.keys(favicons).forEach(function (key) {
    // console.log(key)
    const link = document.createElement('link')
    if (favicons[key].type) link.type = favicons[key].type
    if (favicons[key].rel) link.rel = favicons[key].rel
    if (favicons[key].href) link.href = favicons[key].href
    if (favicons[key].sizes) link.sizes = favicons[key].sizes
    header.appendChild(link)
  })
}
