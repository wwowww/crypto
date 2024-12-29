module.exports = {
  siteUrl: process.env.SITE_URL || 'https://yourwebsite.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        disallow: '/admin/',
      },
    ],
  },
};