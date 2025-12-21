# 🎁 Salami from Aunik (সালামি নেন)

A fun, interactive Bengali web application with **secure cloud storage** using Supabase and Netlify Functions. Users can "receive" virtual Salami (gift money) with random Bangladeshi currency notes!

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://salami-from-aunik.netlify.app/)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge/deploy-status)](https://app.netlify.com/sites/salami-from-aunik/deploys)

## ✨ Features

### 🔐 Security (NEW!)
- **Zero credentials in code** - All secrets stored in Netlify environment variables
- **Server-side validation** - Netlify Functions handle Supabase calls
- **Rate limiting** - Prevents spam and abuse
- **XSS protection** - All inputs sanitized
- **SQL injection prevention** - Server-side validation

### ☁️ Cloud Features
- **Persistent storage** - History never lost (Supabase)
- **Real-time updates** - See new entries instantly
- **Global counter** - Total Salamis given across all users
- **Shared history** - All users see same recipients
- **Session tracking** - Unique session IDs

### 🎨 UI Features
- 🎉 Confetti animation
- 📜 Recent recipients list (last 10)
- 🔄 Try again button
- 📤 Share functionality
- ⌨️ Enter key support
- 🌐 Bengali font (Hind Siliguri)
- 📱 Fully responsive
- ✨ Smooth animations


## 📖 How to Use

1. Visit https://salami-from-aunik.netlify.app/
2. Enter your name in Bengali
3. Click "Receive Salami" 🎉
4. Get a random Bangladeshi bill
5. See your recipient number
6. Share with friends!

## 🛠️ Technical Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Google Fonts (Hind Siliguri, Poppins)
- No framework needed!

**Backend:**
- Netlify Functions (serverless)
- Supabase (PostgreSQL database)
- Real-time subscriptions

**Security:**
- Environment variables
- Server-side validation
- Rate limiting
- Input sanitization

## 🔒 Security Architecture

```
User Browser
    ↓
Frontend (No credentials!) ← GitHub Repo (Public ✅)
    ↓
Netlify Function (Has credentials) ← Env Variables (Hidden 🔐)
    ↓
Supabase Database
```

**Why it's secure:**
1. Credentials stored in Netlify (not in code)
2. Functions run server-side (not in browser)
3. Validation happens on server
4. GitHub repo can be public safely

## 📁 Project Structure

```
salami-from-aunik/
├── netlify/
│   └── functions/
│       └── supabase-proxy.js    # Server-side function
├── index.html                    # Main page
├── script.js                     # Frontend (NO credentials)
├── styles.css                    # Styling
├── netlify.toml                  # Netlify config
├── package.json                  # Dependencies
└── README.md                     # You are here!
```

## 🎯 Key Files

**script.js** - Frontend code (public, no secrets)
```javascript
// NO credentials here!
const result = await callFunction('loadHistory');
```

## 🎨 Customization

### Change Colors
Edit `styles.css`:
```css
.btn {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### Add More Bills
Edit `script.js`:
```javascript
const billImages = [
  "https://your-new-bill-image.jpg",
  // Add more...
];
```

### Change Text
Edit `index.html`:
```html
<h1>🎁 Your Custom Text 🎁</h1>
```

## 🐛 Troubleshooting

### "Function not found"
- Check `netlify.toml` exists in root
- Verify folder structure: `netlify/functions/supabase-proxy.js`
- Redeploy site

### "Environment variables undefined"
- Add variables in Netlify Dashboard
- Redeploy after adding variables
- Check variable names match exactly

### "History not loading"
- Check Supabase table exists
- Verify RLS policies are set
- Check browser console for errors

## 📈 Performance

- ✅ Lightweight (< 100KB total)
- ✅ Serverless (scales automatically)
- ✅ CDN cached (fast worldwide)
- ✅ Real-time updates
- ✅ 60fps animations

## 🌐 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| Mobile  | ✅ Full |

## 💰 Cost (FREE!)

**Netlify Free Tier:**
- ✅ 100GB bandwidth/month
- ✅ 125K function requests/month
- ✅ Automatic deployments

**Supabase Free Tier:**
- ✅ 500MB database
- ✅ 50K monthly active users
- ✅ Real-time subscriptions

**Total: $0/month** 🎉

## 🔮 Future Enhancements

- [ ] Sound effects
- [ ] Multiple languages
- [ ] Custom messages
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] SMS for Bangladesh
- [ ] Dark mode
- [ ] Leaderboard

## 🤝 Contributing

Contributions welcome!

1. Fork the repo
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License - Use freely!

## 👨‍💻 Author

**Mehedyk**
- GitHub: [@mehedyk](https://github.com/mehedyk)
- Website: [Your Website]
- Project Link: https://salami-from-aunik.netlify.app/

## 🙏 Acknowledgments

- Supabase for amazing backend platform
- Netlify for serverless functions
- Google Fonts for Bengali typography
- Bengali Eid traditions for inspiration

## 📞 Support

Found a bug? Have a question?

- 🐛 [Open an issue](https://github.com/mehedyk/salami-from-aunik/issues)
- 💬 [Discussions](https://github.com/mehedyk/salami-from-aunik/discussions)
- 📧 Contact: [@mehedyk](https://github.com/mehedyk)

## ⭐ Star This Repo!

If you like this project, give it a star! ⭐

---

**Made by Mehedyk**

*Now with enterprise-level security!* 🔐✨