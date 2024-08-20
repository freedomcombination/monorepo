import { isPast } from "date-fns/isPast"

import { Course, CourseApplication } from "@fc/types"

import { calculateRemainingPrice } from "./calculateRemainingPrice"

export const getGeneralStatus = (course: Course, application: CourseApplication) => {
  const remaining = calculateRemainingPrice(course, application);
  const hasFinished = isPast(course.endDate);
  const hasStarted = isPast(course.startDate);

  if (remaining > 0) {
    if (hasFinished) {
      return `Biten kurs için ödenmemiş ${remaining} euro ücret görünüyor.`;
    }

    if (hasStarted) {
      return `Devam eden kurs için ödenmemiş ${remaining} euro ücret görünüyor.`;
    }

    return `Kurs ${course.startDate} tarihinde başlayacak ve ${remaining} euro ödenmemiş ücret görünüyor.`;
  }

  if (isPast(course.endDate)) {
    return 'Kurs bitmiş.';
  }

  if (isPast(course.startDate)) {
    return 'Kurs devam ediyor.';
  }

  return `Kurs ${course.startDate} tarihinde başlayacak.`;
};
