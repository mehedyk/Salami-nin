    // History management
    let history = [];
    let totalGiven = 0;

    // Load history from memory
    function loadHistory() {
      const saved = localStorage.getItem('salamiHistory');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          history = data.history || [];
          totalGiven = data.total || 0;
          updateHistoryDisplay();
        } catch (e) {
          console.log('No previous history');
        }
      }
    }

    // Save history to memory
    function saveHistory() {
      localStorage.setItem('salamiHistory', JSON.stringify({
        history: history.slice(-10), // Keep last 10
        total: totalGiven
      }));
    }

    // Update history display
    function updateHistoryDisplay() {
      if (history.length > 0) {
        document.getElementById('historySection').classList.remove('hidden');
        const historyList = document.getElementById('historyList');
        historyList.innerHTML = history.slice(-5).reverse().map(item => 
          `<div class="history-item">${item.name} - ${item.date}</div>`
        ).join('');
      }
    }

    // Create confetti
    function createConfetti() {
      for (let i = 0; i < 50; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = Math.random() * 100 + '%';
          confetti.style.background = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)];
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
          document.body.appendChild(confetti);
          
          setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
      }
    }

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

    // Main receive button
    document.getElementById("receiveBtn").addEventListener("click", function() {
      const userName = document.getElementById("userName").value.trim();

      if (userName === "") {
        alert("আগে নামটা লিখুন! 😊");
        return;
      }

      // Update history
      totalGiven++;
      const now = new Date();
      history.push({
        name: userName,
        date: now.toLocaleDateString('bn-BD')
      });
      saveHistory();

      // Display message
      const message = userName + ", এই নাও তোমার সালামী! 🎁💰";
      document.getElementById("resultMessage").innerText = message;

      // Random bill
      const randomIndex = Math.floor(Math.random() * billImages.length);
      document.getElementById("billImage").src = billImages[randomIndex];

      // Counter
      document.getElementById("counter").innerText = `Total Salamis Given: ${totalGiven} 🎉`;

      // Show result
      document.getElementById("initialContainer").style.display = "none";
      document.getElementById("resultContainer").classList.remove("hidden");

      // Confetti effect
      createConfetti();
    });

    // Try again button
    document.getElementById("tryAgainBtn").addEventListener("click", function() {
      document.getElementById("userName").value = "";
      document.getElementById("resultContainer").classList.add("hidden");
      document.getElementById("initialContainer").style.display = "block";
      updateHistoryDisplay();
    });

    // Share button
    document.getElementById("shareBtn").addEventListener("click", function() {
      const userName = document.getElementById("resultMessage").innerText.split(",")[0];
      const shareText = `${userName} just received Salami from Aunik & Mahdi! 🎁💰`;
      
      if (navigator.share) {
        navigator.share({
          title: 'Salami Gift',
          text: shareText,
          url: window.location.href
        }).catch(err => console.log('Share cancelled'));
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText + ' - ' + window.location.href)
          .then(() => alert('লিংক কপি হয়েছে! 📋'))
          .catch(() => alert('শেয়ার করতে ব্যর্থ 😔'));
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