import { isPast } from "date-fns/isPast"

import { Course, CourseApplication } from "@fc/types"

import { calculateRemainingPrice } from "./calculateRemainingPrice"

export const getGeneralStatus = (course: Course, application: CourseApplication) => {
  const remaining = calculateRemainingPrice(course, application);
  const hasFinished = isPast(course.endDate);
  const hasStarted = isPast(course.startDate);

  if (remaining > 0) {
    if (hasFinished) {
      return { message: `Biten kurs için ödenmemiş ${remaining} euro ücret görünüyor.`, color: 'red' };
    }

    if (hasStarted) {
      return { message: `Devam eden kurs için ödenmemiş ${remaining} euro ücret görünüyor.`, color: 'red' };
    }

    return { message: `Kurs ${course.startDate} tarihinde başlayacak ve ${remaining} euro ödenmemiş ücret görünüyor.`, color: 'red' };
  }

  if (hasFinished) {
    return { message: 'Kurs bitmiş.', color: 'green' };
  }

  if (hasStarted) {
    return { message: 'Kurs devam ediyor.', color: 'green' };
  }

  return { message: `Kurs ${course.startDate} tarihinde başlayacak.`, color: 'green' };
};
