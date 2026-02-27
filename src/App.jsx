import { useState } from 'react'
import './App.css'

const ANSWERS = [
  { text: "It is certain.", type: "positive" },
  { text: "It is decidedly so.", type: "positive" },
  { text: "Without a doubt.", type: "positive" },
  { text: "Yes definitely.", type: "positive" },
  { text: "You may rely on it.", type: "positive" },
  { text: "As I see it, yes.", type: "positive" },
  { text: "Most likely.", type: "positive" },
  { text: "Outlook good.", type: "positive" },
  { text: "Yes.", type: "positive" },
  { text: "Signs point to yes.", type: "positive" },
  { text: "Reply hazy, try again.", type: "neutral" },
  { text: "Ask again later.", type: "neutral" },
  { text: "Better not tell you now.", type: "neutral" },
  { text: "Cannot predict now.", type: "neutral" },
  { text: "Concentrate and ask again.", type: "neutral" },
  { text: "Don't count on it.", type: "negative" },
  { text: "My reply is no.", type: "negative" },
  { text: "My sources say no.", type: "negative" },
  { text: "Outlook not so good.", type: "negative" },
  { text: "Very doubtful.", type: "negative" }
]

function App() {
  const [answer, setAnswer] = useState(null)
  const [isShaking, setIsShaking] = useState(false)

  const askQuestion = () => {
    if (isShaking) return;
    setIsShaking(true);
    setAnswer(null); // clear current answer
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * ANSWERS.length);
      setAnswer(ANSWERS[randomIndex]);
      setIsShaking(false);
    }, 500);
  }

  return (
    <div className="magic-8-ball-container">
      <h1 className="title">Magic 8-Ball</h1>
      <div className={`magic-8-ball ${isShaking ? 'shaking' : ''}`} onClick={askQuestion}>
        <div className="magic-8-ball-window">
          {!answer ? (
            <div className="magic-8-ball-8">8</div>
          ) : (
             <div className={`magic-8-ball-shape magic-8-ball-shape-${answer.type}`}>
              <span className="magic-8-ball-answer">{answer.text}</span>
            </div>
          )}
        </div>
      </div>
      <p className="subtitle">Click the ball to reveal your future</p>
    </div>
  )
}

export default App