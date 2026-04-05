#Algorithm-Benchmarking-Engine

Smart Task Execution &amp; Protection Platform is a secure backend system built with Python that allows authenticated users to submit, schedule, and execute computational tasks through a protected API.  The platform combines algorithm execution, authentication, rate limiting, background processing ...

Make sure you have installed:
 
- **Python 3.10+** — [python.org](https://www.python.org/downloads/)
- **Node.js 18+** — [nodejs.org](https://nodejs.org/)
- **npm** — comes with Node.js
 
---
 
## How to Run
 
### 1. Clone the repository
 
```bash
git clone https://github.com/Yassine-Hajib/Algorithm-Benchmarking-Engine.git
cd "Algorithm-Benchmarking-Engine"
```
 
# Create virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
.\venv\Scripts\activate

# Install dependencies
pip install -r Backend/Requirements.txt

# Run from the project root (not inside Backend/)
uvicorn Backend.App.Main:app --reload
# Open a second terminal and start the React frontend

    cd Frontend
    npm install
    npm run dev
