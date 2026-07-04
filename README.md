# 🏓 Retro Pong Evolution (5-Day Challenge)

यह एक मॉडर्न और एडवांस्ड **2D Pong Game** है जिसे HTML5 Canvas, CSS3, और Pure JavaScript (Vanilla JS) का उपयोग करके बनाया गया है। इस प्रोजेक्ट को मैंने 5 दिनों के अंदर स्टेप-बाय-स्टेप अपग्रेड करके पूरा किया है।

## 🚀 Live Demo
> **[यहाँ क्लिक करके गेम खेलें](https://nayan32006.github.io/pongGame_project/)**

---

## 📅 5-Day Development Timeline (प्रोजेक्ट का सफर)

### 🔹 Day 1: Base Mechanics & Input Boundaries
- **Accomplished:** `canvas.getBoundingClientRect()` का उपयोग करके माउस ट्रैकिंग बग को फिक्स किया।
- **Improvement:** पैडल को स्क्रीन की सीमाओं (Boundaries) के अंदर लॉक किया।

### 🔹 Day 2: Dynamic AI Opponent
- **Accomplished:** वॉल-बाउंस शॉर्टकट हटाकर एक असली रिएक्टिव एआई (AI) बनाया।
- **Improvement:** एआई में 0.085 का गति स्केलर (Speed Scalar) जोड़ा ताकि गेम चैलेंजिंग बने।

### 🔹 Day 3: Advanced Vector Physics
- **Accomplished:** रिलेटिव इंटरसेप्ट डिफ्लेक्शन (Relative Intercept Deflection) लागू किया—बॉल पैडल के जिस हिस्से पर टकराएगी, उसी एंगल पर मुड़ेगी।
- **Improvement:** बॉल के पैडल के पीछे फंसने या चिपकने वाले बग को पूरी तरह ठीक किया।

### 🔹 Day 4: Architecture & Game States
- **Accomplished:** `setInterval` को हटाकर स्मूथ गेमप्ले के लिए `requestAnimationFrame` का इस्तेमाल किया।
- **Improvement:** 'Start', 'Pause (Press P)', और 'Game Over (5 Points Limit)' जैसी गेम स्टेट्स जोड़ीं।

### 🔹 Day 5: Visual Juice & Audio Synth
- **Accomplished:** रेट्रो-मॉडर्न थीम, डैश्ड सेंटर नेट लाइन और वॉटरमार्क स्कोरボード डिज़ाइन किया।
- **Improvement:** बॉल हिट होने पर **Particle Burst FX** और बिना किसी बाहरी फाइल के `Web Audio API` से 8-बिट साउंड इफेक्ट्स जनरेट किए।

---

## 🎮 कैसे खेलें (Controls)
- **माउस (Mouse):** अपने पैडल को ऊपर-नीचे करने के लिए माउस हिलाएं।
- **P Key:** गेम को बीच में रोकने (Pause/Unpause) के लिए कीबोर्ड पर 'P' दबाएं।
- **जीतने की शर्त:** जो पहले 5 पॉइंट्स बनाएगा, वह जीतेगा!
