const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const menuUrl = 'https://restaurant-menu-3d-builder.netlify.app/menu';
const outputPath = path.join(__dirname, '..', 'public', 'images', 'menu-qr-code.png');

const options = {
  width: 400,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
};

QRCode.toFile(outputPath, menuUrl, options, (err) => {
  if (err) {
    console.error('Error generating QR code:', err);
    process.exit(1);
  }
  console.log('✅ QR code generated successfully!');
  console.log(`📁 Saved to: ${outputPath}`);
  console.log(`🔗 URL: ${menuUrl}`);
});
