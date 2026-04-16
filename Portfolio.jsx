import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Code, Gamepad2, MessageSquare, Send, Github, Linkedin, Terminal,
  Cpu, Sparkles, ChevronRight, Trophy, Clock, AlertCircle, Heart,
  Pause, Play, RotateCcw, FastForward, Zap, Activity, Monitor,
  Tv, Brain, Ghost, Briefcase, Coffee, Skull, UserCheck, Sun,
  Timer, CheckCircle2, Database, Award, TrendingUp, Mail,
  GraduationCap, BriefcaseBusiness, LayoutGrid, ExternalLink,
  Target, Wand2, FileBadge, Presentation, Star, Users, Utensils,
  Waves, Bike, Check, X, Volume2, Mic2, Loader2
} from 'lucide-react';

// --- CONFIG & CONSTANTS ---
const apiKey = ""; 
const TEXT_MODEL = "gemini-2.5-flash-preview-09-2025";
const TTS_MODEL = "gemini-2.5-flash-preview-tts";
const ROUND_TIME = 4; 

const SOCIAL_LINKS = {
  linkedin: "http://linkedin.com/in/meghanakotharu",
  github: "https://github.com/MeghanaKotharu",
  email: "mailto:meghanakotharu1@gmail.com"
};

// Helper to highlight numbers and important phrases in bold (no color)
const HighlightData = ({ text }) => {
  if (!text) return null;
  // Regex to find metrics, percentages, and specific requested phrases
  const parts = text.split(/(zero-violation\scompliance|refinance\sopportunities|\d+%\sapproval\srate|\d+%\saccuracy|\d+%\svalid\stracking\srate|\d+%\sclassification\simprovement|\d+%\sbottlenecks\sreduced|\d+%\sremoval\sdecisions|30%\sTAT|\d+%|\d+\+|\$\d+M\+?|700\+|30\+)/g);
  
  return (
    <span>
      {parts.map((part, i) => {
        const isMatch = part.match(/(zero-violation\scompliance|refinance\sopportunities|\d+%|\d+\+|\$\d+M\+?|700\+|30\+)/);
        return isMatch ? (
          <span key={i} className="font-bold text-zinc-100">{part}</span>
        ) : (
          part
        );
      })}
    </span>
  );
};

const MEGHANA_DATA = {
  name: "Meghana Kotharu",
  role: "Data Analyst",
  location: "Hyderabad, India",
  summary: "Data Analytics Apprentice at Google specializing in transitioning manual workflows into high-accuracy automated systems. Expert in SQL, Python, and Prompt Engineering with a track record of reducing bottlenecks by 70% and achieving 93% accuracy.",
  metrics: [
    { label: "Engineering Bottlenecks Reduced", value: "70%", icon: TrendingUp, color: "text-emerald-500" },
    { label: "System Accuracy Reached", value: "93%", icon: CheckCircle2, color: "text-blue-500" },
    { label: "Classification Improvement", value: "18%", icon: Activity, color: "text-purple-500" }
  ],
  experience: [
    {
      company: "Google",
      role: "Data Analytics Apprentice",
      period: "April 2025 – Present",
      bullets: [
        "Spearheaded Automated Accuracy Monitoring, engineering a dynamic SQL system that improved classification by 18%.",
        "Optimized Privacy Plus (P+) autorater via Prompt Engineering to hit 93% accuracy for suggestions.",
        "Managed global vendor teams for 700+ high-volume escalations (including P0), ensuring strict TAT compliance.",
        "Project Management Volunteer: Orchestrated logistics and handled training sessions with FTEs for 30+ facilitator sessions during T&S Apprentice Bootcamp 2026."
      ]
    },
    {
      company: "Brokers Office",
      role: "Virtual Admin",
      period: "March 2024 – March 2025",
      bullets: [
        "Orchestrated $5M+ monthly international business pipeline through strategic data analysis and client matching.",
        "Identified refinance opportunities by analyzing existing client database that helped in generating more revenue.",
        "Maintained high-volume data pipelines and led a dependable team that consistently surpassed performance SLAs with a 98% approval rate.",
        "Ensured zero-violation compliance through detailed risk profiling and auditing of international financial data."
      ]
    }
  ],
  projects: [
    {
      name: "Automated Quality & Search Removal Systems",
      problem: "Labor-intensive manual auditing and high Engineering (ENG) pushback rates created significant bottlenecks.",
      solution: "Designed an automated framework using SQL and Google Apps Script to identify agent errors and model predictive trends.",
      result: "Impacted 10% of removal decisions, achieved a 70% valid tracking rate, and accelerated Turnaround Time (TAT) by 30%."
    },
    {
      name: "P+ Autorater & Data Pipeline Enhancement",
      problem: "The PSCP 1P assessment was a manual process with fragmented data tracking across disconnected spreadsheets.",
      solution: "Redesigned the autorater logic through systematized Prompt Engineering and Analytical modeling.",
      result: "Maximised system accuracy to 93%, eliminating manual overhead and significantly reducing the error rate."
    }
  ],
  awardsAndAchievements: [
    { type: 'Award', text: "3 Peer Bonuses for active contributions to T&S Sports and xPA cross-functional collaboration." },
    { type: 'Award', text: "Featured Speaker at the T&S Apprentice Townhall." },
    { type: 'Achievement', text: "Participated in the 2025 Apprentice Hackathon." }
  ],
  skills: ["Advanced SQL", "Prompt Engineering", "Quality Analysis", "Python", "Google Sheets", "Excel", "Stakeholder Management", "Vendor Oversight", "Project Management", "Escalation Management"],
  education: [
    { school: "GIET, Rajahmundry", degree: "B.Tech in Computer Science and Engineering", score: "8.75 CGPA", period: "2019 – 2023" },
    { school: "SASI Junior College", degree: "Intermediate (MPC)", score: "9.82 CGPA", period: "2017 – 2019" },
    { school: "SASI English Medium High School", degree: "SSC", score: "9.5 CGPA", period: "2016 – 2017" }
  ],
  certifications: [
    "Google Data Analytics Professional Certificate (Coursera) | Dec 2025"
  ],
  hobbies: [
    { name: "Swimming", icon: Waves, note: "Refreshing laps for mental clarity." },
    { name: "Cooking", icon: Utensils, note: "Experimenting with global flavors." },
    { name: "Marathons", icon: Bike, note: "Running for focus and discipline." }
  ]
};

