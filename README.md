# Cricket Stats - Live Cricket Scores & Statistics

A comprehensive, mobile-first cricket statistics platform built with Flask. Real-time match scores, player stats, ICC rankings, and player comparisons.

**Live at:** `cricket.gaiasentinel.online`

## ✨ Features

- 🏏 **Live Match Tracking** - Real-time scores with auto-refresh
- 📊 **Detailed Scorecards** - Ball-by-ball commentary, batting/bowling stats
- 🏆 **ICC Rankings** - Latest rankings for batsmen, bowlers, all-rounders, and teams
- 🔍 **Player Database** - Comprehensive player profiles with career statistics
- ⚖️ **Player Comparison** - Side-by-side statistical analysis
- 📱 **Mobile-First Design** - Optimized for mobile, works great on desktop
- 🌙 **Dark Theme** - Eye-friendly dark interface with vibrant accents
- ⚡ **Fast & Responsive** - Smooth animations and transitions

## 🎨 Design

- **Color Scheme**: Black background (#0a0a0a) with electric blue (#00d4ff) and lime accents (#d4ff00)
- **Typography**: Outfit (headings), JetBrains Mono (stats)
- **Layout**: Card-based, mobile-first responsive design
- **Inspiration**: Modern sports apps with brutalist aesthetics

## 🏗️ Project Structure

```
cricket-stats/
├── app.py                      # Main Flask application
├── templates/
│   ├── base.html              # Base template with navigation
│   ├── home.html              # Homepage with live matches
│   ├── live.html              # Live matches page
│   ├── matches.html           # All matches (upcoming/recent/IPL)
│   ├── scorecard.html         # Detailed match scorecard
│   ├── players.html           # Player database
│   ├── player_detail.html     # Individual player profile
│   ├── rankings.html          # ICC rankings
│   ├── compare.html           # Player comparison tool
│   └── credits.html           # Credits page with contributor photos
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── main.js            # Shared JavaScript utilities
│   └── images/
│       ├── contributor1.jpg   # Photo of idea contributor 1
│       └── contributor2.jpg   # Photo of idea contributor 2
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- pip
- virtualenv (recommended)

### Installation

1. **Clone the repository**
   ```bash
   cd /home/claude
   # Files are already created in this directory
   ```

2. **Create virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install flask requests
   ```

4. **Configure Cricket API**
   
   The app uses cricket data APIs. You have several options:
   
   **Option A: CricAPI (Recommended)**
   - Sign up at https://www.cricapi.com/
   - Get your API key
   - Update `CRICAPI_KEY` in `app.py`
   
   **Option B: Cricbuzz Unofficial API**
   - Use the RapidAPI Cricbuzz API
   - Get API key from RapidAPI
   - Modify API endpoints in `app.py`
   
   **Option C: ESPN Cricinfo (Web Scraping)**
   - Implement web scraping logic
   - Be mindful of rate limits and terms of service

5. **Add contributor photos**
   ```bash
   # Place photos of the idea contributors in static/images/
   cp /path/to/photo1.jpg static/images/contributor1.jpg
   cp /path/to/photo2.jpg static/images/contributor2.jpg
   ```

6. **Update credits page**
   - Edit `templates/credits.html`
   - Replace "Contributor Name 1" and "Contributor Name 2" with actual names
   - Update descriptions as needed

7. **Run the application**
   ```bash
   python app.py
   ```

8. **Visit in browser**
   ```
   http://localhost:5500
   ```

## 🔌 API Integration

### CricAPI Setup (Recommended)

1. **Get API Key**
   ```bash
   # Sign up at https://www.cricapi.com/
   # Copy your API key
   ```

2. **Update app.py**
   ```python
   CRICAPI_KEY = "your_api_key_here"
   CRICAPI_BASE = "https://api.cricapi.com/v1"
   ```

3. **Available Endpoints**
   - `/currentMatches` - Live and recent matches
   - `/match_info` - Detailed match information
   - `/rankings` - ICC rankings
   - `/players_info` - Player statistics

### Alternative: Build Your Own Data Layer

If you prefer to use a different data source:

1. **Modify API routes in app.py**
   ```python
   @app.route('/api/live-matches')
   def api_live_matches():
       # Your custom data fetching logic
       data = fetch_from_your_source()
       return jsonify(data)
   ```

2. **Update frontend JavaScript**
   - Modify data parsing in template files
   - Adjust field mappings based on your API response structure

## 🌐 Deployment on GaiaSentinel Infrastructure

### Raspberry Pi 5 Deployment

1. **Copy files to server**
   ```bash
   scp -r /home/claude/* pi@gaiasentinel.online:/home/pi/cricket-stats/
   ```

2. **SSH into server**
   ```bash
   ssh pi@gaiasentinel.online
   cd /home/pi/cricket-stats
   ```

3. **Install dependencies**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install flask requests gunicorn
   ```

4. **Create systemd service**
   ```bash
   sudo nano /etc/systemd/system/cricket-stats.service
   ```
   
   ```ini
   [Unit]
   Description=Cricket Stats Flask App
   After=network.target
   
   [Service]
   User=pi
   WorkingDirectory=/home/pi/cricket-stats
   Environment="PATH=/home/pi/cricket-stats/venv/bin"
   ExecStart=/home/pi/cricket-stats/venv/bin/gunicorn -w 4 -b 0.0.0.0:5500 app:app
   Restart=always
   RestartSec=1
   
   [Install]
   WantedBy=multi-user.target
   ```

5. **Enable and start service**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable cricket-stats
   sudo systemctl start cricket-stats
   sudo systemctl status cricket-stats
   ```

### Cloudflare Tunnel Configuration

1. **Update Cloudflare Tunnel config**
   ```yaml
   ingress:
     - hostname: cricket.gaiasentinel.online
       service: http://localhost:5500
     # ... other services
   ```

2. **Restart Cloudflare Tunnel**
   ```bash
   sudo systemctl restart cloudflared
   ```

3. **Add DNS record**
   - Go to Cloudflare Dashboard
   - Add CNAME record: `cricket` → `<tunnel-id>.cfargotunnel.com`
   - Enable proxy (orange cloud)

### GaiaSentinel Hub Integration

Add to the GaiaSentinel hub (`all.gaiasentinel.online`):

```python
services = [
    # ... existing services
    {
        'name': 'Cricket Stats',
        'url': 'https://cricket.gaiasentinel.online',
        'description': 'Live cricket scores & statistics',
        'icon': 'cricket',
        'port': 5500,
        'status': 'active'
    }
]
```

## 📊 Sample Data vs Live Data

The current implementation uses **sample data** for demonstration. To use **live data**:

1. **Replace sample data in templates**
   - Home page: `generateSampleMatches()` → API call
   - Rankings page: `generateSampleRankings()` → API call
   - Players page: Update `samplePlayers` array → Database query

2. **Implement caching**
   ```python
   from flask_caching import Cache
   
   cache = Cache(app, config={'CACHE_TYPE': 'simple'})
   
   @app.route('/api/live-matches')
   @cache.cached(timeout=30)  # Cache for 30 seconds
   def api_live_matches():
       # API call
   ```

3. **Add error handling**
   ```python
   try:
       response = requests.get(API_URL, timeout=5)
       response.raise_for_status()
       return jsonify(response.json())
   except requests.exceptions.RequestException as e:
       return jsonify({'error': str(e)}), 500
   ```

## 🎯 Roadmap

- [ ] Real-time WebSocket updates for live matches
- [ ] User authentication and favorite teams
- [ ] Match predictions using ML
- [ ] Push notifications for match updates
- [ ] PWA support for offline access
- [ ] Historical match data analysis
- [ ] Interactive field placement visualization
- [ ] Social sharing features

## 👥 Credits

### Idea Contributors

**Special thanks to the visionaries who conceived this project:**

- **Contributor 1** - Original idea originator
- **Contributor 2** - Co-visionary and feature insights

*(Update names and add photos in `templates/credits.html` and `static/images/`)*

### Development Team

- **Abinaav** - Lead Developer, Full-stack development, API integration
- **Arvindhan** - Collaborator, GaiaSentinel ecosystem co-creator

### Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: Custom CSS, Vanilla JavaScript
- **Fonts**: Outfit, JetBrains Mono (Google Fonts)
- **Infrastructure**: Raspberry Pi 5, Cloudflare Tunnel
- **Deployment**: systemd, gunicorn

## 🛠️ Development

### Running in development mode

```bash
export FLASK_ENV=development
export FLASK_DEBUG=1
python app.py
```

### File watching

The app will auto-reload on file changes when `debug=True`.

### Testing API endpoints

```bash
# Live matches
curl http://localhost:5500/api/live-matches

# Match info
curl http://localhost:5500/api/match-info/12345

# Rankings
curl http://localhost:5500/api/rankings/batting
```

## 📝 Configuration

### Environment Variables

Create a `.env` file:

```bash
FLASK_ENV=production
CRICAPI_KEY=your_api_key
SECRET_KEY=your_secret_key
```

Update `app.py` to use:

```python
import os
from dotenv import load_dotenv

load_dotenv()

app.secret_key = os.getenv('SECRET_KEY')
CRICAPI_KEY = os.getenv('CRICAPI_KEY')
```

## 🐛 Troubleshooting

### Issue: API returns 401 Unauthorized
- Check your API key in `app.py`
- Verify API key is active and has sufficient quota

### Issue: Styles not loading
- Clear browser cache
- Check static files are in correct directory
- Verify `url_for('static', filename='...')` paths

### Issue: Service won't start
- Check systemd logs: `sudo journalctl -u cricket-stats -f`
- Verify Python path in service file
- Check file permissions

### Issue: Live updates not working
- Check browser console for JavaScript errors
- Verify API endpoints are returning data
- Check network tab for failed requests

## 📜 License

Part of the GaiaSentinel ecosystem. Built for educational and personal use.

## 🔗 Links

- **Live Site**: https://cricket.gaiasentinel.online
- **GaiaSentinel Hub**: https://all.gaiasentinel.online
- **GitHub**: (Add repository link when available)

---

Built with ❤️ for cricket fans everywhere | GaiaSentinel Ecosystem
