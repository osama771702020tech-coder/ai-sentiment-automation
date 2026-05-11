// server.js
const app = require('./app'); // تأكد أن لديك ملف اسمه app.js في نفس المجلد
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});