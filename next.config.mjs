/** @type {import('next').NextConfig} */
const nextConfig = {
  // WHY: Memaksa Next.js memuntahkan file statis HTML/CSS/JS (folder 'out').
  // Ini adalah syarat mutlak agar aplikasi bisa di-hosting di GitHub Pages yang tidak memiliki server Node.js.
  output: 'export',
  
  images: {
    // WHY: GitHub pages tidak memiliki engine image optimization bawaan Next.js.
    unoptimized: true,
  },

  // PERHATIAN KRITIS: Jika URL GitHub Pages kamu berbentuk "username.github.io/namarepo",
  // kamu WAJIB menghapus tanda komentar di bawah ini dan mengganti namanya sesuai nama repositori.
  // Jika URL kamu murni "username.github.io", biarkan tetap dinonaktifkan.
  // basePath: '/namarepo',
};

export default nextConfig;
