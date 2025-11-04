// Skip Husky install in production and CI
if (process.env.NODE_ENV === 'production' || process.env.CI === 'true' || process.env.HUSKY === '0') {
  process.exit(0)
}

try {
  const husky = (await import('husky')).default
  console.log(husky())
} catch (error) {
  console.error('Husky installation failed', error)
} 