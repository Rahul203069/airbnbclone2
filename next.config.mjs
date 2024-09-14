/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    devIndicators: {
      autoPrerender: false,
    },
    onDemandEntries: {
      // Period before a Page gets disposed
      maxInactiveAge: 25 * 1000, // 25 seconds
      // Number of Pages that should be kept simultaneously without being disposed
      PagesBufferLength: 3,
    },
};

export default nextConfig;


