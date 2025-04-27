#!/bin/bash

# Create placeholder images for TwinSphere website
# This script uses the 'convert' command from ImageMagick

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first."
    echo "You can install it with: sudo apt-get install imagemagick"
    exit 1
fi

# Create images directory if it doesn't exist
mkdir -p images

# Generate favicon
convert -size 32x32 xc:none -fill "#0056b3" -draw "circle 16,16 16,2" \
    -fill "#00a0e9" -draw "circle 16,16 10,10" \
    images/favicon.png

# Generate hero background
convert -size 1920x1080 gradient:"#0056b3"-"#7b68ee" \
    -blur 0x20 \
    images/hero-bg.jpg

# Generate about image
convert -size 600x400 gradient:"#f8f9fa"-"#e1e1e1" \
    -fill "#0056b3" -draw "rectangle 50,50 550,350" \
    -fill "#00a0e9" -draw "circle 300,200 300,100" \
    -fill white -pointsize 24 -gravity center -annotate 0 "Digital Twin Visualization" \
    images/about-image.jpg

# Generate architecture diagram
convert -size 800x500 xc:white \
    -fill "#f8f9fa" -draw "rectangle 0,0 800,500" \
    -fill "#0056b3" -draw "rectangle 100,100 700,150" \
    -fill "#00a0e9" -draw "rectangle 100,200 700,250" \
    -fill "#7b68ee" -draw "rectangle 100,300 700,350" \
    -fill white -pointsize 18 -gravity center -annotate 0x0+0-100 "Level 3: Reasoning Agents" \
    -fill white -pointsize 18 -gravity center -annotate 0x0+0+0 "Level 2: Orchestration Agents" \
    -fill white -pointsize 18 -gravity center -annotate 0x0+0+100 "Level 1: Interaction Agents" \
    -draw "line 400,150 400,200" \
    -draw "line 400,250 400,300" \
    images/architecture-diagram.jpg

# Generate market growth chart
convert -size 800x400 xc:white \
    -fill "#f8f9fa" -draw "rectangle 0,0 800,400" \
    -fill none -stroke "#e1e1e1" -draw "line 50,350 750,350" \
    -fill none -stroke "#e1e1e1" -draw "line 50,50 50,350" \
    -fill none -stroke "#0056b3" -strokewidth 3 -draw "path 'M 50,330 C 200,300 400,200 750,50'" \
    -fill "#0056b3" -pointsize 14 -draw "text 50,380 '2024'" \
    -fill "#0056b3" -pointsize 14 -draw "text 750,380 '2032'" \
    -fill "#0056b3" -pointsize 14 -draw "text 20,350 '0'" \
    -fill "#0056b3" -pointsize 14 -draw "text 20,50 '260B'" \
    -fill "#0056b3" -pointsize 18 -gravity center -annotate 0x0+0+150 "Digital Twin Market Growth" \
    images/market-growth-chart.jpg

echo "Placeholder images have been generated in the images directory."