const SITCOM_DATABASE = {
  'Friends': {
    quotes: [
      { name: 'Ross', quote: "WE WERE ON A BREAK!", color: 'bg-yellow-600' },
      { name: 'Joey', quote: "How you doin'?", color: 'bg-red-500' },
      { name: 'Phoebe', quote: "Smelly cat, smelly cat...", color: 'bg-pink-500' },
      { name: 'Chandler', quote: "Could I BE any more obvious?", color: 'bg-blue-500' },
      { name: 'Rachel', quote: "No uterus, no opinion.", color: 'bg-green-500' },
      { name: 'Monica', quote: "I KNOW!", color: 'bg-purple-500' }
    ],
    cast: ['Ross', 'Joey', 'Phoebe', 'Chandler', 'Rachel', 'Monica', 'Gunther', 'Janice', 'Mike', 'Richard', 'Jack', 'Judy']
  },
  'The Vampire Diaries': {
    quotes: [
      { name: 'Damon', quote: "Hello, brother.", color: 'bg-purple-900' },
      { name: 'Stefan', quote: "I'm a ripper.", color: 'bg-zinc-800' },
      { name: 'Elena', quote: "It's always Elena.", color: 'bg-red-700' },
      { name: 'Klaus', quote: "I am the hybrid.", color: 'bg-amber-900' },
      { name: 'Caroline', quote: "I'm a vampire now.", color: 'bg-pink-400' }
    ],
    cast: ['Damon', 'Stefan', 'Elena', 'Klaus', 'Caroline', 'Bonnie', 'Jeremy', 'Alaric', 'Katherine', 'Enzo', 'Matt', 'Tyler']
  },
  'Modern Family': {
    quotes: [
      { name: 'Phil', quote: "If you love something, set it free.", color: 'bg-orange-500' },
      { name: 'Gloria', quote: "JAY!!!!", color: 'bg-purple-600' },
      { name: 'Jay', quote: "Closets, closets!", color: 'bg-slate-700' },
      { name: 'Cam', quote: "I'm a farm boy.", color: 'bg-blue-400' }
    ],
    cast: ['Phil', 'Gloria', 'Jay', 'Cam', 'Mitchell', 'Claire', 'Haley', 'Alex', 'Luke', 'Manny', 'Lily', 'Stella']
  },
  'HIMYM': {
    quotes: [
      { name: 'Barney', quote: "SUIT UP!", color: 'bg-indigo-500' },
      { name: 'Robin', quote: "But um... but um!", color: 'bg-yellow-400' },
      { name: 'Ted', quote: "I would have stolen you a whole orchestra.", color: 'bg-red-400' }
    ],
    cast: ['Barney', 'Robin', 'Ted', 'Marshall', 'Lily', 'Ranjit', 'Victoria', 'Tracy', 'Quinn', 'Zoey', 'Carl', 'Patrice']
  },
  'The Office': {
    quotes: [
      { name: 'Michael', quote: "I DECLARE BANKRUPTCY!", color: 'bg-blue-600' },
      { name: 'Dwight', quote: "Bears, beets, Battlestar Galactica.", color: 'bg-yellow-600' },
      { name: 'Jim', quote: "Bears eat beets.", color: 'bg-cyan-600' },
      { name: 'Kevin', quote: "Why waste time say lot word?", color: 'bg-amber-800' }
    ],
    cast: ['Michael', 'Dwight', 'Jim', 'Kevin', 'Pam', 'Stanley', 'Angela', 'Oscar', 'Creed', 'Toby', 'Kelly', 'Ryan']
  },
  'Suits': {
    quotes: [
      { name: 'Harvey', quote: "I don't play the odds, I play the man.", color: 'bg-zinc-900' },
      { name: 'Mike', quote: "I remember everything.", color: 'bg-blue-800' }
    ],
    cast: ['Harvey', 'Mike', 'Louis', 'Donna', 'Rachel', 'Jessica', 'Robert', 'Katrina', 'Gretchen', 'Alex', 'Samantha', 'Sheila']
  }
};

