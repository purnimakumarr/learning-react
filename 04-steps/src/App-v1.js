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

          <p className='message'>
            Step {step}: {messages[step - 1]}
          </p>

          <div className='buttons'>
            <button
              onClick={handlePrevious}
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: '#7950f2', color: '#fff' }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
