export const indicatorColor = (load: number): string => {
  if (load > 0 && load < 40) {
    return 'redLoad'
  } else if (load >= 40 && load <= 60) {
    return 'yellowLoad'
  }

  return 'greenLoad'
}

export const percentColor = (load: number): string => {
  if (load > 0 && load < 40) {
    return 'red'
  } else if (load >= 40 && load <= 60) {
    return 'yellow'
  }

  return 'green'
}
