import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  PlayCircleOutlined,
  SoundOutlined,
  BookOutlined,
  CalculatorOutlined,
  CloseOutlined,
  CheckCircleOutlined,
  CheckCircleFilled,
  StarOutlined,
  StarFilled,
  ReloadOutlined,
  HomeOutlined,
  ArrowRightOutlined,
  TrophyOutlined,
  SmileOutlined,
  EditOutlined,
  PictureOutlined,
  HighlightOutlined,
  DeleteOutlined,
  DownloadOutlined,
  HeartFilled,
  CheckOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import s from './KidsGamesPage.module.scss';

// ─── ALPHABET DATA (GAME 1) ───────────────────────────────────────────────────
const ALPHABET_DATA = [
  { letter: 'A', word: 'Apple', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80', color: '#EF4444', hint: 'Sweet red fruit' },
  { letter: 'B', word: 'Ball', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&auto=format&fit=crop&q=80', color: '#3B82F6', hint: 'Playful sports ball' },
  { letter: 'C', word: 'Cat', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80', color: '#F59E0B', hint: 'Friendly pet kitty' },
  { letter: 'D', word: 'Dog', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80', color: '#8B5CF6', hint: 'Loyal puppy friend' },
  { letter: 'E', word: 'Elephant', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400&auto=format&fit=crop&q=80', color: '#10B981', hint: 'Gentle giant animal' },
  { letter: 'F', word: 'Fish', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&auto=format&fit=crop&q=80', color: '#06B6D4', hint: 'Swims in the water' },
  { letter: 'G', word: 'Grapes', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&auto=format&fit=crop&q=80', color: '#9333EA', hint: 'Sweet juicy berries' },
  { letter: 'H', word: 'Hat', image: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=400&auto=format&fit=crop&q=80', color: '#EC4899', hint: 'Worn on the head' },
  { letter: 'I', word: 'Ice Cream', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&auto=format&fit=crop&q=80', color: '#F43F5E', hint: 'Delicious frozen treat' },
  { letter: 'J', word: 'Jar', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop&q=80', color: '#F97316', hint: 'Container for cookies' },
  { letter: 'K', word: 'Kite', image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=400&auto=format&fit=crop&q=80', color: '#14B8A6', hint: 'Flies high in the sky' },
  { letter: 'L', word: 'Lion', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&auto=format&fit=crop&q=80', color: '#EAB308', hint: 'King of the jungle' },
  { letter: 'M', word: 'Mango', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80', color: '#FB923C', hint: 'King of all fruits' },
  { letter: 'N', word: 'Nest', image: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=400&auto=format&fit=crop&q=80', color: '#84CC16', hint: 'Cozy home for birds' },
  { letter: 'O', word: 'Orange', image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop&q=80', color: '#F97316', hint: 'Juicy citrus fruit' },
  { letter: 'P', word: 'Penguin', image: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=400&auto=format&fit=crop&q=80', color: '#0284C7', hint: 'Waddles on ice' },
  { letter: 'Q', word: 'Queen', image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80', color: '#A855F7', hint: 'Royal monarch' },
  { letter: 'R', word: 'Rabbit', image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&auto=format&fit=crop&q=80', color: '#F472B6', hint: 'Cute hopping bunny' },
  { letter: 'S', word: 'Sun', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', color: '#EAB308', hint: 'Bright shining star' },
  { letter: 'T', word: 'Tiger', image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=400&auto=format&fit=crop&q=80', color: '#F97316', hint: 'Striped brave cat' },
  { letter: 'U', word: 'Umbrella', image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&auto=format&fit=crop&q=80', color: '#6366F1', hint: 'Keeps us dry in rain' },
  { letter: 'V', word: 'Violin', image: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=400&auto=format&fit=crop&q=80', color: '#D97706', hint: 'Musical string instrument' },
  { letter: 'W', word: 'Whale', image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=400&auto=format&fit=crop&q=80', color: '#0EA5E9', hint: 'Magnificent ocean giant' },
  { letter: 'X', word: 'Xylophone', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&auto=format&fit=crop&q=80', color: '#10B981', hint: 'Colorful musical bars' },
  { letter: 'Y', word: 'Yo-Yo', image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400&auto=format&fit=crop&q=80', color: '#EC4899', hint: 'Fun spinning toy' },
  { letter: 'Z', word: 'Zebra', image: 'https://images.unsplash.com/photo-1501705388883-4ed8a543392c?w=400&auto=format&fit=crop&q=80', color: '#1E293B', hint: 'Black and white stripes' },
];

// ─── SPELLING DATA (GAME 3) ───────────────────────────────────────────────────
const SPELLING_DATA = [
  { id: 1, word: 'CAT', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80', hint: 'Friendly pet animal' },
  { id: 2, word: 'DOG', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop&q=80', hint: 'Loyal puppy friend' },
  { id: 3, word: 'SUN', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', hint: 'Bright shining star in the sky' },
  { id: 4, word: 'BALL', image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=400&auto=format&fit=crop&q=80', hint: 'Bouncy round toy to play' },
  { id: 5, word: 'FISH', image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&auto=format&fit=crop&q=80', hint: 'Swims happily in water' },
  { id: 6, word: 'LION', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&auto=format&fit=crop&q=80', hint: 'The brave king of the jungle' },
  { id: 7, word: 'APPLE', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&auto=format&fit=crop&q=80', hint: 'Healthy sweet red fruit' },
  { id: 8, word: 'STAR', image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80', hint: 'Twinkles in the night sky' },
  { id: 9, word: 'DUCK', image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&auto=format&fit=crop&q=80', hint: 'Quack quack water bird' },
  { id: 10, word: 'MANGO', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&auto=format&fit=crop&q=80', hint: 'King of all delicious fruits' },
];

// ─── TRACING DATA (GAME 4) ────────────────────────────────────────────────────
const TRACING_ITEMS = [
  { id: 'A', type: 'letter', display: 'A', label: 'Letter A', hint: 'Trace the letter A' },
  { id: 'B', type: 'letter', display: 'B', label: 'Letter B', hint: 'Trace the letter B' },
  { id: 'C', type: 'letter', display: 'C', label: 'Letter C', hint: 'Trace the letter C' },
  { id: '1', type: 'number', display: '1', label: 'Number 1', hint: 'Trace the number 1' },
  { id: '2', type: 'number', display: '2', label: 'Number 2', hint: 'Trace the number 2' },
  { id: '3', type: 'number', display: '3', label: 'Number 3', hint: 'Trace the number 3' },
  { id: 'STAR', type: 'shape', display: '★', label: 'Star Shape', hint: 'Trace the shiny star' },
  { id: 'HEART', type: 'shape', display: '♥', label: 'Heart Shape', hint: 'Trace the sweet heart' },
];

// ─── SPEECH SYNTHESIS ENGINE ───────────────────────────────────────────────────
function getPreferredVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira'))) ||
    voices.find((v) => v.lang.startsWith('en')) ||
    null
  );
}

function speakVoice(text, { rate = 0.85, pitch = 1.1, onEnd = () => {} } = {}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  utterance.pitch = pitch;
  const voice = getPreferredVoice();
  if (voice) utterance.voice = voice;
  utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

// ─── MATH QUESTION GENERATOR (GAME 2) ──────────────────────────────────────────
function generateMathQuestion() {
  const isAddition = Math.random() > 0.4;
  let n1, n2, answer, operator;
  if (isAddition) {
    n1 = Math.floor(Math.random() * 8) + 1;
    n2 = Math.floor(Math.random() * 7) + 1;
    answer = n1 + n2;
    operator = '+';
  } else {
    n1 = Math.floor(Math.random() * 9) + 2;
    n2 = Math.floor(Math.random() * (n1 - 1)) + 1;
    answer = n1 - n2;
    operator = '−';
  }
  // Generate 2 distinct wrong options that are strictly unique and positive (> 0)
  const optionsSet = new Set([answer]);
  const offsets = [-2, -1, 1, 2, 3].sort(() => Math.random() - 0.5);

  for (const offset of offsets) {
    if (optionsSet.size >= 3) break;
    const candidate = answer + offset;
    if (candidate > 0 && !optionsSet.has(candidate)) {
      optionsSet.add(candidate);
    }
  }

  let fallback = 1;
  while (optionsSet.size < 3) {
    if (!optionsSet.has(fallback)) {
      optionsSet.add(fallback);
    }
    fallback++;
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);
  return { n1, n2, operator, answer, options };
}

const TOTAL_QUESTIONS = 10;

// ════════════════════════════════════════════════════════════════════════════════
// ─── 1. TALKING ABCD PHONICS GAME WITH DISPLAY CARD & OBJECT IMAGES ───────────
// ════════════════════════════════════════════════════════════════════════════════
function ABCVoiceGame({ onQuit }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [visitedLetters, setVisitedLetters] = useState(new Set([0]));
  const [isComplete, setIsComplete] = useState(false);

  const playLetterVoice = useCallback((index) => {
    const item = ALPHABET_DATA[index];
    setSelectedIndex(index);
    setIsSpeaking(true);

    setVisitedLetters((prev) => {
      const next = new Set(prev);
      next.add(index);
      if (next.size === ALPHABET_DATA.length) {
        setTimeout(() => {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          setIsComplete(true);
        }, 1200);
      }
      return next;
    });

    speakVoice(item.letter, {
      rate: 0.8,
      pitch: 1.15,
      onEnd: () => {
        speakVoice(`${item.letter} is for ${item.word}`, {
          rate: 0.85,
          pitch: 1.05,
          onEnd: () => setIsSpeaking(false),
        });
      },
    });
  }, []);

  useEffect(() => {
    playLetterVoice(0);
  }, [playLetterVoice]);

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    setSelectedIndex(0);
    setIsSpeaking(false);
    setVisitedLetters(new Set([0]));
    setIsComplete(false);
    playLetterVoice(0);
  };

  const selectedItem = ALPHABET_DATA[selectedIndex] || ALPHABET_DATA[0];

  if (isComplete) {
    return (
      <div className={s.gameOverlay}>
        <div className={s.gameHeader}>
          <div className={s.gameHeader__title}>
            <BookOutlined /> <span>ABC Voice Adventure</span>
          </div>
          <div className={s.gameHeader__progress}>
            {visitedLetters.size} / {ALPHABET_DATA.length} Letters Learned
          </div>
          <button className={s.gameHeader__quit} onClick={onQuit} aria-label="Quit game (Esc)">
            <CloseOutlined /> Quit (Esc)
          </button>
        </div>

        <div className={s.completionScreen}>
          <div className={s.completionScreen__trophy}>
            <TrophyOutlined />
          </div>
          <h2 className={s.completionScreen__title}>Super Star! 🎉</h2>
          <p className={s.completionScreen__subtitle}>
            You explored all 26 letters from A to Z! Outstanding alphabet master!
          </p>
          <div className={s.completionScreen__actions}>
            <button className={s.completionBtn} onClick={handleReset}>
              <ReloadOutlined /> Play Again
            </button>
            <button className={`${s.completionBtn} ${s['completionBtn--secondary']}`} onClick={onQuit}>
              <HomeOutlined /> Back to Games (Esc)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.gameOverlay}>
      <div className={s.gameHeader}>
        <div className={s.gameHeader__title}>
          <BookOutlined /> <span>ABC Voice Adventure</span>
        </div>
        <div className={s.gameHeader__progress}>
          <span className={s.gameHeader__progressDot} />
          {visitedLetters.size} / {ALPHABET_DATA.length} Letters Explored
        </div>
        <button className={s.gameHeader__quit} onClick={onQuit} aria-label="Quit game (Esc)">
          <CloseOutlined /> Quit (Esc)
        </button>
      </div>

      <div className={s.gameContent}>
        <div className={s.abcDisplayCard}>
          <div className="row g-4 align-items-center justify-content-center">
            <div className="col-md-5 text-center">
              <div
                className={`${s.abcDisplayCard__letter} ${isSpeaking ? s['abcDisplayCard__letter--speaking'] : ''}`}
                style={{
                  backgroundColor: selectedItem.color,
                  boxShadow: `0 16px 36px ${selectedItem.color}40`,
                }}
              >
                {selectedItem.letter}
              </div>

              <div className={s.abcDisplayCard__wordBox}>
                <h2 className={s.abcDisplayCard__wordTitle}>
                  {selectedItem.letter} is for <span style={{ color: selectedItem.color }}>{selectedItem.word}</span>
                </h2>
                <p className={s.abcDisplayCard__hint}>{selectedItem.hint}</p>
                
                <button
                  className={s.abcDisplayCard__replayBtn}
                  onClick={() => playLetterVoice(selectedIndex)}
                  aria-label="Listen Again"
                >
                  <SoundOutlined /> Listen Again
                </button>
              </div>
            </div>

            <div className="col-md-5 text-center">
              <div className={s.abcDisplayCard__imageFrame}>
                <img
                  src={selectedItem.image}
                  alt={`${selectedItem.word} for letter ${selectedItem.letter}`}
                  className={s.abcDisplayCard__image}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className={s.abcDisplayCard__imageBadge} style={{ backgroundColor: selectedItem.color }}>
                  {selectedItem.word}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={s.abcGridWrapper}>
          <p className={s.abcGridPrompt}>
            <SmileOutlined /> Tap any letter to hear the voice and see the picture:
          </p>
          <div className={s.abcGrid}>
            {ALPHABET_DATA.map((item, index) => {
              const isSelected = selectedIndex === index;
              const isVisited = visitedLetters.has(index);
              return (
                <button
                  key={item.letter}
                  className={`
                    ${s.abcGrid__btn}
                    ${isSelected ? s['abcGrid__btn--selected'] : ''}
                    ${isVisited ? s['abcGrid__btn--visited'] : ''}
                  `}
                  style={isSelected ? { borderColor: item.color, color: item.color, background: `${item.color}15` } : {}}
                  onClick={() => playLetterVoice(index)}
                  aria-label={`Letter ${item.letter}, ${item.word}`}
                >
                  <span className={s.abcGrid__letterText}>{item.letter}</span>
                  {isVisited && (
                    <span className={s.abcGrid__check}>
                      <CheckCircleFilled style={{ color: '#16a34a' }} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ─── 2. MAGIC MATHEMATICS GAME (WITH "VERY GOOD!" VOICE & CONFETTI) ─────────────
// ════════════════════════════════════════════════════════════════════════════════
function MathFunGame({ onQuit }) {
  const [questions, setQuestions] = useState(() =>
    Array.from({ length: TOTAL_QUESTIONS }, generateMathQuestion)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [answerState, setAnswerState] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = questions[currentIdx] || questions[0];

  const handleAnswer = (opt) => {
    if (isAnswerLocked) return;
    setSelectedAnswer(opt);
    setIsAnswerLocked(true);

    if (opt === currentQ.answer) {
      setAnswerState('correct');
      setScore((prev) => prev + 1);
      
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      speakVoice('Very good! Excellent!', { rate: 0.9, pitch: 1.2 });

      setTimeout(() => {
        if (currentIdx + 1 >= TOTAL_QUESTIONS) {
          setIsComplete(true);
        } else {
          setCurrentIdx((prev) => prev + 1);
          setSelectedAnswer(null);
          setIsAnswerLocked(false);
          setAnswerState(null);
        }
      }, 1400);
    } else {
      setAnswerState('wrong');
      speakVoice('Try again!', { rate: 0.85, pitch: 1.0 });
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsAnswerLocked(false);
        setAnswerState(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    setQuestions(Array.from({ length: TOTAL_QUESTIONS }, generateMathQuestion));
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
    setScore(0);
    setAnswerState(null);
    setIsComplete(false);
  };

  if (isComplete) {
    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div className={s.gameOverlay}>
        <div className={s.gameHeader}>
          <div className={s.gameHeader__title}>
            <CalculatorOutlined /> <span>Magic Maths Challenge</span>
          </div>
          <div className={s.gameHeader__progress}>
            {TOTAL_QUESTIONS} / {TOTAL_QUESTIONS} Questions Completed
          </div>
          <button className={s.gameHeader__quit} onClick={onQuit} aria-label="Quit game (Esc)">
            <CloseOutlined /> Quit (Esc)
          </button>
        </div>

        <div className={s.completionScreen}>
          <div className={`${s.completionScreen__trophy} ${s['completionScreen__trophy--math']}`}>
            <TrophyOutlined />
          </div>
          <h2 className={s.completionScreen__title}>Fantastic Maths Champ! 🏆</h2>
          <div className={s.completionScreen__score}>
            <span className={s.completionScreen__scoreNum}>{score}</span>
            <span className={s.completionScreen__scoreTotal}>/ {TOTAL_QUESTIONS}</span>
          </div>
          <p className={s.completionScreen__subtitle}>
            You scored {score} out of {TOTAL_QUESTIONS} ({percentage}%)!
            {score >= 8
              ? ' You are a certified Little Mathematician!'
              : score >= 5
              ? ' Great problem solving skills!'
              : ' Keep practicing and having fun!'}
          </p>
          <div className={s.completionScreen__actions}>
            <button className={s.completionBtn} onClick={handleReset}>
              <ReloadOutlined /> Play Again
            </button>
            <button className={`${s.completionBtn} ${s['completionBtn--secondary']}`} onClick={onQuit}>
              <HomeOutlined /> Back to Games (Esc)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.gameOverlay}>
      <div className={s.gameHeader}>
        <div className={s.gameHeader__title}>
          <CalculatorOutlined /> <span>Magic Maths Challenge</span>
        </div>
        <div className={s.gameHeader__progress}>
          Question {currentIdx + 1} / {TOTAL_QUESTIONS}&nbsp;|&nbsp;Score: {score} ⭐
        </div>
        <button className={s.gameHeader__quit} onClick={onQuit} aria-label="Quit game (Esc)">
          <CloseOutlined /> Quit (Esc)
        </button>
      </div>

      <div className={s.gameContent}>
        <div className={s.mathGameCard}>
          <div className={s.mathGameCard__progressBar}>
            <div
              className={s.mathGameCard__progressFill}
              style={{ width: `${((currentIdx + 1) / TOTAL_QUESTIONS) * 100}%` }}
            />
          </div>

          <div className={s.mathGameCard__visualCount}>
            <div className={s.mathGameCard__starGroup}>
              {Array.from({ length: currentQ.n1 }).map((_, idx) => (
                <StarFilled key={idx} className={s.starIcon} style={{ color: '#F59E0B' }} />
              ))}
            </div>
            <span className={s.mathGameCard__operatorSymbol}>{currentQ.operator}</span>
            <div className={s.mathGameCard__starGroup}>
              {Array.from({ length: currentQ.n2 }).map((_, idx) => (
                <StarFilled key={idx} className={s.starIcon} style={{ color: '#39B54A' }} />
              ))}
            </div>
          </div>

          <div className={s.mathGameCard__equation}>
            <span className={s.mathGameCard__num}>{currentQ.n1}</span>
            <span className={s.mathGameCard__operator}>{currentQ.operator}</span>
            <span className={s.mathGameCard__num}>{currentQ.n2}</span>
            <span className={s.mathGameCard__equals}>=</span>
            <span className={s.mathGameCard__questionMark}>?</span>
          </div>

          <p className={s.mathGameCard__instruction}>
            Choose the correct answer below:
          </p>

          <div className={s.mathGameCard__options}>
            {currentQ.options.map((opt, i) => {
              let stateClass = '';
              if (selectedAnswer === opt) {
                stateClass =
                  answerState === 'correct'
                    ? s['mathGameCard__optBtn--correct']
                    : s['mathGameCard__optBtn--wrong'];
              }
              return (
                <button
                  key={i}
                  className={`${s.mathGameCard__optBtn} ${stateClass}`}
                  onClick={() => handleAnswer(opt)}
                  disabled={isAnswerLocked}
                  aria-label={`Option ${opt}`}
                >
                  <span>{opt}</span>
                  {selectedAnswer === opt && answerState === 'correct' && (
                    <CheckCircleOutlined className={s.mathGameCard__optIcon} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ─── 3. WORD SPELLING & PICTURE QUEST (GAME 3) ──────────────────────────────────
// ════════════════════════════════════════════════════════════════════════════════
function WordSpellGame({ onQuit }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState([]); // Array of letter tile objects
  const [availableTiles, setAvailableTiles] = useState([]); // Array of { id, char, used }
  const [score, setScore] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const currentItem = SPELLING_DATA[currentIdx] || SPELLING_DATA[0];

  // Prepare scrambled tiles + 2 distractors
  const setupWordTiles = useCallback((item) => {
    const letters = item.word.split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const extra1 = alphabet[Math.floor(Math.random() * alphabet.length)];
    const extra2 = alphabet[Math.floor(Math.random() * alphabet.length)];
    
    const combined = [...letters, extra1, extra2]
      .map((char, index) => ({ id: `${char}-${index}-${Math.random()}`, char, used: false }))
      .sort(() => Math.random() - 0.5);

    setAvailableTiles(combined);
    setSelectedLetters([]);
    setIsSuccess(false);
    setIsError(false);
  }, []);

  useEffect(() => {
    setupWordTiles(currentItem);
    speakVoice(`Spell the word: ${currentItem.word}`, { rate: 0.85 });
  }, [currentIdx, currentItem, setupWordTiles]);

  const handleTileClick = (tile) => {
    if (tile.used || isSuccess || selectedLetters.length >= currentItem.word.length) return;

    // Mark used
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t))
    );

    const updatedSelected = [...selectedLetters, tile];
    setSelectedLetters(updatedSelected);

    // Check if full word formed
    if (updatedSelected.length === currentItem.word.length) {
      const formedWord = updatedSelected.map((t) => t.char).join('');
      if (formedWord === currentItem.word) {
        setIsSuccess(true);
        setScore((prev) => prev + 1);
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
        speakVoice(`Very good! ${currentItem.word}!`, { rate: 0.9, pitch: 1.2 });

        setTimeout(() => {
          if (currentIdx + 1 >= SPELLING_DATA.length) {
            setIsComplete(true);
          } else {
            setCurrentIdx((prev) => prev + 1);
          }
        }, 1500);
      } else {
        setIsError(true);
        speakVoice('Try again!', { rate: 0.85, pitch: 1.0 });
        setTimeout(() => {
          // Reset tiles
          setupWordTiles(currentItem);
        }, 1100);
      }
    }
  };

  const handleRemoveLetter = (tileIndex) => {
    if (isSuccess) return;
    const tileToRemove = selectedLetters[tileIndex];
    if (!tileToRemove) return;

    setSelectedLetters((prev) => prev.filter((_, idx) => idx !== tileIndex));
    setAvailableTiles((prev) =>
      prev.map((t) => (t.id === tileToRemove.id ? { ...t, used: false } : t))
    );
  };

  const handleReset = () => {
    window.speechSynthesis?.cancel();
    setCurrentIdx(0);
    setScore(0);
    setIsComplete(false);
    setupWordTiles(SPELLING_DATA[0]);
  };

  if (isComplete) {
    return (
      <div className={s.gameOverlay}>
        <div className={s.gameHeader}>
          <div className={s.gameHeader__title}>
            <PictureOutlined /> <span>Word Spelling Quest</span>
          </div>
          <div className={s.gameHeader__progress}>
            {SPELLING_DATA.length} / {SPELLING_DATA.length} Words Solved!
          </div>
          <button className={s.gameHeader__quit} onClick={onQuit} aria-label="Quit game (Esc)">
            <CloseOutlined /> Quit (Esc)
          </button>
        </div>

        <div className={s.completionScreen}>
          <div className={s.completionScreen__trophy} style={{ background: '#FFF0F5', color: '#E11D48' }}>
            <TrophyOutlined />
          </div>
          <h2 className={s.completionScreen__title}>Spelling Champion! 🎉</h2>
          <div className={s.completionScreen__score}>
            <span className={s.completionScreen__scoreNum} style={{ color: '#E11D48' }}>{score}</span>
            <span className={s.completionScreen__scoreTotal}>/ {SPELLING_DATA.length}</span>
          </div>
          <p className={s.completionScreen__subtitle}>
            You correctly spelled all picture words! Fantastic vocabulary &amp; memory!
          </p>
          <div className={s.completionScreen__actions}>
            <button className={s.completionBtn} onClick={handleReset} style={{ background: '#E11D48' }}>
              <ReloadOutlined /> Play Again
            </button>
            <button className={`${s.completionBtn} ${s['completionBtn--secondary']}`} onClick={onQuit}>
              <HomeOutlined /> Back to Games (Esc)
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={s.gameOverlay}>
      <div className={s.gameHeader}>
        <div className={s.gameHeader__title}>
          <PictureOutlined /> <span>Word Spelling Quest</span>
        </div>
        <div className={s.gameHeader__progress}>
          Word {currentIdx + 1} / {SPELLING_DATA.length}&nbsp;|&nbsp;Score: {score} 🌟
        </div>
        <button className={s.gameHeader__quit} onClick={onQuit} aria-label="Quit game (Esc)">
          <CloseOutlined /> Quit (Esc)
        </button>
      </div>

      <div className={s.gameContent}>
        <div className={s.spellGameCard}>
          {/* Top Picture Frame */}
          <div className={s.spellGameCard__imageFrame}>
            <img src={currentItem.image} alt={currentItem.hint} className={s.spellGameCard__image} />
            <div className={s.spellGameCard__hintBadge}>
              <SmileOutlined /> {currentItem.hint}
            </div>
            <button
              className={s.spellGameCard__speakBtn}
              onClick={() => speakVoice(currentItem.word, { rate: 0.85 })}
              aria-label="Hear Word"
            >
              <SoundOutlined /> Pronounce
            </button>
          </div>

          <p className={s.spellGameCard__prompt}>
            Tap the letters in correct order to spell the word:
          </p>

          {/* Slots / Formed Word */}
          <div className={`${s.spellGameCard__slots} ${isError ? s['spellGameCard__slots--shake'] : ''}`}>
            {Array.from({ length: currentItem.word.length }).map((_, idx) => {
              const selectedTile = selectedLetters[idx];
              return (
                <button
                  key={idx}
                  className={`
                    ${s.spellSlot}
                    ${selectedTile ? s['spellSlot--filled'] : ''}
                    ${isSuccess ? s['spellSlot--success'] : ''}
                    ${isError ? s['spellSlot--error'] : ''}
                  `}
                  onClick={() => selectedTile && handleRemoveLetter(idx)}
                >
                  {selectedTile ? selectedTile.char : ''}
                </button>
              );
            })}
          </div>

          {/* Available Letter Tiles */}
          <div className={s.spellGameCard__tilesContainer}>
            {availableTiles.map((tile) => (
              <button
                key={tile.id}
                className={`${s.letterPickBtn} ${tile.used ? s['letterPickBtn--used'] : ''}`}
                onClick={() => handleTileClick(tile)}
                disabled={tile.used || isSuccess}
              >
                {tile.char}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className={s.spellGameCard__controls}>
            <button
              className={s.spellResetBtn}
              onClick={() => setupWordTiles(currentItem)}
              disabled={selectedLetters.length === 0 || isSuccess}
            >
              <UndoOutlined /> Clear Letters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════════
// ─── 4. DIGITAL SMART SLATE & TRACING BOARD (GAME 4) ────────────────────────────
// ════════════════════════════════════════════════════════════════════════════════


// ════════════════════════════════════════════════════════════════════════════════
// ─── MAIN GAMES HUB PAGE (ALL 4 GAMES) ──────────────────────────────────────────
// ════════════════════════════════════════════════════════════════════════════════
export default function KidsGamesPage() {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState(null); // null | 'abc' | 'math' | 'spell' | 'board'
  const gameContainerRef = useRef(null);

  // ── Fullscreen handler ──
  const enterFullscreen = async () => {
    const el = gameContainerRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) await el.requestFullscreen();
      else if (el.webkitRequestFullscreen) await el.webkitRequestFullscreen();
    } catch {
      // Fallback: CSS fixed overlay handles full viewport
    }
  };

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else if (document.webkitExitFullscreen) await document.webkitExitFullscreen();
      }
    } catch {
      // ignore
    }
  }, []);

  // Listen for Escape key on window
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        if (activeGame) {
          window.speechSynthesis?.cancel();
          exitFullscreen();
          setActiveGame(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame, exitFullscreen]);

  const handlePlayGame = async (gameId) => {
    setActiveGame(gameId);
    window.speechSynthesis?.cancel();
    setTimeout(async () => {
      await enterFullscreen();
    }, 50);
  };

  const handleQuitGame = useCallback(async () => {
    window.speechSynthesis?.cancel();
    await exitFullscreen();
    setActiveGame(null);
  }, [exitFullscreen]);

  return (
    <div className={s.gamesPage}>
      
      {/* ── 1. Fullscreen Game Overlay (Active Game Mode) ── */}
      {activeGame && (
        <div ref={gameContainerRef} className={s.gameFullscreenOverlay}>
          {activeGame === 'abc' && <ABCVoiceGame onQuit={handleQuitGame} />}
          {activeGame === 'math' && <MathFunGame onQuit={handleQuitGame} />}
          {activeGame === 'spell' && <WordSpellGame onQuit={handleQuitGame} />}
         
        </div>
      )}

      {/* ── 2. Main Hub Landing Page ── */}
      <div className={`${s.landingContent} ${activeGame ? s['landingContent--hidden'] : ''}`}>
        
        {/* HERO SECTION WITH CHILDREN PLAY BACKGROUND */}
        <section className={s.hero}>
          <div
            className={s.hero__bgImage}
            style={{ backgroundImage: `url('/assets/hero_kids_clean.png')` }}
          />
          <div className={s.hero__overlay} />

          <div className="container-xl position-relative">
            <div className={s.hero__inner}>
              
              

              <h1 className={s.hero__title}>
                {t('games.title', 'Learn • Play • Explore')}
              </h1>

              <p className={s.hero__subtitle}>
                {t('games.desc', 'Discover 4 joyful interactive educational games. Listen to accurate letter pronunciations, build words from pictures, solve magic math quizzes, and trace on the digital slate!')}
              </p>

              <div className={s.hero__stats}>
                <div className={s.hero__statItem}>
                  <BookOutlined className={s.hero__statIcon} />
                  <span>26 Talking Letters</span>
                </div>
                <div className={s.hero__statItem}>
                  <PictureOutlined className={s.hero__statIcon} />
                  <span>Word Spell Quest</span>
                </div>
                <div className={s.hero__statItem}>
                  <CalculatorOutlined className={s.hero__statIcon} />
                  <span>"Very Good!" Math</span>
                </div>
                <div className={s.hero__statItem}>
                  <HighlightOutlined className={s.hero__statIcon} />
                  <span>Digital Slate Tracing</span>
                </div>
              </div>

            </div>
          </div>

          {/* Floating Decorative Elements */}
          <div className={s.hero__floatA}>A</div>
          <div className={s.hero__floatB}>B</div>
          <div className={s.hero__floatC}>1</div>
          <div className={s.hero__floatD}>2</div>
          <div className={s.hero__floatE}>★</div>
        </section>

        {/* ── 3. GAMES CARDS SECTION (4 GAMES) ── */}
        <section className={s.gamesSection}>
          <div className="container-xl">
            <div className={s.gamesSection__header}>
              <h2 className={s.gamesSection__title}>{t('games.title', 'Choose Your Learning Game')}</h2>
              <p className={s.gamesSection__subtitle}>
                {t('games.quitGame', 'Tap "Play Game" to open high-definition full-screen voice games. Press ESC to quit anytime.')}
              </p>
            </div>

            <div className={s.gamesGrid}>
              
              {/* ── CARD 1: ABC VOICE ADVENTURE ── */}
              <div className={s.gameCard}>
                <div className={s.gameCard__illustration} data-theme="abc">
                  <div className={s.gameCard__lettersDemo}>
                    <span className={s.letterA}>A</span>
                    <span className={s.letterB}>B</span>
                    <span className={s.letterC}>C</span>
                  </div>
                  <span className={s.gameCard__badgePill}>
                    <SoundOutlined /> Talking Letters + Photos
                  </span>
                </div>

                <div className={s.gameCard__body}>
                  <div className={s.gameCard__tag}>
                    <BookOutlined /> Alphabet &amp; Phonics
                  </div>
                  <h3 className={s.gameCard__title}>{t('games.tabAlphabet', 'ABC Voice Adventure')}</h3>
                  <p className={s.gameCard__desc}>
                    Click any letter tile from A to Z to hear crystal-clear voice pronunciation: <strong>"A"</strong> and <strong>"A is for Apple"</strong> with vivid picture cards!
                  </p>
                  
                  <div className={s.gameCard__meta}>
                    <span><StarOutlined /> 26 Words &amp; Photos</span>
                    <span><SoundOutlined /> Real TTS Speech</span>
                  </div>

                  <button
                    className={s.gameCard__playBtn}
                    onClick={() => handlePlayGame('abc')}
                    aria-label="Play ABC Voice Adventure"
                  >
                    <PlayCircleOutlined />
                    <span>{t('common.playNow', 'Play Fullscreen Game')}</span>
                    <ArrowRightOutlined className={s.gameCard__playBtnArrow} />
                  </button>
                </div>
              </div>

              {/* ── CARD 2: MAGIC MATHS CHALLENGE ── */}
              <div className={s.gameCard}>
                <div className={s.gameCard__illustration} data-theme="math">
                  <div className={s.gameCard__mathDemo}>
                    <span className={s.mathEq}>3 + 2</span>
                    <span className={s.mathEqual}>=</span>
                    <span className={s.mathAns}>5</span>
                  </div>
                  <span className={`${s.gameCard__badgePill} ${s['gameCard__badgePill--math']}`}>
                    <TrophyOutlined /> "Very Good!" Voice
                  </span>
                </div>

                <div className={s.gameCard__body}>
                  <div className={`${s.gameCard__tag} ${s['gameCard__tag--math']}`}>
                    <CalculatorOutlined /> Maths &amp; Numbers
                  </div>
                  <h3 className={s.gameCard__title}>{t('games.tabMaths', 'Magic Maths Challenge')}</h3>
                  <p className={s.gameCard__desc}>
                    Practice simple addition and subtraction with visual counters. When you get it right, the voice celebrates: <strong>"Very Good!"</strong> with colorful confetti!
                  </p>

                  <div className={s.gameCard__meta}>
                    <span><TrophyOutlined /> 10 Quiz Questions</span>
                    <span><SoundOutlined /> Instant Audio Cheers</span>
                  </div>

                  <button
                    className={`${s.gameCard__playBtn} ${s['gameCard__playBtn--math']}`}
                    onClick={() => handlePlayGame('math')}
                    aria-label="Play Magic Maths Challenge"
                  >
                    <PlayCircleOutlined />
                    <span>{t('common.playNow', 'Play Fullscreen Game')}</span>
                    <ArrowRightOutlined className={s.gameCard__playBtnArrow} />
                  </button>
                </div>
              </div>

              {/* ── CARD 3: WORD SPELLING QUEST ── */}
              <div className={s.gameCard}>
                <div className={s.gameCard__illustration} data-theme="spell">
                  <div className={s.gameCard__spellDemo}>
                    <span className={s.spellLetter}>C</span>
                    <span className={s.spellLetter}>A</span>
                    <span className={s.spellLetter}>T</span>
                  </div>
                  <span className={`${s.gameCard__badgePill} ${s['gameCard__badgePill--spell']}`}>
                    <PictureOutlined /> Picture Word Builder
                  </span>
                </div>

                <div className={s.gameCard__body}>
                  <div className={`${s.gameCard__tag} ${s['gameCard__tag--spell']}`}>
                    <PictureOutlined /> Vocabulary &amp; Spelling
                  </div>
                  <h3 className={s.gameCard__title}>{t('games.tabSpell', 'Picture Word Spell Quest')}</h3>
                  <p className={s.gameCard__desc}>
                    Look at the object picture and tap letter tiles to spell the correct word. Correct spelling triggers confetti bursts and <strong>"Very Good!"</strong> voice!
                  </p>

                  <div className={s.gameCard__meta}>
                    <span><SmileOutlined /> 10 Picture Words</span>
                    <span><TrophyOutlined /> Confetti Fireworks</span>
                  </div>

                  <button
                    className={`${s.gameCard__playBtn} ${s['gameCard__playBtn--spell']}`}
                    onClick={() => handlePlayGame('spell')}
                    aria-label="Play Word Spelling Quest"
                  >
                    <PlayCircleOutlined />
                    <span>{t('common.playNow', 'Play Fullscreen Game')}</span>
                    <ArrowRightOutlined className={s.gameCard__playBtnArrow} />
                  </button>
                </div>
              </div>

            

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
