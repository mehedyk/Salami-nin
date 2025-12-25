    // Session ID for tracking
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Bill images
    const billImages = [
      "https://i.postimg.cc/yxZV71CL/60ef0539dd7292-86085694-original.jpg",
      "https://i.postimg.cc/c4v38w0z/626c27fbbd8e42-21585521-original.jpg",
      "https://i.postimg.cc/j2sXb5fb/62ca85a360eaa8-54197328-original.jpg",
      "https://i.postimg.cc/zGSGLGbM/6378960701c077-24377127-original.jpg",
      "https://i.postimg.cc/fRhbT9Lm/63fdf6608215d0-47811604-original.jpg",
      "https://i.postimg.cc/4d8KYNMZ/64512e545596f1-49423818-original.jpg",
      "https://i.postimg.cc/Gm048fMB/64512fd6d9b187-62282441-original-1.jpg",
      "https://i.postimg.cc/cJx4fGfJ/645141f718c5e3-53349676-original.jpg",
      "https://i.postimg.cc/cCpL3Kcq/64514377647a05-37023358-original.jpg"
    ];

    // Duwa collection
    const duwaCollection = [
      {
        arabic: "بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
        bangla: "আল্লাহ আপনাকে বরকত দান করুন এবং আপনার উপর বরকত নাজিল করুন এবং আপনাদের মাঝে কল্যাণে একত্রিত করুন।"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
        bangla: "হে আল্লাহ! আমি আপনার কাছে হিদায়াত, তাকওয়া, পবিত্রতা ও সচ্ছলতা প্রার্থনা করি।"
      },
      {
        arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
        bangla: "হে আমাদের প্রতিপালক! আমাদেরকে দুনিয়াতে কল্যাণ দান করুন এবং আখিরাতেও কল্যাণ দান করুন এবং আমাদেরকে জাহান্নামের আগুন থেকে রক্ষা করুন।"
      },
      {
        arabic: "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي",
        bangla: "হে আল্লাহ! নিশ্চয়ই আপনি ক্ষমাশীল, ক্ষমা করতে ভালোবাসেন। তাই আমাকে ক্ষমা করে দিন।"
      },
      {
        arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
        bangla: "হে আমার প্রতিপালক! আমার হৃদয় প্রশস্ত করে দিন এবং আমার কাজ সহজ করে দিন।"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ",
        bangla: "হে আল্লাহ! আমি আপনার কাছে দুশ্চিন্তা ও দুঃখ থেকে আশ্রয় চাই।"
      },
      {
        arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
        bangla: "হে আমাদের প্রতিপালক! আমাদের থেকে কবুল করুন। নিশ্চয়ই আপনি সর্বশ্রোতা, সর্বজ্ঞানী।"
      },
      {
        arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا",
        bangla: "হে আল্লাহ! আমি আপনার কাছে উপকারী জ্ঞান, পবিত্র রিযিক এবং কবুলযোগ্য আমল প্রার্থনা করি।"
      }
    ];

    let currentDuwa = null;
    let currentBillImage = null;
    let currentUserName = '';

    function timeAgo(date) {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000);
      if (seconds < 60) return 'এখনই নিলো';
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return minutes + ' মিনিট আগে';
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return hours + ' ঘণ্টা আগে';
      const days = Math.floor(hours / 24);
      return days + ' দিন আগে';
    }

    function showError(message) {
      const errorDiv = document.getElementById('errorDisplay');
      errorDiv.textContent = '❌ ' + message;
      errorDiv.classList.remove('hidden');
      setTimeout(() => errorDiv.classList.add('hidden'), 5000);
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    function validateName(name) {
      if (!name || name.trim().length < 2) {
        return { valid: false, error: 'নাম অন্তত ২ অক্ষর হওয়া লাগব' };
      }
      if (name.length > 50) {
        return { valid: false, error: 'নাম সর্বোচ্চ ৫০ অক্ষরের হইতে পারবে' };
      }
      return { valid: true };
    }

    async function callNetlifyFunction(action, params = {}) {
      try {
        const response = await fetch('/.netlify/functions/supabase-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...params })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Netlify function error:', error);
        throw error;
      }
    }

    async function loadHistory() {
      try {
        const result = await callNetlifyFunction('loadHistory');
        if (result.data && result.data.length > 0) {
          document.getElementById('historySection').classList.remove('hidden');
          const historyList = document.getElementById('historyList');
          historyList.innerHTML = result.data.map(item => `
            <div class="history-item">
              <span class="name">${escapeHtml(item.name)}</span>
              <span class="time">${timeAgo(item.created_at)}</span>
            </div>
          `).join('');
        }
        document.getElementById('globalCounter').innerHTML = 
          `এখন পর্যন্ত সালামী নিছে: <strong>${result.count || 0}</strong> জন`;
      } catch (error) {
        console.error('Error loading history:', error);
        document.getElementById('globalCounter').innerHTML = 
          '⚠️ ডাটাবেস লোড হচ্ছে না';
        showError('History লোড করতে ব্যর্থ');
      }
    }

    async function saveSalami(name) {
      try {
        const result = await callNetlifyFunction('saveSalami', {
          name: name,
          session_id: sessionId
        });
        if (result.error) {
          showError(result.error);
          return false;
        }
        if (result.count) {
          document.getElementById("counter").innerHTML = 
            `🌟 আপনি ${result.count}-তম সালামী নিলেন 🌟`;
        }
        return true;
      } catch (error) {
        console.error('Error saving:', error);
        showError('Save করতে ব্যর্থ হয়েছে');
        return false;
      }
    }

    function createConfetti() {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + '%';
          confetti.style.background = ['#D4AF37', '#FFD700', '#006A4E', '#008080', '#FF69B4'][Math.floor(Math.random() * 5)];
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
          document.body.appendChild(confetti);
          setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
      }
    }

    async function generateDownloadCard() {
      const canvas = document.getElementById('downloadCanvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1000;
      canvas.height = 1400;

      // Background - starry night gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, '#1a1a3e');
      bgGradient.addColorStop(0.5, '#2d1b4e');
      bgGradient.addColorStop(1, '#1a1a3e');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw larger glowing stars
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ffffff';
      for (let i = 0; i < 8; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height * 0.4);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Draw crescent moon
      ctx.fillStyle = '#f5f5dc';
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#f5f5dc';
      ctx.beginPath();
      ctx.arc(850, 150, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a1a3e';
      ctx.beginPath();
      ctx.arc(820, 140, 75, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw mosque silhouette at bottom
      ctx.fillStyle = '#000000';
      const skylineY = canvas.height - 250;
      
      // Simple mosque shapes
      // Left dome
      ctx.beginPath();
      ctx.arc(150, skylineY, 50, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(130, skylineY, 40, 150);
      
      // Center large dome
      ctx.beginPath();
      ctx.arc(500, skylineY - 50, 80, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(460, skylineY - 50, 80, 200);
      
      // Right dome
      ctx.beginPath();
      ctx.arc(850, skylineY, 50, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(830, skylineY, 40, 150);
      
      // Minarets
      ctx.fillRect(100, skylineY - 80, 15, 230);
      ctx.fillRect(300, skylineY - 100, 15, 250);
      ctx.fillRect(700, skylineY - 100, 15, 250);
      ctx.fillRect(885, skylineY - 80, 15, 230);
      
      // Minaret tops
      ctx.beginPath();
      ctx.arc(107, skylineY - 80, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(307, skylineY - 100, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(707, skylineY - 100, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(892, skylineY - 80, 10, 0, Math.PI * 2);
      ctx.fill();

      // Draw floating crescent moons and stars decorations
      ctx.fillStyle = 'rgba(245, 245, 220, 0.4)';
      // Left crescent
      ctx.beginPath();
      ctx.arc(100, 180, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a1a3e';
      ctx.beginPath();
      ctx.arc(90, 175, 23, 0, Math.PI * 2);
      ctx.fill();
      
      // Right crescent
      ctx.fillStyle = 'rgba(245, 245, 220, 0.4)';
      ctx.beginPath();
      ctx.arc(900, 180, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#1a1a3e';
      ctx.beginPath();
      ctx.arc(890, 175, 23, 0, Math.PI * 2);
      ctx.fill();

      // Sparkle decorations
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      const sparkles = [[200, 300], [800, 350], [150, 450], [850, 500]];
      sparkles.forEach(([x, y]) => {
        ctx.fillRect(x - 1, y - 15, 2, 30);
        ctx.fillRect(x - 15, y - 1, 30, 2);
        ctx.fillRect(x - 10, y - 10, 2, 20);
        ctx.fillRect(x - 10, y - 1, 20, 2);
      });

      // Title - Eid Mubarak
      ctx.fillStyle = '#D4AF37';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#D4AF37';
      ctx.font = 'bold 56px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ঈদ মুবারক', canvas.width / 2, 120);
      ctx.shadowBlur = 0;

      ctx.font = '50px Arial';
      ctx.fillText('🌙✨', canvas.width / 2, 180);

      // Recipient name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px Arial';
      ctx.fillText(currentUserName + ' কে', canvas.width / 2, 260);

      ctx.font = '32px Arial';
      ctx.fillText('সালামীর শুভেচ্ছা', canvas.width / 2, 310);

      // Bill image
      if (currentBillImage) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = currentBillImage;
          });
          const imgWidth = 500;
          const imgHeight = (img.height / img.width) * imgWidth;
          
          // White card background for bill
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.fillRect((canvas.width - imgWidth - 40) / 2, 340, imgWidth + 40, imgHeight + 40);
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 3;
          ctx.strokeRect((canvas.width - imgWidth - 40) / 2, 340, imgWidth + 40, imgHeight + 40);
          
          ctx.drawImage(img, (canvas.width - imgWidth) / 2, 360, imgWidth, imgHeight);
        } catch (e) {
          console.error('Error loading bill image:', e);
        }
      }

      // Duwa section with semi-transparent card
      const duwaY = 720;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(80, duwaY, canvas.width - 160, 350);
      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 3;
      ctx.strokeRect(80, duwaY, canvas.width - 160, 350);

      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 32px Arial';
      ctx.fillText('🤲 দোয়া', canvas.width / 2, duwaY + 50);

      if (currentDuwa) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '26px Arial';
        ctx.textAlign = 'center';
        const arabicLines = wrapText(ctx, currentDuwa.arabic, canvas.width - 200);
        let yPos = duwaY + 110;
        arabicLines.forEach(line => {
          ctx.fillText(line, canvas.width / 2, yPos);
          yPos += 38;
        });

        ctx.font = '22px Arial';
        yPos += 25;
        const banglaLines = wrapText(ctx, currentDuwa.bangla, canvas.width - 200);
        banglaLines.forEach(line => {
          ctx.fillText(line, canvas.width / 2, yPos);
          yPos += 35;
        });
      }

      // Footer
      ctx.fillStyle = '#D4AF37';
      ctx.font = 'bold 22px Arial';
      ctx.fillText('From: Aunik & Mahdi', canvas.width / 2, canvas.height - 90);
      ctx.font = '18px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Generated on ' + new Date().toLocaleDateString('bn-BD'), canvas.width / 2, canvas.height - 55);

      return canvas;
    }

    function wrapText(ctx, text, maxWidth) {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];
      for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = ctx.measureText(currentLine + ' ' + word).width;
        if (width < maxWidth) {
          currentLine += ' ' + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);
      return lines;
    }

    async function downloadCard() {
      const btn = document.getElementById('downloadBtn');
      btn.disabled = true;
      btn.innerHTML = '<span><span class="loading"></span> তৈরি হচ্ছে...</span>';
      try {
        const canvas = await generateDownloadCard();
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `eid-salami-${currentUserName}-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          btn.disabled = false;
          btn.innerHTML = '<span>📥 ডাউনলোড করুন</span>';
        }, 'image/png');
      } catch (error) {
        console.error('Download error:', error);
        showError('ডাউনলোড করতে সমস্যা হয়েছে');
        btn.disabled = false;
        btn.innerHTML = '<span>📥 ডাউনলোড করুন</span>';
      }
    }

    document.getElementById("receiveBtn").addEventListener("click", async function() {
      const userName = document.getElementById("userName").value;
      const validation = validateName(userName);
      if (!validation.valid) {
        showError(validation.error);
        return;
      }
      this.disabled = true;
      this.innerHTML = '<span><span class="loading"></span> প্রক্রিয়াকরণ...</span>';
      currentUserName = userName.trim();
      const saved = await saveSalami(userName);
      if (!saved) {
        this.disabled = false;
        this.innerHTML = '<span>🎉 সালামী নিন</span>';
        return;
      }
      const message = escapeHtml(userName.trim()) + ", এই নাও তোমার সালামী! 🎁💰";
      document.getElementById("resultMessage").innerHTML = message;
      const randomIndex = Math.floor(Math.random() * billImages.length);
      currentBillImage = billImages[randomIndex];
      document.getElementById("billImage").src = currentBillImage;
      const duwaIndex = Math.floor(Math.random() * duwaCollection.length);
      currentDuwa = duwaCollection[duwaIndex];
      document.getElementById("duwaArabic").textContent = currentDuwa.arabic;
      document.getElementById("duwaBangla").textContent = currentDuwa.bangla;
      document.getElementById("initialContainer").style.display = "none";
      document.getElementById("resultContainer").classList.remove("hidden");
      createConfetti();
      this.disabled = false;
      this.innerHTML = '<span>🎉 সালামী নিন</span>';
    });

    document.getElementById("downloadBtn").addEventListener("click", downloadCard);

    document.getElementById("tryAgainBtn").addEventListener("click", function() {
      document.getElementById("userName").value = "";
      document.getElementById("resultContainer").classList.add("hidden");
      document.getElementById("initialContainer").style.display = "block";
      loadHistory();
    });

    document.getElementById("shareBtn").addEventListener("click", async function() {
      const shareText = `${currentUserName} ঈদের সালামী পেয়েছেন! 🎁💰\n\nএই নাও তোমার সালামী:\n${currentDuwa.bangla}\n\n- Aunik & Mahdi`;
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'ঈদ সালামী',
            text: shareText,
            url: window.location.href
          });
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.log('Share cancelled');
          }
        }
      } else {
        try {
          await navigator.clipboard.writeText(shareText + '\n\n' + window.location.href);
          alert('লিংক কপি হয়েছে! 📋');
        } catch (err) {
          showError('শেয়ার করতে ব্যর্থ 😔');
        }
      }
    });

    document.getElementById("userName").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        document.getElementById("receiveBtn").click();
      }
    });

    loadHistory();