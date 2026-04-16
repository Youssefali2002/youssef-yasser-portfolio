/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], 
  theme: {
    // 👈 بنضيف قسم الـ container هنا بره الـ extend عشان نعدل سلوكه الأساسي
    container: {
      center: true,      // بيخلي الـ mx-auto تتحط تلقائياً (السنترة)
      padding: '2rem',   // بيعمل مسافة أمان (Padding) من الجناب دايماً 
    },
    extend: {
      // هنا بنسيب الـ ألوان والخطوط اللي ضفناها قبل كدة
    },
  },
  plugins: [],
}

