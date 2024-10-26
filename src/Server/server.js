import express from 'express';
import cors from 'cors';
import { AxePuppeteer } from '@axe-core/puppeteer';
import puppeteer from 'puppeteer';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scan', async (req, res) => {
    try {
        const { url } = req.body;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const results = await new AxePuppeteer(page).analyze();
        await browser.close();

        res.json(results);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to scan the website' });
    }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));