const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - মেগা সকেট প্রোটোকল লক]
const io = socketIo(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// ✈️ ওরিজিনাল অ্যারো ফাইটার স্পেসশিপ টার্গেট ও ডাইনামিক মাল্টিপ্লায়ার ম্যাট্রিক্স
const aeroTargetPool = {
    "SCOUT_DRONE": { minOdds: 2, maxOdds: 5 },
    "ALIEN_INTERCEPTOR": { minOdds: 6, maxOdds: 15 },
    "METEOR_SHIELD": { minOdds: 16, maxOdds: 35 },
    "WAR_ZEPPELIN": { minOdds: 40, maxOdds: 90 },
    "CYBER_STEALTH": { minOdds: 100, maxOdds: 250 },
    "GALAXY_BOSS_AERO": { minOdds: 500, maxOdds: 500 } // ৫০০ গুণ ফিক্সড সুপ্রিম গ্যালাক্সি জ্যাকপট!
};

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স নিয়ে আসার ডেডিকেটেড গেটওয়ে
app.get('/api/aero-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: 0,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok" && response.data.balance !== undefined) {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. রিয়েল-টাইম মিসাইল ফায়ার কস্ট রাউট (ব্যালেন্স ডিডাকশন প্রোটেকশন বর্ম ভাই ভাই)
app.post('/api/aero-shoot', async (req, res) => {
    const { userId, bulletCost, wallet } = req.body;
    const targetWallet = wallet || "main";
    const cost = parseFloat(bulletCost) || 1;

    // 🔒 [মিসাইল কস্ট ফিল্টার]: প্রতিটি রকেট মিসাইলের কস্ট ১ টাকা থেকে ৫০০০ টাকা পর্যন্ত কঠোর লক!
    if (cost < 1 || cost > 5000) {
        return res.json({ success: false, message: "🚨 Invalid Missile Cost (৳১ - ৳৫০০০)" });
    }

    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet",
            username: userId,
            amount: cost,
            wallet: targetWallet
        }, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, message: "❌ Missile Declined by Database!" });
    } catch (e) { return res.json({ success: false, message: "⚠️ Timeout!" }); }
});

// 🎯 ৩. মিসাইল যখন এনিমি স্পেসশিপে হিট করবে - ওরিজিনাল ৯৫% ক্যাসিনো RTP ভ্যালিডেশন
app.post('/api/aero-hit', async (req, res) => {
    const { userId, targetType, bulletCost, wallet } = req.body;
    const targetWallet = wallet || "main";
    const originalMissileValue = parseFloat(bulletCost) || 1;

    if (!aeroTargetPool[targetType]) {
        return res.json({ success: false, message: "🚨 Target Out of Scope!" });
    }

    const currentTarget = aeroTargetPool[targetType];
    let isDestroyed = false;
    let finalWinMultiplier = 0;

    // 🎰 [🎰 ৯৫% ওরিজিনাল ক্যাসিনো RTP শুটিং ভ্যালিডেশন ম্যাথ লুপ ভাই ভাই]
    let hitRandomizer = Math.random();
    
    if (targetType === "SCOUT_DRONE" && hitRandomizer <= 0.43) isDestroyed = true;
    else if (targetType === "ALIEN_INTERCEPTOR" && hitRandomizer <= 0.23) isDestroyed = true;
    else if (targetType === "METEOR_SHIELD" && hitRandomizer <= 0.12) isDestroyed = true;
    else if (targetType === "WAR_ZEPPELIN" && hitRandomizer <= 0.05) isDestroyed = true;
    else if (targetType === "CYBER_STEALTH" && hitRandomizer <= 0.02) isDestroyed = true;
    else if (targetType === "GALAXY_BOSS_AERO" && hitRandomizer <= 0.005) isDestroyed = true; // 500 গুণ মেগা বস চান্স ০.৫% এ লোহার খাঁচায় লক!

    if (isDestroyed) {
        // ডাইনামিক ওッズ রেঞ্জ থেকে র্যান্ডম প্রফিট জেনারেটর চাবি
        finalWinMultiplier = Math.floor(Math.random() * (currentTarget.maxOdds - currentTarget.minOdds + 1)) + currentTarget.minOdds;
    }

    if (!isDestroyed || finalWinMultiplier <= 0) {
        return res.json({ success: true, captured: false, winAmount: 0 });
    }

    let calculatedWinAmount = parseFloat((originalMissileValue * finalWinMultiplier).toFixed(2));

    try {
        let phpPayload = {
            action: "win",
            username: userId,
            amount: calculatedWinAmount,
            wallet: targetWallet,
            bet_amount: originalMissileValue,
            multiplier: finalWinMultiplier.toFixed(2),
            status: "win",
            type: "win",
            is_win: 1,
            win_status: "win",
            log_status: "win"
        };

        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 30000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: userId, balance: response.data.balance });
            return res.json({
                success: true,
                captured: true,
                balance: response.data.balance,
                winAmount: calculatedWinAmount,
                odds: finalWinMultiplier
            });
        }
        return res.json({ success: false, message: "❌ Mission Sync Error!" });
    } catch (e) {
        return res.json({ success: false, message: "⚠️ Connection Timeout!" });
    }
});

// 🚀 [নট ফাউন্ড এরর ফিক্সড বর্ম]: কারেন্ট ডিরেক্টরির index.html ওয়ান-শটে ফাইল ক্যাচ করার চূড়ান্ত চাবি ভাই ভাই
app.get('/', (req, res) => { 
    res.sendFile(path.resolve(__dirname, 'index.html')); 
});

io.on('connection', (socket) => { console.log("Player connected to Royal AERO Jet Fighter Engine!"); });

// অ্যারো ফাইটার গেম নিজস্ব কাস্টম ৭৩০০ পোর্টে কড়া নিয়নে অন ফায়ার ভাই ভাই!
const PORT = process.env.PORT || 7300; 
server.listen(PORT, () => { console.log(`🎡 Royal AERO Jet Engine Running on port ${PORT}`); });
