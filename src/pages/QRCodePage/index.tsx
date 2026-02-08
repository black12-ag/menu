import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

const QRCodePage: React.FC = () => {
  const menuUrl = 'https://restaurant-menu-3d-builder.netlify.app';
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📱 QR Code Menu</h1>
          <p className="text-gray-600">Scan to view our digital menu</p>
        </div>

        {/* Digital Preview - Hidden when printing */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 print:hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* QR Code Display */}
            <div className="bg-white p-6 rounded-xl border-4 border-orange-200">
              <QRCodeSVG
                value={menuUrl}
                size={200}
                level="H"
                includeMargin={true}
                imageSettings={{
                  src: '/images/breakfast-1.jpg',
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Digital Menu Access</h2>
              <p className="text-gray-600 mb-4">
                Customers can scan this QR code with their smartphone camera to instantly 
                access the full digital menu.
              </p>
              <div className="bg-orange-100 rounded-lg p-4 mb-4">
                <p className="text-sm text-orange-800 font-medium">Menu URL:</p>
                <p className="text-orange-600 break-all">{menuUrl}</p>
              </div>
              <button
                onClick={handlePrint}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 mx-auto md:mx-0"
              >
                🖨️ Print QR Code Cards
              </button>
            </div>
          </div>
        </div>

        {/* Print Layout - Only visible when printing */}
        <div ref={printRef} className="hidden print:block">
          {/* Page 1: Table Tent Cards (4 per page) */}
          <div className="print-page">
            <h2 className="text-2xl font-bold text-center mb-6">Table Tent Cards (4 per page)</h2>
            <div className="grid grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border-2 border-gray-300 rounded-xl p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <QRCodeSVG
                      value={menuUrl}
                      size={150}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">🍽️ Scan for Menu</h3>
                  <p className="text-sm text-gray-600 mb-2">Point your camera at the QR code</p>
                  <p className="text-xs text-orange-600 font-medium">restaurant-menu-3d-builder.netlify.app</p>
                </div>
              ))}
            </div>
          </div>

          {/* Page break */}
          <div className="page-break"></div>

          {/* Page 2: Table Stickers (6 per page) */}
          <div className="print-page">
            <h2 className="text-2xl font-bold text-center mb-6">Table Stickers (6 per page)</h2>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white border-2 border-gray-300 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-3">
                    <QRCodeSVG
                      value={menuUrl}
                      size={100}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">📱 Scan for Menu</h3>
                  <p className="text-xs text-gray-600">Use your phone camera</p>
                </div>
              ))}
            </div>
          </div>

          {/* Page break */}
          <div className="page-break"></div>

          {/* Page 3: Large Poster */}
          <div className="print-page">
            <h2 className="text-2xl font-bold text-center mb-6">Large Poster (1 per page)</h2>
            <div className="bg-white border-4 border-orange-500 rounded-2xl p-12 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">🍽️ Our Digital Menu</h1>
              <p className="text-xl text-gray-600 mb-8">Scan with your phone to view</p>
              <div className="flex justify-center mb-8">
                <QRCodeSVG
                  value={menuUrl}
                  size={300}
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-lg text-orange-600 font-medium">restaurant-menu-3d-builder.netlify.app</p>
              <p className="text-sm text-gray-500 mt-4">No app needed • Works on all smartphones</p>
            </div>
          </div>
        </div>

        {/* Instructions - Hidden when printing */}
        <div className="bg-white rounded-2xl shadow-lg p-8 print:hidden">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 Placement Instructions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-800 mb-3">🪑 Table Tents</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Place one on each dining table</li>
                <li>• Position near the center or condiments</li>
                <li>• Ensure good lighting for easy scanning</li>
                <li>• Use acrylic stands for durability</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-800 mb-3">🏷️ Table Stickers</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Stick in the corner of each table</li>
                <li>• Use waterproof vinyl stickers</li>
                <li>• Clean surface before applying</li>
                <li>• Replace if worn or damaged</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-800 mb-3">🚪 Entrance Poster</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Display near entrance/reception</li>
                <li>• Mount at eye level (5-6 feet high)</li>
                <li>• Use laminated poster for protection</li>
                <li>• Include "Scan for Menu" text</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-orange-800 mb-3">💡 Best Practices</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Test QR code before printing</li>
                <li>• Ensure minimum 2cm x 2cm size</li>
                <li>• Use high contrast (black on white)</li>
                <li>• Place at comfortable scanning height</li>
                <li>• Update QR code if URL changes</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-bold text-blue-800 mb-3">ℹ️ How Customers Use It</h3>
            <ol className="space-y-2 text-blue-900">
              <li>1. Open smartphone camera app</li>
              <li>2. Point camera at QR code (no need to take photo)</li>
              <li>3. Tap the notification that appears</li>
              <li>4. Menu opens in their browser instantly</li>
            </ol>
          </div>
        </div>

        {/* Back to Menu Button */}
        <div className="text-center mt-8 print:hidden">
          <Link
            to="/"
            className="inline-block bg-gray-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-700 transition-colors"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 1cm;
          }
          
          .print-page {
            page-break-after: always;
            min-height: 100vh;
            padding: 1cm;
          }
          
          .page-break {
            page-break-after: always;
          }
          
          .print-page:last-child {
            page-break-after: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default QRCodePage;
