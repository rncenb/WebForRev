const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ defaultViewport: null });
    const page = await browser.newPage();
    const filePath = 'file:///' + 'c:/Users/jesec/Desktop/Laurence/Web/exam-reviewer/New folder/src/index.html'.replace(/ /g, '%20');
    
    // 1. Desktop Start Screen
    await page.setViewport({ width: 1024, height: 768 });
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(__dirname, 'assets', 'app-1.png') });
    console.log('Saved app-1.png (Desktop)');

    // 2. Mobile App Interface
    await page.setViewport({ width: 390, height: 844 });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'assets', 'app-2.png') });
    console.log('Saved app-2.png (Mobile)');

    // Reset to Desktop
    await page.setViewport({ width: 1024, height: 768 });
    await new Promise(r => setTimeout(r, 1000));

    // 3. Flashcard Mode
    await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('.mode-btn'));
        const flashcardBtn = btns.find(b => b.textContent.includes('Flashcard Challenge'));
        if (flashcardBtn) flashcardBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'assets', 'app-3.png') });
    console.log('Saved app-3.png (Flashcard Mode)');

    // Reset
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1000));

    // 4. Settings Panel
    await page.evaluate(() => {
        document.getElementById('settings-overlay').style.display = 'block';
    });
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: path.join(__dirname, 'assets', 'app-4.png') });
    console.log('Saved app-4.png (Settings)');

    await browser.close();
})();
