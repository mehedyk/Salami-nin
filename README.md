# 🎁 Salami from Aunik & Mahdi

A fun, interactive Bengali web application that lets users "receive" virtual Salami (gift money) with random Bangladeshi currency notes. Perfect for Eid celebrations or special occasions!

## ✨ Features

### Original Version
- Simple, clean UI with Bengali language support
- Random Bangladeshi currency note display
- Responsive design for mobile and desktop
- Smooth animations and hover effects
- Background image with overlay effects

### Upgraded Version (New!)
- 🎉 **Confetti Animation** - Celebration effects when receiving Salami
- 📜 **History Tracking** - Remembers previous recipients (last 10)
- 🔄 **Try Again Button** - Easily give Salami to multiple people
- 📤 **Share Functionality** - Share via Web Share API or clipboard
- ⌨️ **Keyboard Support** - Press Enter to submit
- 💾 **Persistent Storage** - Uses localStorage to remember history
- 📊 **Counter Display** - Shows total Salamis given
- 🎨 **Enhanced Animations** - Fade-in, bounce, and slide effects
- 🌐 **Bengali Font Support** - Uses "Hind Siliguri" for proper Bengali rendering
- 🎯 **Improved UX** - Better focus states and visual feedback

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server or installation required!

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/mehedyk/salami-gift.git
   cd salami-gift
   ```

2. **Open in Browser**
   - Simply open `https://salami-from-aunik.netlify.app/` in your web browser
   - Or use a local server:
     ```bash
     python -m http.server 8000
     ```
   - Then visit `https://salami-from-aunik.netlify.app/`

### Deployment

**GitHub Pages:**
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your site will be live at `https://salami-from-aunik.netlify.app/`


## 📖 How to Use

1. **Enter Your Name** - Type your relation to Aunik/Mahdi in Bengali
2. **Click "Receive Salami"** - Get a random Bangladeshi currency note
3. **Enjoy the Animation** - Watch the confetti celebration!
4. **Try Again** - Give Salami to more people
5. **Share** - Share the fun with others


### Change Colors
```css
.btn {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}
```

### Modify Text
Edit the Bengali text in the HTML:
```html
<h1>🎁 Your Custom Text Here 🎁</h1>
```

## 🛠️ Technical Details

**Technologies Used:**
- HTML5
- CSS3 (Animations, Gradients, Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Hind Siliguri, Poppins)
- LocalStorage API
- Web Share API (with fallback)

**Browser Compatibility:**
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## 📱 Features Breakdown

### Responsive Design
- Works on all screen sizes (mobile, tablet, desktop)
- Touch-friendly buttons and inputs
- Optimized for portrait and landscape modes

### Accessibility
- Proper HTML semantics
- Alt text for images
- Focus states for keyboard navigation
- High contrast text and backgrounds

### Performance
- Lightweight (< 50KB total)
- No external dependencies
- Fast load times
- Smooth 60fps animations

## 🐛 Known Issues & Limitations

- **Image Loading**: External images may take time on slow connections
- **LocalStorage**: Cleared when browser cache is cleared
- **Share API**: Not supported on all browsers (fallback: copy to clipboard)
- **History Limit**: Only stores last 10 recipients to save space

## 🔮 Future Enhancements

- [ ] Add sound effects
- [ ] Multiple language support
- [ ] Custom message input
- [ ] Social media preview cards
- [ ] Print receipt feature
- [ ] Dark/Light mode toggle
- [ ] Admin panel to view all history
- [ ] QR code generation for sharing

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Mehedyk**
- GitHub: [@mehedyk](https://github.com/mehedyk)

## 🙏 Acknowledgments

- Currency note images from
- Fonts from Google Fonts
- Inspired by Bengali Eid traditions

## 📞 Support

Found a bug or have a question?
- Open an issue on GitHub
- Contact: [@mehedyk](https://github.com/mehedyk)

---

*Enjoy spreading joy with virtual Salami!* 🎁💰