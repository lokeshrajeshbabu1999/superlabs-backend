const fs = require('fs');
const path = require('path');

async function testUpload() {
  const testFilePath = path.join(__dirname, 'test-image.jpg');
  // Create a dummy image file
  fs.writeFileSync(testFilePath, 'test data');

  const formData = new FormData();
  const blob = new Blob(['test data'], { type: 'image/jpeg' });
  formData.append('image', blob, 'test-image.jpg');

  try {
    const response = await fetch('http://localhost:5000/api/admin/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Upload Response:', data);

    if (data.imageUrl && data.imageUrl.startsWith('/uploads/')) {
      console.log('SUCCESS: Image uploaded to', data.imageUrl);
      
      // Check if file exists on disk
      const diskPath = path.join(__dirname, '..', data.imageUrl);
      if (fs.existsSync(diskPath)) {
        console.log('SUCCESS: File exists on disk at', diskPath);
      } else {
        console.log('FAILURE: File does not exist on disk at', diskPath);
      }
    } else {
      console.log('FAILURE: Unexpected response', data);
    }
  } catch (error) {
    console.error('ERROR during upload test:', error);
  } finally {
    // Cleanup
    if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
  }
}

testUpload();
