import cronstrue from 'cronstrue'

export const defaultCronOptions = {
  EVERY_MINUTE: {
    key: 'Every minute',
    value: '* * * * *',
  },
  EVERY_FIVE_MINUTES: {
    key: 'Every 5 minutes',
    value: '*/5 * * * *',
  },
  EVERY_TEN_MINUTES: {
    key: 'Every 10 minutes',
    value: '*/10 * * * *',
  },
  EVERY_HOUR: {
    key: 'Every hour',
    value: '1 */1 * * *',
  },
  EVERY_DAY: {
    key: 'Every 24 hours',
    value: '1 */24 * * *',
  },
}

export const getHumanReadableFromCron = (cron: string): string => {
  try {
    const result = cronstrue.toString(cron)

    if (!result.includes('undefined')) {
      return result
    }
  } catch (error) {
    return ''
  }

  return ''
}
