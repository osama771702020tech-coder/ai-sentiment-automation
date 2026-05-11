const request = require('supertest');
const app = require('./app'); // استدعاء منطق الـ API

describe('Automation Sentiment Tests', () => {
    
    // اختبار 1: التأكد من أن الجمل الإيجابية تُصنف بشكل صحيح
    test('Should detect positive sentiment', async () => {
        const res = await request(app).get('/analyze-local?text=I love engineering');
        expect(res.statusCode).toEqual(200);
        expect(res.body.sentiment).toContain('Positive');
    });

    // اختبار 2: التأكد من أن الجمل السلبية تُصنف بشكل صحيح
    test('Should detect negative sentiment', async () => {
        const res = await request(app).get('/analyze-local?text=This is a bad error');
        expect(res.statusCode).toEqual(200);
        expect(res.body.sentiment).toContain('Negative');
    });

});