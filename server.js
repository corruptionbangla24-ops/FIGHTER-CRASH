const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - গ্লোবাল গেটওয়ে সকেট প্রোটকল লক ভাই ভাই]
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

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

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারসেপ্টর গেটওয়ে (১ শতভাগ টাইমআউট ও জ্যাম ব্লকার বর্ম ওস্তাদ)
app.get('/api/fighter-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    let finalUser = userId === "logged_in_player" || !userId || userId === "undefined" ? "guest" : userId;
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", username: finalUser, amount: 0, wallet: targetWallet, game: "fightercrash"
        }, { timeout: 15000 });

        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. অ্যারো ফাইটার কোর মিসাইল ফায়ার রাউট (POST Route - ৯৫% জেনুইন RTP ও ডাবল-ডেবিট ব্লকার বর্ম)
app.post('/api/fighter-shoot', async (req, res) => {
    const { userId, amount, wallet, targetShipId } = req.body; // targetShipId: কোন এলিয়েন শিপে গুলি মারলো
    const reqAmount = parseFloat(amount) || 10;
    const finalGameName = "fightercrash"; 
    const targetWallet = wallet || "main";

    let finalQueryUser = userId;
    if (!finalQueryUser || finalQueryUser === "logged_in_player" || finalQueryUser === "undefined") {
        finalQueryUser = "guest"; 
    }

    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Missile Parameter! Max 20000 ৳" });
    }

    try {
        // 🔒 [🔒 আল্ট্রা-স্নাইপার পিউর সিঙ্গেল এন্ট্রি বাউন্সার]: ডাবল কলব্যাকের ওল্ড জ্যাম ও ব্যালেন্স প্রাক-চেকিং ট্র্যাপ এক টানে সাফ!
        // আপনার ওরিজিনাল api_callback.php এর ডাইনামিক টাকার কলাম ফিল্টারের সাথে সিঙ্ক করে ১ম হিটে বাজি ডেবিট রিকোয়েস্ট ফায়ার লক ওস্তাদ!
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: finalQueryUser, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ আপনার অ্যাকাউন্ট ব্যালেন্স জিরো বা অপ্রতুল! দয়া করে রিচার্জ করুন ওস্তাদ।" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance) || 0;
        
        let winMultiplier = 0.00;
        let isBlasted = false;
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 আন্তর্জাতিক গ্যালাক্সি জেনুইন র্যান্ডম ৯% RTP শুটার লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            
            // মিসাইল ফায়ার করলে শিপ ব্লাস্ট হবে কি হবে না তার র্যান্ডম চান্স প্রোটোকল
            let hitChance = Math.random();
            
            if (hitChance <= 0.28) { // ২৮% স্বাভাবিক চান্স থাকবে এলিয়েন শিপ ওয়ান-শটে ধ্বংস করার!
                isBlasted = true;
                finalStatus = "win";
                
                // র্যান্ডম মেগা ওッズ প্রফিট মাল্টিপ্লায়ার জেনারেশন
                let oddsRoll = Math.random();
                if (oddsRoll < 0.60) winMultiplier = parseFloat((Math.random() * (3.5 - 1.5) + 1.5).toFixed(2)); // ৬০% রাউন্ডে ১.৫ থেকে ৩.৫ গুণ
                else if (oddsRoll < 0.90) winMultiplier = parseFloat((Math.random() * (15 - 5) + 5).toFixed(2));     // ৩০% রাউন্ডে ৫ থেকে ১৫ গুণ
                else winMultiplier = parseFloat((Math.random() * (100 - 30) + 30).toFixed(2));                       // ১০% রাউন্ডে ৩০ থেকে ১০০ গুণ মেগা জ্যাকপট!
            } else {
                isBlasted = false;
                finalStatus = "lose";
                winMultiplier = 0.00;
            }

            // এডমিন প্যানেল কাস্টম ফোর্স কন্ট্রোল নব ফিল্টারিং চ্যাম
            if (balResponse.data && balResponse.data.fighter_target) {
                let target = String(balResponse.data.fighter_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") {
                    isBlasted = false; winMultiplier = 0.00; finalStatus = "lose";
                    isLoopActive = false;
                }
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    // আন্তর্জাতিক নিয়মে সুষম গ্যালাক্সি আরটিপি স্বাভাবিক ট্র্যাকে ২৫% এ টাইট ব্যালেন্সড লক ভাই ভাই!
                    if (Math.random() <= 0.25) isLoopActive = false;
                } else {
                    isLoopActive = false; // লস হলে ওয়ান-শটে লুপ ব্রেক বর্ম! ওল্ড ইনফিনিটি জ্যাম চিরতরে সাফ!
                }
            }
        }

        // 🎯 [মেগা কিলার জিরো-ডাবল-ডেবিট স্টেক ব্যালেন্সার বর্ম ভাই ভাই]
        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (finalStatus === "win" && winMultiplier > 0) {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; // 🔒 লস হলে ডাটাবেজে ২য় বার টাকা কাটার ট্র্যাপ এরর ওয়ান-শটে ওড়াও সাফ!
        }

        let phpPayload = { 
            action: dbAction, username: finalQueryUser, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        if (finalStatus === "lose") phpPayload.status = "lose";
        else phpPayload.status = "win";

        // হিস্ট্রি লগে বাজি ধরা টাকার ওরিজিনাল ফুল ডেটা পাস লক ওস্তাদ
        phpPayload.bet_amount = reqAmount;

        // 🛫 ③ মেইন সাইটের সিকিউরড গেটওয়েতে রিয়েল-টাইম উইন-লস সেটেলমেন্ট এپیআই হিট (কড়া ৪৫ সেকেন্ড সিঙ্ক লক)
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 45000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: finalQueryUser, balance: response.data.balance });
            
            return res.json({
                success: true,
                balance: response.data.balance,
                data: { balance: response.data.balance },
                gameData: { 
                    isBlasted,
                    winMultiplier,
                    status: phpPayload.status, 
                    winAmount,
                    targetShipId
                }
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "X Bet Settlement Declined by Database!" });
        }
    } catch (e) { 
        return res.json({ success: false, message: "⚠️ Timeout! Tap to fire missile again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

// ⚡ কাস্টম নোড সার্ভার পোর্ট গেটওয়ে লাইভ অন ফায়ার (৪০০০০ পোর্টে ডেডিকেটেড সিঙ্ক লক!)
const PORT = process.env.PORT || 7300; 
server.listen(PORT, () => { console.log(`🚀 Aero Fighter Galaxy Shooter secure engine running on port ${PORT}`); });
