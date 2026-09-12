#!/usr/bin/env bash
# Robust static server for PortfolioMain
PORT=3000

if command -v python3 &>/dev/null; then
    echo "Starting Python 3 server on port $PORT..."
    python3 -m http.server $PORT
elif command -v python &>/dev/null; then
    echo "Starting Python server on port $PORT..."
    python -m SimpleHTTPServer $PORT
elif command -v npx &>/dev/null; then
    echo "Starting Node/npx server on port $PORT..."
    npx -y serve -s . -l $PORT
else
    echo "Error: Neither Python nor Node/npx was found on your system."
    echo "Please install Python or Node.js to run this server."
fi
