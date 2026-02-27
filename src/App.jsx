import { useState } from 'react'
import './App.css'

const ANSWERS = [
  "It is certain.", "It is decidedly so.", "Without a doubt.", "Yes definitely.", 
  "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", 
  "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", 
  "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", 
  "Don't count on it.", "My reply is no.", "My sources say no.", 
  "Outlook not so good.", "Very doubtful."
]

function App() {
  const [answer, setAnswer] = useState("8")
  const [isShaking, setIsShaking] = useState(false)

  const askQuestion = () => {
    if (isShaking) return;
    setIsShaking(true);
    setAnswer(""); // clear current answer
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * ANSWERS.length);
      setAnswer(ANSWERS[randomIndex]);
      setIsShaking(false);
    }, 500);
  }

  return (
    <div className="magic-8-ball-container">
      <h1 style={{ color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.5)' }}>Magic 8-Ball</h1>
      <div className={`magic-8-ball ${isShaking ? 'shaking' : ''}`} onClick={askQuestion}>
        <div className="magic-8-ball-window">
          {answer === "8" ? (
            <div className="magic-8-ball-8">8</div>
          ) : answer ? (
             <div className="magic-8-ball-triangle">
              <span className="magic-8-ball-answer">{answer}</span>
            </div>
          ) : null}
        </div>
      </div>
      <p style={{ color: 'white', marginTop: '20px', fontSize: '1.2em' }}>Click the ball to reveal your future</p>
    </div>
  )
}

export default App