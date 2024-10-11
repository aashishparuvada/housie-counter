'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const NumberGenerator = () => {
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);

  const generateNumber = () => {
    if (generatedNumbers.length === 90) {
      alert("All numbers have been generated!");
      return;
    }
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 90) + 1;
    } while (generatedNumbers.includes(newNumber));
    
    setCurrentNumber(newNumber);
    setGeneratedNumbers(prev => [newNumber, ...prev]);
    announceNumber(newNumber);
  };

  const resetSession = () => {
    setGeneratedNumbers([]);
    setCurrentNumber(null);
  };

  const announceNumber = (number) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Number ${number}`);
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Housie Number Picker</h1>
      <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <Button onClick={generateNumber} className="w-full sm:w-auto">Generate Number</Button>
        <Button onClick={resetSession} variant="outline" className="w-full sm:w-auto">Reset Session</Button>
      </div>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4">
        {currentNumber && (
          <Card className="p-4 flex-grow">
            <h2 className="text-xl font-semibold mb-2">Current Number</h2>
            <p className="text-4xl font-bold text-center">{currentNumber}</p>
          </Card>
        )}
        <Card className="p-4 flex-grow max-h-60 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-2">Recent Numbers</h2>
          <ul className="space-y-1">
            {generatedNumbers.map((num, index) => (
              <li key={index} className="text-lg">{num}</li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
        {[...Array(90)].map((_, index) => {
          const number = index + 1;
          const isGenerated = generatedNumbers.includes(number);
          return (
            <div
              key={number}
              className={`p-2 text-center rounded ${
                isGenerated
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NumberGenerator;