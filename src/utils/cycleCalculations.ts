import { CyclePhase, CycleCalculationResult } from '../types';

export function formatDateToISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseISODate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function daysBetween(d1: Date, d2: Date): number {
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

/**
 * Calculates current cycle status based on user settings and today's date.
 */
export function calculateCycleInfo(
  lastPeriodStartDateStr: string,
  cycleLength: number = 28,
  periodLength: number = 5,
  lutealPhaseDays: number = 14,
  targetDate: Date = new Date()
): CycleCalculationResult {
  const lastPeriodStart = parseISODate(lastPeriodStartDateStr);
  const diffDays = daysBetween(lastPeriodStart, targetDate);

  // Normalize to current cycle loop
  const cycleDay = (diffDays >= 0 ? (diffDays % cycleLength) : ((diffDays % cycleLength) + cycleLength)) + 1;

  // Ovulation typically occurs (cycleLength - lutealPhaseDays) days into the cycle
  const ovulationDay = Math.max(cycleLength - lutealPhaseDays, 1);
  const fertileStartDay = Math.max(ovulationDay - 5, 1);
  const fertileEndDay = Math.min(ovulationDay + 1, cycleLength);

  let currentPhase: CyclePhase;
  let phaseDisplayName: string;
  let phaseDescription: string;
  let phaseAdvice: string;
  let chanceOfPregnancy: 'Low' | 'Medium' | 'High' | 'Very High';

  if (cycleDay <= periodLength) {
    currentPhase = 'MENSTRUAL';
    phaseDisplayName = 'Menstrual Phase';
    phaseDescription = 'Your estrogen and progesterone levels are low. The uterine lining is gently shedding.';
    phaseAdvice = 'Rest, stay warm, hydrate with soothing teas, and practice gentle stretching.';
    chanceOfPregnancy = 'Low';
  } else if (cycleDay < fertileStartDay) {
    currentPhase = 'FOLLICULAR';
    phaseDisplayName = 'Follicular Phase';
    phaseDescription = 'FSH is stimulating follicle development. Estrogen rises, boosting mental focus and stamina.';
    phaseAdvice = 'Great time for creative work, high-energy workouts, and trying new activities.';
    chanceOfPregnancy = 'Medium';
  } else if (cycleDay <= fertileEndDay) {
    currentPhase = 'OVULATION';
    phaseDisplayName = 'Ovulation Phase';
    phaseDescription = 'LH surge triggers egg release. Peak fertility, social confidence, and vibrant energy.';
    phaseAdvice = 'Peak communication and vitality. Optimal window for conception if planning.';
    chanceOfPregnancy = cycleDay === ovulationDay ? 'Very High' : 'High';
  } else {
    currentPhase = 'LUTEAL';
    phaseDisplayName = 'Luteal Phase';
    phaseDescription = 'Progesterone peaks to support a possible pregnancy, then tapers off. Metabolism increases.';
    phaseAdvice = 'Prioritize magnesium-rich complex carbs, gentle yoga, and restorative evening rituals.';
    chanceOfPregnancy = 'Low';
  }

  // Calculate upcoming critical dates
  const nextPeriodDate = addDays(lastPeriodStart, Math.ceil((diffDays + 1) / cycleLength) * cycleLength);
  const nextOvulationDate = addDays(lastPeriodStart, (Math.floor(diffDays / cycleLength) * cycleLength) + ovulationDay - 1);
  const fertileStartDate = addDays(lastPeriodStart, (Math.floor(diffDays / cycleLength) * cycleLength) + fertileStartDay - 1);
  const fertileEndDate = addDays(lastPeriodStart, (Math.floor(diffDays / cycleLength) * cycleLength) + fertileEndDay - 1);

  const daysUntilNextPeriod = Math.max(0, cycleLength - cycleDay + 1);

  return {
    currentDayOfCycle: cycleDay,
    currentPhase,
    daysUntilNextPeriod,
    nextPeriodStartDate: formatDateToISO(nextPeriodDate),
    nextOvulationDate: formatDateToISO(nextOvulationDate),
    fertileWindowStart: formatDateToISO(fertileStartDate),
    fertileWindowEnd: formatDateToISO(fertileEndDate),
    phaseDisplayName,
    phaseDescription,
    phaseAdvice,
    chanceOfPregnancy
  };
}