const PERSONAL_RECO_DB = [
  { title: "The 100", genre: "Survival / Sci-Fi", note: "Peak survival drama." },
  { title: "Breaking Bad", genre: "Crime / Drama", note: "Masterclass in transformation." },
  { title: "Gilmore Girls", genre: "Feel-good / Comedy", note: "Fast dialogue and vibes." },
  { title: "Emily in Paris", genre: "Romance / Fashion", note: "Beautiful easy watch." }
];

const GLOBAL_CAST_REGISTRY = [...new Set(Object.values(SITCOM_DATABASE).flat().map(c => c.cast).flat())];

// --- GEMINI API UTILITIES ---
const callGeminiAPI = async (prompt, systemInstruction) => {
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TEXT_MODEL}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });
      if (!response.ok) throw new Error();
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (e) {
      if (i === 4) return "Analytical stream disrupted.";
      await new Promise(r => setTimeout(r, delay));
      delay *= 2;
    }
  }
};

const playTTS = async (text) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Say in a professional tone: ${text}` }] }],
        generationConfig: { 
          responseModalities: ["AUDIO"],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Puck" } } }
        }
      })
    });
    const result = await response.json();
    const pcmData = result.candidates[0].content.parts[0].inlineData.data;
    const pcmBuffer = Uint8Array.from(atob(pcmData), c => c.charCodeAt(0));
    const sampleRate = 24000;
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    const writeString = (offset, string) => { for (let i = 0; i < string.length; i++) view.setUint8(offset + i, string.charCodeAt(i)); };
    writeString(0, 'RIFF'); view.setUint32(4, 36 + pcmBuffer.length, true); writeString(8, 'WAVE');
    writeString(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true);
    view.setUint16(34, 16, true); writeString(36, 'data'); view.setUint32(40, pcmBuffer.length, true);
    const blob = new Blob([header, pcmBuffer], { type: 'audio/wav' });
    const audio = new Audio(URL.createObjectURL(blob));
    audio.play();
  } catch (e) { console.error("Audio block failed"); }
};

// --- TALK TO AI ---
const AIChat = () => {
  const [messages, setMessages] = useState([{ 
    role: 'ai', 
    text: "Synthetix active. Query professional background metrics or specific series recommendations. How shall I assist?" 
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const chatEndRef = useRef(null);

  const popQuestions = [
    { label: "Professional Summary", icon: <UserCheck size={14} />, prompt: "Provide an executive summary of Meghana's background, including her specific metrics at Google, refinance database analysis at Brokers Office, and her Production Internship at Prathyusha Garimella." },
    { label: "Show Suggestions", icon: <Tv size={14} />, prompt: "Suggest some series from Meghana's recommended list based on my current mood." }
  ];

  const handleAudioSummary = async () => {
    setAudioLoading(true);
    const summary = "Meghana Kotharu is a Google Data Analytics Apprentice with a 93 percent accuracy rate. She previously managed international production logistics at Prathyusha Garimella and achieved a 98 percent approval rate as a Virtual Admin, where she identified key refinance opportunities.";
    await playTTS(summary);
    setAudioLoading(false);
  };

  const handleSend = async (queryText) => {
    const userMsg = queryText || input.trim();
    if (!userMsg || loading) return;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput(''); setLoading(true);

    const systemInstruction = `You are Synthetix, an advanced AI proxy for MEGHANA KOTHARU, Data Analyst at Google.
    
    STRICT DATA ROUTING RULES:
    1. If user asks about her background/career, ONLY use CAREER data. 
    2. NEVER use markdown bolding (double asterisks).
    3. Use structured bullet points and clear line breaks. No conversational filler.
    4. Refer to data objectively as 'Meghana's role'.
    
    CAREER DATA: 
    - Google: 93% accuracy, 70% reduction in bottlenecks.
    - Brokers Office (Virtual Admin): 98% approval rate, $5M+ monthly pipeline. Identified refinance opportunities via database analysis.
    - Prathyusha Garimella: Production Manager Intern.
    WEBSERIES: ${JSON.stringify(PERSONAL_RECO_DB)}`;

    const aiResponse = await callGeminiAPI(userMsg, systemInstruction);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setLoading(false);
  };

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] overflow-hidden flex flex-col h-[580px] shadow-2xl">
      <div className="p-5 bg-zinc-800/80 backdrop-blur-md border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse mr-3" />
          <h3 className="font-black text-xs text-zinc-100 uppercase tracking-[0.2em]">Talk to AI</h3>
        </div>
        <button onClick={handleAudioSummary} disabled={audioLoading} className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-full text-[10px] font-bold text-white transition-all disabled:opacity-50">
          {audioLoading ? <Loader2 size={12} className="animate-spin" /> : <Volume2 size={12} />} ✨ Audio Brief
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide text-left text-zinc-300">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-5 rounded-3xl text-sm leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'bg-blue-600 text-white shadow-xl' : 'bg-zinc-800 text-zinc-200 border border-zinc-700 shadow-inner'}`}>{m.text}</div>
          </div>
        ))}
        {loading && <div className="flex justify-start"><div className="bg-zinc-800 p-4 rounded-3xl animate-pulse"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /></div></div>}
        <div ref={chatEndRef} />
      </div>
      <div className="p-6 border-t border-zinc-800 bg-zinc-900/90 text-left">
        {messages.length === 1 && (
          <div className="grid grid-cols-1 gap-2 mb-6">
            {popQuestions.map((q, idx) => (
              <button key={idx} onClick={() => handleSend(q.prompt)} className="flex items-center justify-between px-6 py-4 bg-zinc-800/50 hover:bg-zinc-700 border border-zinc-700 rounded-2xl text-[10px] font-black text-zinc-400 hover:text-white transition-all group italic text-left uppercase tracking-widest">
                <span className="flex items-center gap-3">{q.icon} {q.label}</span>
                <ChevronRight size={14} className="group-hover:translate-x-2 transition-transform" />
              </button>
            ))}
          </div>
        )}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Query system data..." className="flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-sm text-zinc-200 outline-none focus:ring-1 focus:ring-blue-500" />
          <button type="submit" className="bg-blue-600 p-4 rounded-2xl hover:bg-blue-500 transition-all shadow-lg"><Send size={20} /></button>
        </form>
      </div>
    </div>
  );
};

