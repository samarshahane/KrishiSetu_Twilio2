const fs = require('fs');

let css = fs.readFileSync('App.css', 'utf8');

// Sidebar
css = css.replace('background: linear-gradient(180deg, #001f3f 0%, #003366 100%);', 'background: #ffffff;\n  border-right: 2px solid #000000;\n  box-shadow: 4px 0px 0px #ff6600;');
css = css.replace('color: white;', 'color: #000000;');

// Hero
css = css.replace('background: linear-gradient(135deg, #003366 0%, #0055a5 50%, #0077cc 100%);', 'background: #ffffff;\n  border: 2px solid #000000;\n  box-shadow: 6px 6px 0px #38a169;');

// Global shadows
css = css.replace(/box-shadow: 0 2px 12px rgba\(0,0,0,0\.08\);/g, 'box-shadow: 6px 6px 0px #ff6600;');
css = css.replace(/box-shadow: 0 1px 3px rgba\(0,0,0,0\.08\);/g, 'box-shadow: 6px 6px 0px #38a169;');

// Global radii
css = css.replace(/border-radius: 12px;/g, 'border-radius: 20px;');
css = css.replace(/border-radius: 6px;/g, 'border-radius: 20px;');
css = css.replace(/border-radius: 8px;/g, 'border-radius: 20px;');

// Buttons
css = css.replace('background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);', 'background: #ffffff;\n  border: 2px solid #000000;\n  box-shadow: 4px 4px 0px #ff6600;\n  color: #000000;');
css = css.replace('background: linear-gradient(135deg, #003366, #0055a5);', 'background: #000000;\n  border: 2px solid #000000;\n  box-shadow: 4px 4px 0px #38a169;\n  color: #ffffff;');

// Headers
css = css.replace('color: #003366;', 'color: #000000;');

// Save
fs.writeFileSync('App.css', css);
console.log('Done');
