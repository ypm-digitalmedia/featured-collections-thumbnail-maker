const express = require('express');
const path = require('path');
const open = require('open');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to set proper MIME types for fonts
app.use((req, res, next) => {
    if (req.url.endsWith('.otf')) {
        res.type('font/otf');
    } else if (req.url.endsWith('.ttf')) {
        res.type('font/ttf');
    }
    next();
});

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve index.html for any client-side route
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    const url = `http://localhost:${PORT}`;
    console.log(`Server running on ${url}`);
    open(url);
});
