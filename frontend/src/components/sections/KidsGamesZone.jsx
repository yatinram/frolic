import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Tabs, notification, Slider, message } from 'antd';
import { ReloadOutlined, SaveOutlined, ClearOutlined, TrophyFilled } from '@ant-design/icons';
import SectionHeading from '../common/SectionHeading';
import Button from '../common/Button';
import confetti from 'canvas-confetti';

// ======================= GAME 1: Alphabet Adventure =======================
const WORDS_BANK = [
  { word: 'CAT', emoji: '🐱', hint: 'A friendly feline pet' },
  { word: 'SUN', emoji: '☀️', hint: 'Shines bright in the sky' },
  { word: 'DOG', emoji: '🐶', hint: 'Man’s best friend' },
  { word: 'STAR', emoji: '⭐', hint: 'Twinkles in the night' },
  { word: 'TREE', emoji: '🌳', hint: 'Gives us fresh shade and fruit' },
  { word: 'BOOK', emoji: '📚', hint: 'Full of wonderful stories' },
  { word: 'FISH', emoji: '🐠', hint: 'Swims in the water' },
  { word: 'BIRD', emoji: '🐦', hint: 'Sings on the tree branches' },
];

const LETTER_COLORS = ['#E8453C', '#F5821F', '#FDB913', '#4CAF3D', '#2E9BD6', '#7B2D8B'];

function AlphabetGame() {
  const [currentWord, setCurrentWord] = useState(null);
  const [shuffled, setShuffled] = useState([]);
  const [typed, setTyped] = useState([]);
  const [score, setScore] = useState(0);

  const pickWord = useCallback(() => {
    const w = WORDS_BANK[Math.floor(Math.random() * WORDS_BANK.length)];
    const letters = w.word.split('');
    const sh = [...letters].sort(() => Math.random() - 0.5);
    setCurrentWord(w);
    setShuffled(sh);
    setTyped([]);
  }, []);

  useEffect(() => {
    pickWord();
  }, [pickWord]);

  const handleLetterClick = (letter, idx) => {
    const nextTyped = [...typed, letter];
    const newShuffled = shuffled.filter((_, i) => i !== idx);
    setTyped(nextTyped);
    setShuffled(newShuffled);

    if (nextTyped.join('') === currentWord.word) {
      setScore((s) => s + 10);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      notification.success({
        message: '🎉 Fantastic Job!',
        description: `You spelled "${currentWord.word}" perfectly! +10 Points`,
        placement: 'topRight',
        duration: 2,
      });
      setTimeout(pickWord, 1800);
    } else if (nextTyped.length === currentWord.word.length) {
      notification.warning({
        message: '😅 Almost There!',
        description: 'Try again with the letters!',
        placement: 'topRight',
        duration: 1.5,
      });
      setTimeout(pickWord, 1500);
    }
  };

  if (!currentWord) return null;

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF8EF', border: '1.5px solid #F5821F', padding: '6px 16px', borderRadius: 50, fontWeight: 800, color: '#F5821F', marginBottom: 14 }}>
        <TrophyFilled style={{ color: '#FDB913' }} /> Score: {score}
      </div>

      <div style={{ fontSize: '4.5rem', lineHeight: 1, margin: '10px 0', animation: 'floatSlow 4s ease-in-out infinite' }}>
        {currentWord.emoji}
      </div>

      <div style={{ fontSize: '0.85rem', color: '#777777', fontWeight: 700, marginBottom: 8 }}>
        Hint: {currentWord.hint}
      </div>

      {/* Target Word Display */}
      <div
        style={{
          fontFamily: "'Fredoka', cursive",
          fontSize: '2.4rem',
          letterSpacing: 10,
          color: '#F5821F',
          minHeight: 56,
          padding: 8,
          borderBottom: '3px dashed #FDB913',
          display: 'inline-block',
          marginBottom: 16,
        }}
      >
        {currentWord.word.split('').map((_, i) => (
          <span key={i} style={{ margin: '0 4px', color: typed[i] ? '#4CAF3D' : '#D0D0D0' }}>
            {typed[i] || '_'}
          </span>
        ))}
      </div>

      {/* Clickable Letter Badges */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', margin: '16px 0' }}>
        {shuffled.map((l, idx) => (
          <button
            key={idx}
            onClick={() => handleLetterClick(l, idx)}
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: LETTER_COLORS[idx % LETTER_COLORS.length],
              color: '#FFFFFF',
              border: 'none',
              fontFamily: "'Fredoka', cursive",
              fontSize: '1.5rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 6px 18px ${LETTER_COLORS[idx % LETTER_COLORS.length]}55`,
              transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
            }}
          >
            {l}
          </button>
        ))}
      </div>

      <Button variant="outline" size="small" icon={<ReloadOutlined />} onClick={pickWord} style={{ marginTop: 8 }}>
        Skip Word
      </Button>
    </div>
  );
}

// ======================= GAME 2: Little Picasso Canvas =======================
const CANVAS_PALETTE = ['#E8453C', '#F5821F', '#FDB913', '#4CAF3D', '#2E9BD6', '#7B2D8B', '#000000', '#FFFFFF'];

