declare module "moment-jalaali" {
  import moment from "moment";

  type JUnit = "year" | "month" | "week" | "day" | "hour" | "minute" | "second";

  interface JalaaliMoment extends moment.Moment {
    jYear(): number;
    jMonth(): number;
    jDate(): number;
    jDayOfYear(): number;
    jWeekOfYear(): number;
    jWeek(): number;
    jQuarter(): number;

    jStartOf(unit: JUnit): JalaaliMoment;
    jEndOf(unit: JUnit): JalaaliMoment;
    jAdd(amount: number, unit: JUnit): JalaaliMoment;
    jSubtract(amount: number, unit: JUnit): JalaaliMoment;

    format(format: string): string;
    jFormat(format: string): string;
    isValid(): boolean;
    jIsValid(): boolean;

    jIsLeapYear(): boolean;
    jDaysInMonth(): number;
    jWeeksInYear(): number;
    jWeeksInMonth(): number;

    jIsSame(other: JalaaliMoment | Date | string, unit?: JUnit): boolean;
    jIsBefore(other: JalaaliMoment | Date | string, unit?: JUnit): boolean;
    jIsAfter(other: JalaaliMoment | Date | string, unit?: JUnit): boolean;
    jIsSameOrBefore(
      other: JalaaliMoment | Date | string,
      unit?: JUnit
    ): boolean;
    jIsSameOrAfter(other: JalaaliMoment | Date | string, unit?: JUnit): boolean;
    jIsBetween(
      other1: JalaaliMoment | Date | string,
      other2: JalaaliMoment | Date | string,
      unit?: JUnit
    ): boolean;
  }

  interface MomentJalaali {
    (input?: string | number | Date | moment.Moment): JalaaliMoment;
    (jy: number, jm: number, jd: number): JalaaliMoment;
    (
      jy: number,
      jm: number,
      jd: number,
      h: number,
      m: number,
      s: number
    ): JalaaliMoment;
    (
      jy: number,
      jm: number,
      jd: number,
      h: number,
      m: number,
      s: number,
      ms: number
    ): JalaaliMoment;
    loadPersian(locale?: {
      dialect?: string;
      usePersianDigits?: boolean;
    }): void;
  }

  const momentJalaali: MomentJalaali;
  export = momentJalaali;
}
