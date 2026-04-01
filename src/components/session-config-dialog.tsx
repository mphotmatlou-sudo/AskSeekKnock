'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { PrayerTemplate, PrayerPoint } from '@/lib/types';
import { X } from 'lucide-react';

interface ConfiguredPrayerPoint extends PrayerPoint {
  enabled: boolean;
}

interface ConfiguredPrayerTemplate extends PrayerTemplate {
  points: ConfiguredPrayerPoint[];
}

interface SessionConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  templates: PrayerTemplate[];
  onStartSession: (configuredTemplates: PrayerTemplate[]) => void;
}

export const SessionConfigDialog = ({ open, onOpenChange, templates, onStartSession }: SessionConfigDialogProps) => {
  const [configuredTemplates, setConfiguredTemplates] = useState<ConfiguredPrayerTemplate[]>([]);

  useEffect(() => {
    setConfiguredTemplates(
      templates.map(t => ({
        ...t,
        points: t.points.map(p => ({ ...p, enabled: true }))
      }))
    );
  }, [templates]);

  const handlePointEnabledChange = (templateId: string, pointIndex: number, enabled: boolean) => {
    setConfiguredTemplates(prev =>
      prev.map(t =>
        t.id === templateId
          ? { ...t, points: t.points.map((p, i) => i === pointIndex ? { ...p, enabled } : p) }
          : t
      )
    );
  };

  const handlePointDurationChange = (templateId: string, pointIndex: number, duration: number) => {
    setConfiguredTemplates(prev =>
      prev.map(t =>
        t.id === templateId
          ? { ...t, points: t.points.map((p, i) => i === pointIndex ? { ...p, duration } : p) }
          : t
      )
    );
  };

  const handleStart = () => {
    const finalTemplates = configuredTemplates
      .map(t => ({ ...t, points: t.points.filter(p => p.enabled) }))
      .filter(t => t.points.length > 0);
    onStartSession(finalTemplates);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Configure Your Prayer Session</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          <p className="text-sm text-muted-foreground">
            Select the prayer points and set their durations.
          </p>
          <Accordion type="multiple" defaultValue={templates.map(t => t.id)} className="w-full">
            {configuredTemplates.map((template) => (
              <AccordionItem value={template.id} key={template.id}>
                <AccordionTrigger>{template.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {template.points.map((point, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-secondary/50">
                        <Checkbox
                          checked={point.enabled}
                          onCheckedChange={(checked) => handlePointEnabledChange(template.id, index, !!checked)}
                        />
                        <div className="flex-1 text-sm">
                          {point.title}
                        </div>
                        <Input
                          type="number"
                          value={point.duration}
                          onChange={(e) => handlePointDurationChange(template.id, index, parseInt(e.target.value, 10))}
                          className="w-20 h-8"
                          min={1}
                          disabled={!point.enabled}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleStart} disabled={configuredTemplates.length === 0}>
            Start Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};