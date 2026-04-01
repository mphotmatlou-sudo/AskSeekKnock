'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface TimerProps {
  initialMinutes: number;
  onComplete: () => void;
  timerKey: string;
}

export function Timer({ initialMinutes, onComplete, timerKey }: TimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  const setupTimer = useCallback(() => {
    setTotalSeconds(initialMinutes * 60);
    setIsActive(false);
  }, [initialMinutes]);

  useEffect(() => {
    setupTimer();
  }, [timerKey, setupTimer]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isActive) {
      setIsActive(false);
      // Dynamically import Tone.js only on the client-side
      import('tone').then(Tone => {
        const synth = new Tone.Synth().toDestination();
        synth.triggerAttackRelease('C5', '8n', Tone.now());
        synth.triggerAttackRelease('E5', '8n', Tone.now() + 0.2);
        synth.triggerAttackRelease('G5', '8n', Tone.now() + 0.4);
      });
      onComplete();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, totalSeconds, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setupTimer();
  };

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <Card className="w-full max-w-md mx-auto text-center">
      <CardHeader>
        <CardTitle>Timer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-6xl font-bold font-mono tracking-tighter"
             aria-live="polite" aria-atomic="true">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-4">
        <Button onClick={toggleTimer} size="lg">
          {isActive ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start
            </>
          )}
        </Button>
        <Button onClick={resetTimer} variant="outline" size="lg">
          <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