// --- OUTLIER GAME ---
const SitcomGame = ({ onTabChange }) => {
  const [gameState, setGameState] = useState('menu'); 
  const [selectedShows, setSelectedShows] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [streak, setStreak] = useState(0);
  const [currentRound, setCurrentRound] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME); 
  const [currentShowIndex, setCurrentShowIndex] = useState(0);
  const [visualFeedback, setVisualFeedback] = useState(null); 
  const [sessionUsedQuotes, setSessionUsedQuotes] = useState([]); 
  const [auditResult, setAuditResult] = useState(null);
  const [auditLoading, setAuditLoading] = useState(false);

  const toggleShow = (showName) => {
    if (selectedShows.includes(showName)) setSelectedShows(selectedShows.filter(s => s !== showName));
    else if (selectedShows.length < 5) setSelectedShows([...selectedShows, showName]);
  };

  const fullReset = () => {
    setScore(0); setLives(3); setStreak(0); setSelectedShows([]);
    setCurrentShowIndex(0); setGameState('menu'); setVisualFeedback(null);
    setSessionUsedQuotes([]); setAuditResult(null);
  };

  const generateRound = (showIndex = currentShowIndex) => {
    const showName = selectedShows[showIndex];
    if (lives <= 0 || !showName) return;
    const showData = SITCOM_DATABASE[showName];
    const uniquePool = showData.quotes.filter(q => !sessionUsedQuotes.includes(q.quote));
    if (uniquePool.length === 0) {
        const nextIdx = (showIndex + 1) % selectedShows.length;
        setCurrentShowIndex(nextIdx); setStreak(0); generateRound(nextIdx);
        return;
    }
    const targetQuoteObj = uniquePool[Math.floor(Math.random() * uniquePool.length)];
    setSessionUsedQuotes(prev => [...prev, targetQuoteObj.quote]);
    let options = [];
    const barColors = ['bg-blue-500', 'bg-red-500', 'bg-emerald-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-orange-500', 'bg-cyan-500', 'bg-zinc-500'];
    const showCast = [...showData.cast].sort(() => 0.5 - Math.random());
    const labels = [targetQuoteObj.name];
    const otherNames = showCast.filter(n => n !== targetQuoteObj.name);
    for(let i=0; i < 9; i++) labels.push(otherNames[i % otherNames.length]);
    const shuffledLabels = labels.sort(() => 0.5 - Math.random());
    for (let i = 0; i < 10; i++) {
      const charName = shuffledLabels[i];
      const isTarget = charName === targetQuoteObj.name;
      let h = 45 + (Math.random() * 15);
      if (isTarget) h = Math.random() > 0.5 ? 66 : 38;
      options.push({ id: i, name: charName, color: barColors[i], isTarget, height: h });
    }
    setCurrentRound({ showName, target: targetQuoteObj, options });
    setTimeLeft(ROUND_TIME); setVisualFeedback(null); setIsPaused(false);
  };

  useEffect(() => {
    let timer;
    if (gameState === 'playing' && !visualFeedback && !isPaused && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 0.1)), 100);
    } else if (timeLeft <= 0 && gameState === 'playing' && !visualFeedback) handleGuess(null);
    return () => clearInterval(timer);
  }, [gameState, visualFeedback, isPaused, timeLeft]);

  const handleGuess = (option) => {
    if (visualFeedback || isPaused || gameState !== 'playing') return;
    if (option && option.isTarget) {
      const newStreak = streak + 1; setScore(s => s + 100 + Math.floor(timeLeft * 30)); setStreak(newStreak); setVisualFeedback('correct');
      setTimeout(() => {
        const remainingPool = SITCOM_DATABASE[selectedShows[currentShowIndex]].quotes.filter(q => !sessionUsedQuotes.includes(q.quote)).length;
        if (newStreak >= 5 || remainingPool === 0) {
          const nextIdx = (currentShowIndex + 1) % selectedShows.length;
          setCurrentShowIndex(nextIdx); setStreak(0); generateRound(nextIdx);
        } else generateRound();
      }, 400); 
    } else {
      const newLives = lives - 1; setLives(newLives); setStreak(0); setVisualFeedback('wrong');
      if (newLives <= 0) setTimeout(() => setGameState('gameOver'), 400);
      else setTimeout(() => generateRound(), 600);
    }
  };

  const performAudit = async () => {
    setAuditLoading(true);
    const system = "You are an Analytical Auditor. Provide a humorous 2-sentence critique. No bolding.";
    const prompt = `User scored ${score}. Audit their accuracy.`;
    const res = await callGeminiAPI(prompt, system);
    setAuditResult(res); setAuditLoading(false);
  };

  if (gameState === 'menu') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-[50px] text-center shadow-2xl">
        <Monitor className="text-blue-500 mx-auto mb-6" size={48} />
        <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-widest text-center">Dataset Ingestion</h2>
        <p className="text-zinc-500 mb-10 max-w-md mx-auto text-sm text-center font-light italic text-center">Select exactly 5 domain sectors to initiate simulation.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto text-center">
          {Object.keys(SITCOM_DATABASE).map(name => {
            const isSelected = selectedShows.includes(name);
            return (
              <button key={name} onClick={() => toggleShow(name)} className={`p-4 rounded-2xl text-[10px] font-black uppercase transition-all border-2 ${isSelected ? 'bg-blue-600 border-blue-400 text-white scale-105 shadow-blue-900/50' : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>
                {name} {isSelected && <Check className="inline-block ml-1" size={10} />}
              </button>
            );
          })}
        </div>
        <div className="mt-12 h-16 flex items-center justify-center">
            {selectedShows.length === 5 ? (
              <button onClick={() => { setScore(0); setLives(3); setStreak(0); setGameState('playing'); generateRound(0); }} className="bg-white text-black font-black py-4 px-16 rounded-2xl uppercase text-sm animate-in zoom-in hover:bg-zinc-200 transition-all shadow-xl tracking-widest italic">Run Analysis</button>
            ) : (
                <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest italic">{5 - selectedShows.length} more sectors required...</span>
            )}
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-[40px] text-center space-y-8 shadow-2xl animate-in zoom-in">
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter text-center">Outlier Threshold Exceeded</h2>
        <div className="bg-zinc-950/80 p-8 rounded-[40px] border border-zinc-800 max-w-lg mx-auto space-y-5">
           <p className="text-zinc-400 italic text-base leading-relaxed text-center font-light text-center">Final Score: {score}. Access Nexus proxy for binge-watch calibration.</p>
           <div className="space-y-4 text-center">
              <button onClick={performAudit} disabled={auditLoading} className="flex items-center gap-3 text-emerald-400 font-black uppercase text-[10px] hover:text-emerald-300 transition-all mx-auto bg-emerald-500/10 px-6 py-3 rounded-full border border-emerald-500/30">
                {auditLoading ? <Loader2 size={14} className="animate-spin" /> : <Mic2 size={14} />} ✨ Analyze My Pattern
              </button>
              {auditResult && <p className="text-zinc-300 text-xs italic bg-zinc-900 p-4 rounded-2xl border border-zinc-800 leading-relaxed animate-in fade-in">{auditResult}</p>}
           </div>
           <button onClick={() => onTabChange('ai')} className="flex items-center gap-3 text-purple-400 font-black uppercase text-[10px] hover:text-purple-300 transition-all mx-auto bg-purple-500/10 px-6 py-3 rounded-full border border-purple-500/30 text-center">Talk to AI <ChevronRight size={14} /></button>
        </div>
        <button onClick={fullReset} className="bg-white text-black font-black py-4 px-12 rounded-xl block mx-auto uppercase text-xs hover:bg-zinc-200 transition-all shadow-xl italic tracking-widest text-center">Re-fetch Dataset</button>
      </div>
    );
  }

  return (
    <div className={`bg-zinc-950 border border-zinc-800 p-6 md:p-10 rounded-[40px] shadow-2xl relative overflow-hidden min-h-[720px] transition-all duration-300 ${visualFeedback === 'correct' ? 'ring-4 ring-emerald-500/20' : visualFeedback === 'wrong' ? 'ring-4 ring-red-500/20' : ''}`}>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-zinc-900 shadow-inner"><div className="h-full bg-blue-500 transition-all duration-100 shadow-[0_0_15px_rgba(59,130,246,0.6)]" style={{ width: `${(streak / 5) * 100}%` }} /></div>
      <div className="flex justify-between items-start mb-12 text-left">
        <div className="space-y-1">
          <div className="flex gap-2.5 mb-4">{[...Array(3)].map((_, i) => <Heart key={i} size={24} className={`${i < lives ? 'text-red-500 fill-red-500' : 'text-zinc-900'}`} />)}</div>
          <h3 className="text-white font-black text-4xl uppercase leading-none tracking-tighter">{currentRound?.showName}</h3>
        </div>
        <div className="bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800 flex items-center gap-8 shadow-inner">
          <button onClick={() => setIsPaused(!isPaused)} className="text-zinc-500 hover:text-white transition-colors">{isPaused ? <Play size={28} /> : <Pause size={28} />}</button>
          <div className="h-2.5 w-40 bg-zinc-800 rounded-full overflow-hidden"><div className={`h-full transition-all linear ${timeLeft < 1.5 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} style={{ width: `${(timeLeft / ROUND_TIME) * 100}%` }} /></div>
          <div className="text-yellow-500 font-bold text-2xl tracking-tighter">{score}</div>
        </div>
      </div>
      <div className="mb-12 text-center min-h-[160px] flex flex-col justify-center px-8 relative z-10 text-center">
        <blockquote className="text-2xl font-light italic font-serif text-zinc-100 leading-relaxed text-center">"{currentRound?.target.quote}"</blockquote>
      </div>
      <div className="flex items-end justify-between gap-2 h-64 group mb-6 relative px-2">
          {currentRound?.options.map((opt) => (
            <button key={opt.id} onClick={() => handleGuess(opt)} disabled={!!visualFeedback || isPaused} className="relative flex flex-col items-center flex-1 h-full justify-end transition-all">
                <div className={`w-full rounded-t-2xl transition-all duration-300 ${opt.color} ${!visualFeedback && !isPaused && 'hover:brightness-125 cursor-pointer shadow-lg'} ${visualFeedback && !opt.isTarget ? 'opacity-20 grayscale' : 'opacity-100'} ${isPaused ? 'blur-2xl' : ''}`} style={{ height: `${opt.height}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <span className={`mt-5 text-[10px] font-black uppercase transition-opacity text-zinc-200 text-center tracking-tighter leading-none`}>{opt.name}</span>
            </button>
          ))}
      </div>
      <div className="h-10 flex items-center justify-center">
         {visualFeedback === 'correct' && <Check size={24} className="text-emerald-500 animate-pulse" />}
         {visualFeedback === 'wrong' && <X size={24} className="text-red-500 animate-pulse" />}
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 px-6 py-2 rounded-full flex items-center gap-6 shadow-2xl">
        {['home', 'game', 'ai'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`font-black text-[9px] uppercase tracking-widest transition-all hover:text-white ${activeTab === t ? 'text-white scale-110' : 'text-zinc-500'}`}>
            {t === 'ai' ? 'Talk to AI' : t === 'game' ? 'The Game' : t}
          </button>
        ))}
      </nav>
      <main className="max-w-7xl mx-auto px-10 pt-24 pb-20">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-700 text-left">
            <section className="flex flex-col lg:flex-row items-center gap-8 py-4 border-b border-zinc-900 pb-8 text-left">
              <div className="flex-1 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest shadow-inner">
                  <Sparkles size={14} /> Open for new opportunities
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-12 lg:gap-24 text-left">
                  <h1 className="text-7xl md:text-[6rem] lg:text-[6.5rem] font-black text-white leading-none tracking-tighter uppercase italic pr-24 text-left text-left">
                    Meghana <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-black text-left text-left">Kotharu</span>
                  </h1>
                  <div className="w-32 md:w-56 lg:w-64 relative group flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-[30px]" />
                    <div className="relative border border-zinc-800 bg-zinc-900 p-1.5 rounded-3xl shadow-xl overflow-hidden aspect-[4/5]">
                      <img 
                        src="https://raw.githubusercontent.com/MeghanaKotharu/MeghanaKotharu/main/WhatsApp%20Image%202026-04-15%20at%209.12.03%20PM.jpeg" 
                        alt="Meghana Kotharu" 
                        className="rounded-2xl w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x500/18181b/ffffff?text=MEGHANA"; }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-base text-zinc-400 max-w-lg font-light leading-relaxed text-left italic text-left">
                  Data Analyst @ <span className="text-blue-400 font-bold underline decoration-blue-500/20 underline-offset-8 text-left text-left text-left">Google</span>. Transforming manual workflows into precision automated ecosystems.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-left">
                  <button onClick={() => setActiveTab('game')} className="bg-white text-black font-bold px-6 py-2.5 rounded-xl hover:bg-zinc-200 transition-all uppercase text-[10px] tracking-widest shadow-xl text-left">
                    Play a Game <ChevronRight size={14} className="inline ml-1" />
                  </button>
                  <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all text-left">
                    LinkedIn <ExternalLink size={12} />
                  </a>
                  <a href={SOCIAL_LINKS.email} className="flex items-center gap-2 px-6 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all text-left">
                    Email <Mail size={12} />
                  </a>
                </div>
              </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {(MEGHANA_DATA.metrics || []).map((m, i) => (
                <div key={i} className="p-8 bg-zinc-900/40 border border-zinc-800 rounded-[32px] flex flex-col items-center text-center space-y-3 hover:border-zinc-700 transition-colors shadow-lg">
                  <div className="p-2.5 bg-white/5 rounded-2xl mb-1 text-center"><m.icon className={m.color} size={24} /></div>
                  <h4 className="text-4xl font-black text-white tracking-tighter text-center">{m.value}</h4>
                  <p className="text-zinc-500 uppercase tracking-widest font-black text-[8px] text-center">{m.label}</p>
                </div>
              ))}
            </section>
            
            <section className="space-y-8 text-left text-left">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 text-left text-left text-left text-left text-left"><LayoutGrid className="text-blue-500" /> Strategic Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                {(MEGHANA_DATA.projects || []).map((p, i) => (
                  <div key={i} className="p-8 bg-zinc-900 border border-zinc-800 rounded-[32px] space-y-5 hover:border-zinc-600 transition-colors shadow-2xl text-left">
                    <h3 className="text-lg font-black text-white italic underline decoration-blue-500 decoration-2 underline-offset-8 text-left text-left">{p.name}</h3>
                    <div className="space-y-5 text-left">
                       <div className="space-y-1.5 text-left text-left text-left">
                          <div className="flex items-center gap-2 text-blue-500 font-black uppercase text-[9px] tracking-widest text-left text-left"><Target size={12}/> Problem</div>
                          <p className="text-zinc-400 font-light text-xs leading-relaxed text-left text-left"><HighlightData text={p.problem}/></p>
                       </div>
                       <div className="space-y-1.5 text-left text-left text-left">
                          <div className="flex items-center gap-2 text-purple-500 font-black uppercase text-[9px] tracking-widest text-left text-left"><Wand2 size={12}/> Solution</div>
                          <p className="text-zinc-400 font-light text-xs leading-relaxed text-left text-left"><HighlightData text={p.solution}/></p>
                       </div>
                       <div className="space-y-1.5 text-left text-zinc-300 text-left text-left">
                          <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[9px] tracking-widest text-left text-left text-left text-left"> Result</div>
                          <p className="font-medium text-xs leading-relaxed text-left text-left text-left text-left"><HighlightData text={p.result}/></p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ALIGNED CREDENTIALS TRACK */}
            <div className="space-y-10 text-left text-left">
                {/* ROW 1: Education | Awards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left text-left text-left">
                   <div className="space-y-8 text-left text-left">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 text-left text-left"><GraduationCap className="text-blue-500" /> Education</h2>
                      <div className="space-y-3 text-left text-left">
                        {(MEGHANA_DATA.education || []).map((edu, i) => (
                          <div key={i} className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl hover:bg-zinc-900 transition-colors shadow-lg text-left text-left">
                            <h3 className="text-sm font-black text-white uppercase tracking-tight text-left text-left">{edu.degree}</h3>
                            <p className="text-zinc-400 text-xs font-medium mt-1 text-left text-left">{edu.school} | {edu.period}</p>
                            <span className="mt-3 inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full font-black text-[8px] uppercase tracking-widest border border-blue-500/20 text-left text-left">{edu.score}</span>
                          </div>
                        ))}
                      </div>
                   </div>
                   <div className="space-y-8 text-left text-left text-left">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 text-left text-left text-left"><Award className="text-yellow-500" /> Awards & Achievements</h2>
                      <div className="space-y-3 text-left text-left">
                        {(MEGHANA_DATA.awardsAndAchievements || []).map((item, i) => (
                          <div key={i} className="flex gap-4 p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl items-center border-l-4 border-l-yellow-500/50 shadow-lg text-left text-zinc-300 text-left">
                             {item.type === 'Award' ? <Trophy className="text-yellow-500 shrink-0" size={16} /> : <Star className="text-purple-500 shrink-0" size={16} />}
                             <p className="text-zinc-400 text-xs font-medium text-left text-left">{item.text}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                {/* ROW 2: Certifications | Skills Matrix (Aligned line) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left text-left">
                   <div className="space-y-8 text-left text-left text-left">
                      <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 text-left text-left text-left text-left"><FileBadge className="text-blue-500" /> Certifications</h2>
                      {(MEGHANA_DATA.certifications || []).map((c, i) => (
                        <div key={i} className="flex gap-4 p-6 bg-zinc-900/40 border border-zinc-800 rounded-3xl items-center border-l-4 border-l-blue-500/50 shadow-lg hover:bg-zinc-900 transition-colors text-left text-zinc-300 text-left">
                            <CheckCircle2 className="text-blue-500 shrink-0" size={24} />
                            <p className="text-zinc-300 text-xs font-medium leading-relaxed italic uppercase tracking-widest text-left text-left">{c}</p>
                        </div>
                      ))}
                   </div>
                   <div className="space-y-8 text-left text-left text-left">
                      <h2 className="text-2xl font-bold text-white uppercase tracking-tight flex items-center gap-3 text-left text-left text-left text-left"><Database className="text-blue-500" /> Skills Matrix</h2>
                      <div className="flex flex-wrap gap-2.5 text-left text-left text-left">
                        {(MEGHANA_DATA.skills || []).map((s, i) => (
                          <span key={i} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl font-black text-[9px] uppercase tracking-widest text-zinc-400 hover:text-white transition-all cursor-default shadow-md text-left text-left text-left text-left">{s}</span>
                        ))}
                      </div>
                   </div>
                </div>
            </div>

            <section className="space-y-8 text-left text-left text-left">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 text-left text-left text-left text-left text-left text-left text-left"><BriefcaseBusiness className="text-blue-500" /> Professional Experience</h2>
                <div className="space-y-8 text-zinc-300 text-left text-left">
                  {(MEGHANA_DATA.experience || []).map((exp, i) => (
                    <div key={i} className="relative pl-8 border-l border-zinc-800 group text-left text-left text-left">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] text-left text-left" />
                      <p className="text-blue-400 font-bold text-[9px] uppercase tracking-widest mb-1 text-left text-left text-left">{exp.period}</p>
                      <h3 className="text-base font-black text-white uppercase italic text-left text-left text-left">{exp.role} @ {exp.company}</h3>
                      <ul className="mt-3 space-y-2 text-left text-left text-left">
                        {(exp.bullets || []).map((b, j) => (
                          <li key={j} className="text-zinc-500 text-xs font-light leading-relaxed flex items-start gap-3 text-left text-left text-left">
                            <div className="w-1 h-1 bg-zinc-800 rounded-full mt-1.5 shrink-0 group-hover:bg-blue-500 transition-colors" /> <HighlightData text={b} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
            </section>

            <section className="space-y-8 text-left pb-10 text-zinc-300 text-left text-left">
              <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3 text-left text-left text-left text-left text-left"><Heart className="text-red-500" /> Beyond the Data</h2>
              <div className="bg-zinc-950/50 p-8 rounded-[40px] border border-zinc-800 relative overflow-hidden group text-left text-left text-left">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity text-left text-left text-left text-left"><Users size={120}/></div>
                <p className="text-lg text-zinc-300 italic mb-8 max-w-xl font-light text-left leading-relaxed text-left text-left text-left">"This is not it. There is a lot more to me than my work."</p>
                <div className="grid grid-cols-3 gap-6 text-left text-left">
                  {(MEGHANA_DATA.hobbies || []).map((hobby, i) => (
                    <div key={i} className="p-4 bg-zinc-900/40 border border-zinc-800 rounded-2xl flex flex-col items-center text-center space-y-3 hover:border-blue-500/30 transition-all shadow-lg text-center text-left">
                       <div className="p-2 bg-blue-500/10 rounded-xl text-center text-left text-left"><hobby.icon className="text-blue-400 text-center text-left" size={20} /></div>
                       <h4 className="text-xs font-bold text-white uppercase tracking-widest text-center text-center text-center text-center text-center">{hobby.name}</h4>
                       <p className="text-zinc-500 text-[9px] font-light text-center text-center text-center text-center text-center">{hobby.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
        {activeTab === 'game' && <div className="max-w-6xl mx-auto"><SitcomGame onTabChange={setActiveTab} /></div>}
        {activeTab === 'ai' && (
          <div className="animate-in fade-in duration-700 max-w-4xl mx-auto space-y-16 text-center py-10 text-zinc-300 text-center text-center">
            <div className="space-y-4 text-center text-center">
              <h1 className="text-7xl font-black text-white italic uppercase tracking-tighter leading-none text-center text-center text-center text-center">Talk to AI</h1>
              <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto italic leading-relaxed text-center uppercase tracking-widest text-center text-center text-center text-center">Query professional metrics or discover recommendations from Meghana's curated database.</p>
            </div>
            <AIChat />
          </div>
        )}
      </main>
      <footer className="border-t border-zinc-900 py-12 px-10 text-left text-zinc-300 text-left">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 text-left text-left">
          <div className="flex items-center gap-4 font-black text-2xl text-white italic tracking-widest uppercase text-left text-left text-left">
             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg shadow-blue-900/20 text-left text-left text-left text-left" />
             MEGHANA_ANALYSIS
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-left text-left">
             <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-all text-left text-left text-left text-left text-left">LinkedIn</a>
             <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="hover:text-white transition-all text-left text-left text-left text-left text-left text-left">GitHub</a>
             <a href={SOCIAL_LINKS.email} className="hover:text-white transition-all text-left text-left text-left text-left text-left text-left">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
