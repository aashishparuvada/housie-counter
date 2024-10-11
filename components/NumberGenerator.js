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
    setGeneratedNumbers([...generatedNumbers, newNumber]);
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
      <h1 className="text-3xl font-bold mb-4">Random Number Generator</h1>
      <div className="flex space-x-4 mb-4">
        <Button onClick={generateNumber}>Generate Number</Button>
        <Button onClick={resetSession} variant="outline">Reset Session</Button>
      </div>
      {currentNumber && (
        <Card className="p-4 mb-4">
          <p className="text-2xl font-bold">Current Number: {currentNumber}</p>
        </Card>
      )}
      <div className="grid grid-cols-10 gap-2">
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