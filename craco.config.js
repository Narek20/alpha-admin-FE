const path = require(`path`)

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Features': path.resolve(__dirname, 'src/components/features'),
      '@Shared': path.resolve(__dirname, 'src/components/shared'),
    },
  },
}
