const fs = require('fs');
const path = require('path');

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dcqd4u6ux/image/upload';
const UPLOAD_PRESET = 'organic-tea';

async function testUpload() {
    try {
        // Create a dummy text file to act as the "image" buffer for testing purposes
        const blob = new Blob(['helloworld'], { type: 'text/plain' });

        const formData = new FormData();
        formData.append('file', blob, 'test.txt');
        formData.append('upload_preset', UPLOAD_PRESET);
        // formData.append('folder', 'organic-tea/avatars');

        console.log('Sending to:', CLOUDINARY_URL, 'with preset:', UPLOAD_PRESET);
        const start = Date.now();
        const res = await fetch(CLOUDINARY_URL, {
            method: 'POST',
            body: formData
        });

        console.log(`Response received in ${Date.now() - start}ms`);
        console.log('Status:', res.status, res.statusText);

        const data = await res.json();
        console.log('Data:', JSON.stringify(data, null, 2));

    } catch (e) {
        console.error('Error:', e);
    }
}

testUpload();
