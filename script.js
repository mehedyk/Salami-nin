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

    // Duwa collection (Bengali Islamic prayers)
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

    // Format time ago
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

    // Show error message
    function showError(message) {
      const errorDiv = document.getElementById('errorDisplay');
      errorDiv.textContent = '❌ ' + message;
      errorDiv.classList.remove('hidden');
      setTimeout(() => errorDiv.classList.add('hidden'), 5000);
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    // Validate name
    function validateName(name) {
      if (!name || name.trim().length < 2) {
        return { valid: false, error: 'নাম অন্তত ২ অক্ষর হওয়া লাগব' };
      }
      
      if (name.length > 50) {
        return { valid: false, error: 'নাম সর্বোচ্চ ৫০ অক্ষরের হইতে পারবে' };
      }

      return { valid: true };
    }
      // Call Netlify Function
      async function callNetlifyFunction(action, params = {}) {
      try {
        const response = await fetch('/.netlify/functions/supabase-proxy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action, ...params })
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error('Netlify function error:', error);
        throw error;
      }
    }

  // Load history
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

  // Save salami
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
          `🌟 আপনি ${result.count}-তম সালামী নিলেন🌟`;
      }

      return true;
    } catch (error) {
      console.error('Error saving:', error);
      showError('Save করতে ব্যর্থ হয়েছে');
      return false;
    }
  }


    // Create confetti
    function createConfetti() {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + '%';
          confetti.style.background = ['#ffd700', '#ff69b4', '#00ff00', '#00ffff', '#ff00ff'][Math.floor(Math.random() * 5)];
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
          document.body.appendChild(confetti);
          
          setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
      }
    }

    // Generate downloadable card
    async function generateDownloadCard() {
      const canvas = document.getElementById('downloadCanvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size
      canvas.width = 800;
      canvas.height = 1200;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#667eea');
      gradient.addColorStop(1, '#764ba2');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add decorative border
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 10;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Inner border
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(35, 35, canvas.width - 70, canvas.height - 70);

      // Title
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('ঈদ মুবারক', canvas.width / 2, 100);

      // Moon and stars decoration
      ctx.font = '60px Arial';
      ctx.fillText('🌙✨', canvas.width / 2, 170);

      // Recipient name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px Arial';
      ctx.fillText(currentUserName + ' কে', canvas.width / 2, 250);

      // Salami message
      ctx.font = '28px Arial';
      ctx.fillText('সালামীর শুভেচ্ছা', canvas.width / 2, 300);

      // Load and draw bill image
      if (currentBillImage) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = currentBillImage;
          });
          
          const imgWidth = 400;
          const imgHeight = (img.height / img.width) * imgWidth;
          ctx.drawImage(img, (canvas.width - imgWidth) / 2, 350, imgWidth, imgHeight);
        } catch (e) {
          console.error('Error loading bill image:', e);
        }
      }

      // Duwa section
      ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
      ctx.fillRect(60, 650, canvas.width - 120, 400);
      
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 650, canvas.width - 120, 400);

      // Duwa title
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 28px Arial';
      ctx.fillText('দোয়া', canvas.width / 2, 700);

      // Arabic text
      if (currentDuwa) {
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        
        // Wrap Arabic text
        const arabicLines = wrapText(ctx, currentDuwa.arabic, canvas.width - 160);
        let yPos = 750;
        arabicLines.forEach(line => {
          ctx.fillText(line, canvas.width / 2, yPos);
          yPos += 35;
        });

        // Bengali translation
        ctx.font = '20px Arial';
        yPos += 20;
        const banglaLines = wrapText(ctx, currentDuwa.bangla, canvas.width - 160);
        banglaLines.forEach(line => {
          ctx.fillText(line, canvas.width / 2, yPos);
          yPos += 30;
        });
      }

      // Footer
      ctx.fillStyle = '#ffd700';
      ctx.font = '18px Arial';
      ctx.fillText('From: Aunik & Mahdi', canvas.width / 2, canvas.height - 80);
      ctx.font = '16px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Generated on ' + new Date().toLocaleDateString('bn-BD'), canvas.width / 2, canvas.height - 50);

      return canvas;
    }

    // Helper function to wrap text
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

    // Download card as image
    async function downloadCard() {
      const btn = document.getElementById('downloadBtn');
      btn.disabled = true;
      btn.innerHTML = '<span class="loading"></span> তৈরি হচ্ছে...';

      try {
        const canvas = await generateDownloadCard();
        
        // Convert to blob and download
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
          btn.innerHTML = '📥 ডাউনলোড করুন';
        }, 'image/png');

      } catch (error) {
        console.error('Download error:', error);
        showError('ডাউনলোড করতে সমস্যা হয়েছে');
        btn.disabled = false;
        btn.innerHTML = '📥 ডাউনলোড করুন';
      }
    }

    // Main receive button
    document.getElementById("receiveBtn").addEventListener("click", async function() {
      const userName = document.getElementById("userName").value;

      // Validate input
      const validation = validateName(userName);
      if (!validation.valid) {
        showError(validation.error);
        return;
      }

      // Disable button while processing
      this.disabled = true;
      this.innerHTML = '<span class="loading"></span> প্রক্রিয়াকরণ...';

      // Save current user name
      currentUserName = userName.trim();

      // Save to server (replace with your Netlify function call)
      const saved = await saveSalami(userName);

      if (!saved) {
        this.disabled = false;
        this.innerHTML = '🎉 সালামী নিন';
        return;
      }

      // Display message
      const message = escapeHtml(userName.trim()) + ", এই নাও তোমার সালামী! 🎁💰";
      document.getElementById("resultMessage").innerHTML = message;

      // Random bill
      const randomIndex = Math.floor(Math.random() * billImages.length);
      currentBillImage = billImages[randomIndex];
      document.getElementById("billImage").src = currentBillImage;

      // Random duwa
      const duwaIndex = Math.floor(Math.random() * duwaCollection.length);
      currentDuwa = duwaCollection[duwaIndex];
      document.getElementById("duwaArabic").textContent = currentDuwa.arabic;
      document.getElementById("duwaBangla").textContent = currentDuwa.bangla;

      // // Show recipient number
      // document.getElementById("counter").innerHTML = 
      //   `🌟 আপনি প্রাপক নং ${result.count} 🌟`;

      // Show result
      document.getElementById("initialContainer").style.display = "none";
      document.getElementById("resultContainer").classList.remove("hidden");

      // Confetti effect
      createConfetti();

      // Re-enable button
      this.disabled = false;
      this.innerHTML = '🎉 সালামী নিন';
    });

    // Download button
    document.getElementById("downloadBtn").addEventListener("click", downloadCard);

    // Try again button
    document.getElementById("tryAgainBtn").addEventListener("click", function() {
      document.getElementById("userName").value = "";
      document.getElementById("resultContainer").classList.add("hidden");
      document.getElementById("initialContainer").style.display = "block";
      loadHistory();
    });

    // Share button
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
        // Fallback: copy to clipboard
        try {
          await navigator.clipboard.writeText(shareText + '\n\n' + window.location.href);
          alert('লিংক কপি হয়েছে! 📋');
        } catch (err) {
          showError('শেয়ার করতে ব্যর্থ 😔');
        }
      }
    });

    // Enter key support
    document.getElementById("userName").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        document.getElementById("receiveBtn").click();
      }
    });

    // Load history on start
    loadHistory();