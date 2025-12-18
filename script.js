    // ⚠️ REPLACE THESE WITH YOUR SUPABASE CREDENTIALS
    const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
    const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';

    // Initialize Supabase client
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

    // Format time ago
    function timeAgo(date) {
      const seconds = Math.floor((new Date() - new Date(date)) / 1000);
      
      if (seconds < 60) return 'এখনই';
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
      errorDiv.textContent = message;
      errorDiv.classList.remove('hidden');
      setTimeout(() => errorDiv.classList.add('hidden'), 5000);
    }

    // Load history from Supabase
    async function loadHistory() {
      try {
        // Get recent 10 entries
        const { data, error } = await supabase
          .from('salami_history')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;

        if (data && data.length > 0) {
          document.getElementById('historySection').classList.remove('hidden');
          const historyList = document.getElementById('historyList');
          historyList.innerHTML = data.map(item => `
            <div class="history-item">
              <span class="name">${item.name}</span>
              <span class="time">${timeAgo(item.created_at)}</span>
            </div>
          `).join('');
        }

        // Get total count
        const { count, error: countError } = await supabase
          .from('salami_history')
          .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        document.getElementById('globalCounter').innerHTML = 
          `🎉 Total Salamis Given: <strong>${count || 0}</strong>`;

      } catch (error) {
        console.error('Error loading history:', error);
        document.getElementById('globalCounter').textContent = 
          '⚠️ Failed to load history';
        showError('ইতিহাস লোড করতে ব্যর্থ - Supabase setup চেক করুন');
      }
    }

    // Save to Supabase
    async function saveSalami(name) {
      try {
        const { data, error } = await supabase
          .from('salami_history')
          .insert([
            { 
              name: name,
              session_id: sessionId
            }
          ])
          .select();

        if (error) throw error;

        return true;
      } catch (error) {
        console.error('Error saving to Supabase:', error);
        showError('সংরক্ষণ করতে ব্যর্থ হয়েছে');
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
          confetti.style.background = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)];
          confetti.style.animationDelay = Math.random() * 2 + 's';
          confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
          document.body.appendChild(confetti);
          
          setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
      }
    }

    // Main receive button
    document.getElementById("receiveBtn").addEventListener("click", async function() {
      const userName = document.getElementById("userName").value.trim();

      if (userName === "") {
        alert("আগে নামটা লিখুন! 😊");
        return;
      }

      // Disable button while processing
      this.disabled = true;
      this.innerHTML = '<span class="loading"></span> Processing...';

      // Save to Supabase
      const saved = await saveSalami(userName);

      if (!saved) {
        this.disabled = false;
        this.innerHTML = '🎉 Receive Salami';
        return;
      }

      // Display message
      const message = userName + ", এই নাও তোমার সালামী! 🎁💰";
      document.getElementById("resultMessage").innerText = message;

      // Random bill
      const randomIndex = Math.floor(Math.random() * billImages.length);
      document.getElementById("billImage").src = billImages[randomIndex];

      // Reload history to get updated count
      await loadHistory();

      // Get updated total
      const { count } = await supabase
        .from('salami_history')
        .select('*', { count: 'exact', head: true });

      document.getElementById("counter").innerHTML = 
        `🌟 You are recipient #${count || '?'} 🌟`;

      // Show result
      document.getElementById("initialContainer").style.display = "none";
      document.getElementById("resultContainer").classList.remove("hidden");

      // Confetti effect
      createConfetti();

      // Re-enable button
      this.disabled = false;
      this.innerHTML = '🎉 Receive Salami';
    });

    // Try again button
    document.getElementById("tryAgainBtn").addEventListener("click", function() {
      document.getElementById("userName").value = "";
      document.getElementById("resultContainer").classList.add("hidden");
      document.getElementById("initialContainer").style.display = "block";
      loadHistory(); // Refresh history
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

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('salami_changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'salami_history' },
        (payload) => {
          console.log('New salami received!', payload);
          loadHistory(); // Refresh history when someone else receives
        }
      )
      .subscribe();

    // Load history on start
    loadHistory();

    // Refresh history every 30 seconds
    setInterval(loadHistory, 30000);