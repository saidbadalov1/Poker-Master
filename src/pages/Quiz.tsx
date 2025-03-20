import { useState, useEffect } from "react";
import { pokerHands } from "../data/pokerHands";

interface CardSymbolProps {
  symbol: string;
  type: "spade" | "club" | "heart" | "diamond";
}

const CardSymbol = ({ symbol, type }: CardSymbolProps) => (
  <span className={`card-symbol ${type}`}>{symbol}</span>
);

const formatCardDisplay = (text: string) => {
  const symbolMap = {
    "♠": "spade",
    "♣": "club",
    "♥": "heart",
    "♦": "diamond",
  } as const;

  const parts = text.split(/(♠|♣|♥|♦)/);
  return parts.map((part, index) => {
    const symbolType = symbolMap[part as keyof typeof symbolMap];
    if (symbolType) {
      return <CardSymbol key={index} symbol={part} type={symbolType} />;
    }
    return <span key={index}>{part}</span>;
  });
};

interface TrendPoint {
  isCorrect: boolean;
  timestamp: number;
}

const TrendGraph = ({ answers }: { answers: TrendPoint[] }) => {
  const height = 40;
  const width = 200;
  const pointRadius = 4;
  const lineThickness = 2;

  return (
    <div className="trend-graph">
      <svg width={width} height={height}>
        {answers.map((point, index) => {
          const x = (width / (answers.length - 1)) * index;
          const y = point.isCorrect ? 10 : height - 10;
          const color = point.isCorrect ? "#2ea043" : "#f85149";

          return (
            <g key={point.timestamp}>
              {/* Bağlantı çizgisi */}
              {index > 0 && (
                <line
                  x1={(width / (answers.length - 1)) * (index - 1)}
                  y1={answers[index - 1].isCorrect ? 10 : height - 10}
                  x2={x}
                  y2={y}
                  stroke="rgba(100, 108, 255, 0.4)"
                  strokeWidth={lineThickness}
                />
              )}
              {/* Nokta */}
              <circle cx={x} cy={y} r={pointRadius} fill={color} />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const Quiz = () => {
  const [currentHand, setCurrentHand] = useState(pokerHands[0]);
  const [options, setOptions] = useState<typeof pokerHands>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [usedHands, setUsedHands] = useState<number[]>([]);
  const [answerHistory, setAnswerHistory] = useState<TrendPoint[]>([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerActive, setTimerActive] = useState(true);

  const calculateSuccess = () => {
    const total = correctAnswers + wrongAnswers;
    if (total === 0) return 0;
    const successRate = (correctAnswers / total) * 100;
    return Math.round(successRate);
  };

  const generateQuestion = () => {
    if (usedHands.length >= pokerHands.length - 1) {
      setUsedHands([]);
    }

    const availableHands = pokerHands.filter(
      (hand) => !usedHands.includes(hand.id) && hand.id !== currentHand.id
    );

    const randomIndex = Math.floor(Math.random() * availableHands.length);
    const correctHand = availableHands[randomIndex];

    const wrongOptions = pokerHands
      .filter((hand) => hand.id !== correctHand.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const allOptions = [...wrongOptions, correctHand].sort(
      () => Math.random() - 0.5
    );

    setCurrentHand(correctHand);
    setOptions(allOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowResult(false);
    setTimeLeft(20);
    setTimerActive(true);
  };

  const handleAnswer = (selectedId: number) => {
    if (selectedAnswer !== null) return;

    setTimerActive(false);
    const correct = selectedId === currentHand.id;
    setSelectedAnswer(selectedId);
    setIsCorrect(correct);
    setShowResult(true);

    setAnswerHistory((prev) => {
      const newHistory = [
        ...prev,
        { isCorrect: correct, timestamp: Date.now() },
      ];

      return newHistory.slice(-10);
    });

    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
      setUsedHands((prev) => [...prev, currentHand.id]);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    generateQuestion();
  };

  useEffect(() => {
    let timer: number;

    if (timerActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleAnswer(-1);
    }

    return () => window.clearInterval(timer);
  }, [timeLeft, timerActive]);

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="quiz-container">
      <div className="quiz-stats">
        <div className="stats-row">
          <p>
            Correct: {correctAnswers} | Wrong: {wrongAnswers}
          </p>
          <p>Success: {calculateSuccess()}%</p>
        </div>
        {answerHistory.length > 0 && (
          <div className="trend-container">
            <p className="trend-label">Last 10 Answers Trend:</p>
            <TrendGraph answers={answerHistory} />
          </div>
        )}
      </div>

      <div className="quiz-question">
        <div className="timer-container">
          <div
            className={`timer ${timeLeft <= 5 ? "warning" : ""}`}
            style={
              {
                "--progress": `${(timeLeft / 20) * 100}%`,
              } as React.CSSProperties
            }
          ></div>
        </div>
        <h2>What Hand Is This?</h2>
        <div className="example-large">
          {formatCardDisplay(currentHand.example)}
        </div>
      </div>

      <div className="quiz-options">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id)}
            className={`quiz-option ${
              showResult && selectedAnswer === option.id
                ? isCorrect
                  ? "correct"
                  : "wrong"
                : ""
            } ${
              showResult && option.id === currentHand.id && !isCorrect
                ? "correct"
                : ""
            }`}
            disabled={showResult}
          >
            {option.name}
          </button>
        ))}
      </div>

      {showResult && (
        <div className="quiz-result">
          <p className={isCorrect ? "correct-text" : "wrong-text"}>
            {isCorrect ? "Correct!" : "Wrong!"} This is a {currentHand.name}.
          </p>
          <p className="hand-description">{currentHand.description}</p>
          <button className="next-button" onClick={handleNext}>
            Next Question
          </button>
        </div>
      )}
    </div>
  );
};
