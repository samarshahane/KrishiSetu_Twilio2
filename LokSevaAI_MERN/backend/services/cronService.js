const cron = require('node-cron');
const scrapeSchemes = require('./firecrawlService');
const { parseSchemesFromMarkdown } = require('./geminiService');
const Scheme = require('../models/Scheme');

async function syncSchemesJob() {
  console.log("🕒 [Cron] Starting automated scheme sync...");
  try {
    // 1. Scrape the website
    console.log("   -> Scraping myscheme.gov.in...");
    const scrapeResult = await scrapeSchemes();
    
    let markdownText = "";
    if (scrapeResult && scrapeResult.markdown) {
      markdownText = scrapeResult.markdown;
    } else if (typeof scrapeResult === 'string') {
      markdownText = scrapeResult;
    } else {
       console.log("   -> Scrape result format unexpected. Aborting sync.");
       return;
    }

    if (!markdownText) {
        console.log("   -> No text found during scrape. Aborting sync.");
        return;
    }

    // 2. Pass markdown to Gemini to extract JSON
    console.log("   -> Parsing markdown via Gemini...");
    const parsedSchemes = await parseSchemesFromMarkdown(markdownText);
    
    if (parsedSchemes && parsedSchemes.length > 0) {
      // 3. Clear old schemes and insert new
      console.log(`   -> Refreshed ${parsedSchemes.length} schemes! Updating database...`);
      await Scheme.deleteMany({}); // Clear old valid ones
      await Scheme.insertMany(parsedSchemes); // Insert fresh ones
      console.log("✅ [Cron] Automated scheme sync completed successfully!");
    } else {
        console.log("⚠️ [Cron] No parsed schemes returned.");
    }

  } catch (error) {
    console.error("❌ [Cron] Error during scheduled scheme sync:", error);
  }
}

// Run every night at midnight: '0 0 * * *'
function startCronJobs() {
  cron.schedule('0 0 * * *', () => {
    syncSchemesJob();
  });
  
  console.log("🕒 [Cron] Scheduled daily scheme sync at Midnight.");
}

module.exports = { startCronJobs, syncSchemesJob };
