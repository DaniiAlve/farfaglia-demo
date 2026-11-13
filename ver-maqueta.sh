#!/bin/bash
# Linux: ./ver-maqueta.sh para ver la maqueta en http://localhost:8000
cd "$(dirname "$0")"
(sleep 1; xdg-open "http://localhost:8000" >/dev/null 2>&1) &
python3 -m http.server 8000
