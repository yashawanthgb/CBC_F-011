# CBC_F-011
# AltCtrlWin Project

#All Files are Deployed in Master Branch
## Implementation Details

### Tools and Libraries Used

#### Backend
- Python 3.x
  - requests: For making HTTP requests to external APIs
  - python-dateutil: For date and time manipulation
- Node.js/TypeScript
  - Next.js: For the frontend application
  - Prisma: For database management
  - GraphQL: For API queries

#### Rationale for Tool Choices
1. **Next.js**: Chosen for its server-side rendering capabilities, excellent developer experience, and built-in routing system.
2. **Prisma**: Selected for its type-safe database queries and excellent TypeScript integration.
3. **GraphQL**: Implemented for efficient data fetching and to reduce over-fetching of data.
4. **Python**: Used for specific backend services where Python's ecosystem provides better tools for the task.

## Build and Test Instructions

### Prerequisites
- Node.js (version specified in .nvmrc)
- Python 3.x
- npm or yarn

### Installation Steps
1. Clone the repository
```bash
git clone [repository-url]
cd AltCtrlWin
```

2. Install Python dependencies
```bash
pip install -r requirements.txt
```

3. Install Node.js dependencies
```bash
cd Proj/Ai_ChatBot
npm install
```

4. Set up environment variables
- Copy `.envrc` to `.env` and fill in the required values

### Running the Application
1. Start the Python backend services
```bash
python Proj/skycheck.py
```

2. Start the Next.js development server
```bash
cd Proj/Ai_ChatBot
npm run dev
```

## Comparison Report

### State-of-the-Art Tools Comparison

| Tool/Feature | Accuracy | Speed | Notes |
|-------------|----------|-------|-------|
| [Tool 1]    | [Score]  | [Time]| [Details] |
| [Tool 2]    | [Score]  | [Time]| [Details] |
| [Tool 3]    | [Score]  | [Time]| [Details] |

[Add detailed comparison metrics and analysis here] 