function PicassoGame() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#F5821F');
  const [brushWidth, setBrushWidth] = useState(8);
  const lastPos = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches && e.touches[0]) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e) => {
    setIsDrawing(true);
    lastPos.current = getCoordinates(e);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const currentPos = getCoordinates(e);

    ctx.beginPath();
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos.current = currentPos;
  };

  const endDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveArtwork = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'frolic-little-picasso.png';
    link.href = canvas.toDataURL();
    link.click();
    message.success('🎨 Artwork saved to your downloads!');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Palette Selection */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 12 }}>
        {CANVAS_PALETTE.map((c, i) => (
          <div
            key={i}
            onClick={() => setSelectedColor(c)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: c,
              cursor: 'pointer',
              border: selectedColor === c ? '3.5px solid #222222' : '2px solid #EAEAEA',
              transform: selectedColor === c ? 'scale(1.2)' : 'scale(1)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Brush Size:</span>
        <Slider
          min={2}
          max={36}
          value={brushWidth}
          onChange={setBrushWidth}
          style={{ width: 140 }}
        />
      </div>

      {/* Canvas Area */}
      <div
        style={{
          display: 'inline-block',
          border: '3px solid #F5821F',
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(245, 130, 31, 0.2)',
          background: '#FFFFFF',
          touchAction: 'none',
        }}
      >
        <canvas
          ref={canvasRef}
          width={380}
          height={240}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
          style={{ display: 'block', cursor: 'crosshair', maxWidth: '100%' }}
        />
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 14 }}>
        <Button variant="outline" size="small" icon={<ClearOutlined />} onClick={clearCanvas}>
          Clear Pad
        </Button>
        <Button variant="secondary" size="small" icon={<SaveOutlined />} onClick={saveArtwork}>
          Save My Painting 💾
        </Button>
      </div>
    </div>
  );
}

// ======================= GAME 3: Magic Maths =======================
function MathsGame() {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(null);

  const generateProblem = useCallback(() => {
    const a = Math.floor(Math.random() * 8) + 1;
    const b = Math.floor(Math.random() * 8) + 1;
    const ans = a + b;

    const wrongs = new Set([ans]);
    while (wrongs.size < 3) {
      const offset = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
      const val = ans + offset;
      if (val > 0) wrongs.add(val);
    }
    const shuffledOpts = [...wrongs].sort(() => Math.random() - 0.5);

    setQuestion({ a, b, ans });
    setOptions(shuffledOpts);
    setAnswered(null);
  }, []);

  useEffect(() => {
    generateProblem();
  }, [generateProblem]);

  const handleChoice = (val) => {
    if (answered !== null) return;
    setAnswered(val);
    if (val === question.ans) {
      setScore((s) => s + 10);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      message.success('🌟 Brilliant! +10 Points');
    } else {
      message.warning(`Oops! The right answer is ${question.ans}`);
    }
    setTimeout(generateProblem, 1600);
  };

  if (!question) return null;

  return (
    <div style={{ textAlign: 'center', padding: '10px 0' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#FFF8EF', border: '1.5px solid #4CAF3D', padding: '6px 16px', borderRadius: 50, fontWeight: 800, color: '#4CAF3D', marginBottom: 14 }}>
        <TrophyFilled style={{ color: '#FDB913' }} /> Score: {score}
      </div>

      <div style={{ fontFamily: "'Fredoka', cursive", fontSize: '3rem', color: '#2E9BD6', margin: '12px 0' }}>
        {question.a} + {question.b} = ?
      </div>

      {/* Visual Bead Representation */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: question.a }).map((_, i) => (
            <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: '#F5821F', boxShadow: '0 2px 6px #F5821F66' }} />
          ))}
        </div>
        <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#4CAF3D' }}>+</span>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: question.b }).map((_, i) => (
            <div key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: '#4CAF3D', boxShadow: '0 2px 6px #4CAF3D66' }} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        {options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleChoice(opt)}
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: answered === null
                ? LETTER_COLORS[i]
                : opt === question.ans
                ? '#4CAF3D'
                : answered === opt
                ? '#E8453C'
                : '#D0D0D0',
              color: '#FFFFFF',
              border: 'none',
              fontFamily: "'Fredoka', cursive",
              fontSize: '1.8rem',
              fontWeight: 800,
              cursor: answered === null ? 'pointer' : 'default',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              transform: answered === opt ? 'scale(1.15)' : 'scale(1)',
              transition: 'all 0.2s ease',
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// ======================= MAIN KIDS FUN ZONE =======================
export default function KidsGamesZone() {
  const tabs = [
    {
      key: '1',
      label: <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>🔤 Alphabet Adventure</span>,
      children: <AlphabetGame />,
    },
    {
      key: '2',
      label: <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>🎨 Little Picasso</span>,
      children: <PicassoGame />,
    },
    {
      key: '3',
      label: <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>🔢 Magic Maths</span>,
      children: <MathsGame />,
    },
  ];

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(135deg, #FFF0DE 0%, #FFF8EF 100%)' }}>
      <div className="container">
        <SectionHeading
          eyebrow="Gamified Learning Experience"
          title="Interactive"
          highlight="Kids Fun & Lab Zone"
          subtitle="Learning happens naturally through play! Try our 3 interactive digital activities designed for little learners."
          theme="orange"
        />

        <div
          style={{
            maxWidth: 620,
            margin: '0 auto',
            background: '#FFFFFF',
            borderRadius: 32,
            padding: '28px 24px',
            border: '2px solid rgba(245, 130, 31, 0.2)',
            boxShadow: '0 20px 60px rgba(245, 130, 31, 0.15)',
          }}
        >
          <Tabs items={tabs} centered size="large" />
        </div>
      </div>
    </section>
  );
}
