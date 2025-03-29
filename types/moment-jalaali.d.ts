declare module 'moment-jalaali' {
  import moment from 'moment';
  
  interface JalaaliMoment extends moment.Moment {
    jYear(): number;
    jMonth(): number;
    jDate(): number;
    jDayOfYear(): number;
    jWeekOfYear(): number;
    jWeek(): number;
    jQuarter(): number;
    jStartOf(unit: string): JalaaliMoment;
    jEndOf(unit: string): JalaaliMoment;
    jAdd(amount: number, unit: string): JalaaliMoment;
    jSubtract(amount: number, unit: string): JalaaliMoment;
    jStartOf('year'): JalaaliMoment;
    jEndOf('year'): JalaaliMoment;
    jStartOf('month'): JalaaliMoment;
    jEndOf('month'): JalaaliMoment;
    jStartOf('week'): JalaaliMoment;
    jEndOf('week'): JalaaliMoment;
    jStartOf('day'): JalaaliMoment;
    jEndOf('day'): JalaaliMoment;
    jStartOf('hour'): JalaaliMoment;
    jEndOf('hour'): JalaaliMoment;
    jStartOf('minute'): JalaaliMoment;
    jEndOf('minute'): JalaaliMoment;
    jStartOf('second'): JalaaliMoment;
    jEndOf('second'): JalaaliMoment;
    format(format: string): string;
    jFormat(format: string): string;
    isValid(): boolean;
    jIsValid(): boolean;
    jIsLeapYear(): boolean;
    jDaysInMonth(): number;
    jWeeksInYear(): number;
    jWeeksInMonth(): number;
    jIsSame(other: JalaaliMoment | Date | string, unit?: string): boolean;
    jIsBefore(other: JalaaliMoment | Date | string, unit?: string): boolean;
    jIsAfter(other: JalaaliMoment | Date | string, unit?: string): boolean;
    jIsSameOrBefore(other: JalaaliMoment | Date | string, unit?: string): boolean;
    jIsSameOrAfter(other: JalaaliMoment | Date | string, unit?: string): boolean;
    jIsBetween(other1: JalaaliMoment | Date | string, other2: JalaaliMoment | Date | string, unit?: string): boolean;
  }

  interface MomentJalaali {
    (input?: string | number | Date | moment.Moment): JalaaliMoment;
    (jy: number, jm: number, jd: number): JalaaliMoment;
    (jy: number, jm: number, jd: number, h: number, m: number, s: number): JalaaliMoment;
    (jy: number, jm: number, jd: number, h: number, m: number, s: number, ms: number): JalaaliMoment;
    loadPersian(locale?: { dialect?: string; usePersianDigits?: boolean }): void;
  }

  const momentJalaali: MomentJalaali;
  export = momentJalaali;
} 