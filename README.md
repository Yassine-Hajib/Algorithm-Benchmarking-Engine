# My_Algorithm
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
 
### 2. Set up the Python virtual environment
 
```bash
# Create the virtual environment
python -m venv venv
 
# Activate it
# On Windows:
.\venv\Scripts\activate
 
# On Mac/Linux:
source venv/bin/activate
```
 
# 3. Install Python dependencies
 
    pip install -r Backend/Requirements.txt

# 4. Start the FastAPI backend
 
    Remove-Item -Recurse -Force .venv-1
 

 
> The interactive API docs are available at: **http://127.0.0.1:8000/docs**
 
# 5. Open a second terminal and start the React frontend

    cd Frontend
    npm install
    npm run dev
