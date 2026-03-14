import { useState } from 'react';

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = function () {
    if (step > 1) setStep((prev) => prev - 1);
  };
  const handleNext = function () {
    if (step < 3) setStep((prev) => prev + 1);
  };

  return (
    <>
      <button className='close' onClick={() => setIsOpen((prev) => !prev)}>
        &times;
      </button>
      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={step >= 1 ? 'active' : ''}>1</div>
            <div className={step >= 2 ? 'active' : ''}>2</div>
            <div className={step >= 3 ? 'active' : ''}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}

            <div className='buttons'>
              <Button
                onClick={() => alert(`Learn how to ${messages[step - 1]}`)}
                textColor='#333'
                bgColor='#e7e7e7'
              >
                Learn How
              </Button>
            </div>
          </StepMessage>

          <div className='buttons'>
            <Button onClick={handlePrevious} textColor='#fff' bgColor='#7950f2'>
              <span>👈</span>
              Previous
            </Button>
            <Button onClick={handleNext} textColor='#fff' bgColor='#7950f2'>
              Next
              <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {children}
    </button>
  );
}

function StepMessage({ step, children }) {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  );
}
