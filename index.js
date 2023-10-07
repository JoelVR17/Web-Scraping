import puppeteer from "puppeteer";
import fetch from "node-fetch";
import fs from "fs/promises";
import http from "http";

// URL
const url = "https://quotes.toscrape.com";

const openWebPage = async () => {
  // Open the browser
  const browser = await puppeteer.launch({
    headless: false, // Use boolean value
    slowMo: 400, // Speed
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // browser
  });

  // Open a new page
  const page = await browser.newPage();

  // Go to URL
  await page.goto(url, { waitUntil: "networkidle2" });
  await browser.close();
};

const captureScreenshot = async () => {
  // Open the browser
  const browser = await puppeteer.launch({
    headless: false, // Use boolean value
    slowMo: 400, // Speed
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // browser
  });

  // Open a new page
  const page = await browser.newPage();

  // Go to URL
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.screenshot({ path: "example.png" });
  await browser.close();
};

const navigate = async () => {
  // Open the browser
  const browser = await puppeteer.launch({
    headless: false, // Use boolean value
    slowMo: 400, // Speed of each operation
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // browser
  });

  // Open a new page
  const page = await browser.newPage();

  // Go to URL
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.click('a[href="/login"]');
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
};

const getDataFromWebPage = async () => {
  // Open the browser
  const browser = await puppeteer.launch({
    headless: false, // Use boolean value
    slowMo: 400, // Speed of each operation
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // browser
  });

  // Open a new page
  const page = await browser.newPage();

  // Go to URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Write code in the console, for execute actions into the DOM
  const result = await page.evaluate(() => {
    let title = document.querySelector("h1 a").textContent;
    let loginButton = document.querySelector("a[href='/login']").textContent;

    return {
      title,
      loginButton,
    };
  });

  console.log(result);

  await browser.close();
};

const writeQuotes = async () => {
  // Open the browser
  const browser = await puppeteer.launch({
    headless: false, // Use boolean value
    slowMo: 200, // Speed of each operation
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", // browser
  });

  // Open a new page
  const page = await browser.newPage();

  // Go to URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Write code in the console, for execute actions into the DOM
  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector(".text").textContent;
      const author = quote.querySelector(".author").textContent;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.textContent
      );

      return {
        quoteText,
        author,
        tags,
      };
    });

    return data;
  });

  // Conver of JSON to string
  const jsonQuotes = JSON.stringify(result, null, 2);

  // Write a file with the quotes
  fs.writeFile("data/quotes.json", jsonQuotes, "utf-8");

  await browser.close();
};

const readQuotes = async () => {
  try {
    // Read the quotes
    const jsonQuotes = await fs.readFile("data/quotes.json", "utf-8");
    const quotes = JSON.parse(jsonQuotes);

    console.log(quotes);
  } catch (error) {
    console.log(error);
  }
};

// Call the functions
// readQuotes();
// captureScreenshot();
// openWebPage();
// navigate();
// getDataFromWebPage();
// writeQuotes();
