from flask import Flask, render_template, jsonify
import requests
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# Cricket API configuration
CRICAPI_KEY = "8a83b2c9-1592-4b41-b0aa-3b132bdbe321"  # Replace with actual API key
CRICAPI_BASE = "https://api.cricapi.com/v1"

@app.route('/')
def home():
    """Home page with live matches and highlights"""
    return render_template('home.html')

@app.route('/live')
def live():
    """Live matches page"""
    return render_template('live.html')

@app.route('/matches')
def matches():
    """All matches - upcoming, recent, IPL schedules"""
    return render_template('matches.html')

@app.route('/scorecard/<match_id>')
def scorecard(match_id):
    """Detailed scorecard for a specific match"""
    return render_template('scorecard.html', match_id=match_id)

@app.route('/players')
def players():
    """Player database and search"""
    return render_template('players.html')

@app.route('/player/<player_id>')
def player_detail(player_id):
    """Individual player stats and profile"""
    return render_template('player_detail.html', player_id=player_id)

@app.route('/rankings')
def rankings():
    """ICC rankings - batting, bowling, all-rounder, teams"""
    return render_template('rankings.html')

@app.route('/compare')
def compare():
    """Player comparison tool"""
    return render_template('compare.html')

@app.route('/credits')
def credits():
    """Credits page with photos of idea contributors"""
    return render_template('credits.html')

# API endpoints for frontend
@app.route('/api/live-matches')
def api_live_matches():
    """Get current live matches"""
    try:
        # Example API call - replace with actual cricket API
        response = requests.get(f"{CRICAPI_BASE}/currentMatches", 
                              params={"apikey": CRICAPI_KEY, "offset": 0})
        data = response.json()
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/match-info/<match_id>')
def api_match_info(match_id):
    """Get detailed match information"""
    try:
        response = requests.get(f"{CRICAPI_BASE}/match_info", 
                              params={"apikey": CRICAPI_KEY, "id": match_id})
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/rankings/<category>')
def api_rankings(category):
    """Get ICC rankings by category (batting/bowling/teams)"""
    try:
        response = requests.get(f"{CRICAPI_BASE}/rankings", 
                              params={"apikey": CRICAPI_KEY, "category": category})
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/player-info/<player_id>')
def api_player_info(player_id):
    """Get player statistics and info"""
    try:
        response = requests.get(f"{CRICAPI_BASE}/players_info", 
                              params={"apikey": CRICAPI_KEY, "id": player_id})
        return jsonify(response.json())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5500, debug=True)
