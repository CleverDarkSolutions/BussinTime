module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/discussion/:path*/discussion',
        destination: '/discussion/:path*/discussion',
      },
      {
        source: '/profile/:path*/profile',
        destination: '/profile/:path*/profile',
      },
      {
        source: '/history',
        destination: '/history',
      },
      {
        source: '/settings',
        destination: '/settings',
      },
      {
        source: '/feedback',
        destination: '/feedback',
      },
      {
        source: '/:path*',
        destination: '/home', // Redirect to a custom 404 page
      },
      {
        source: '/',
        destination: '/home'
      }
    ];
  },
  swcMinify: true
}
