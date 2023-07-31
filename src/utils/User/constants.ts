export const TranslatedUserStatuses = {
  admin: { label: 'Ադմին', key: 'admin' },
  user: { label: 'Աշխատակից', key: 'user' },
  manager: { label: 'Մենեջեր', key: 'manager' },
}

export const getUserStatusKey = (label: string) => {
  switch (label) {
    case 'Ադմին':
      return 'admin'
    case 'Աշխատակից':
      return 'user'
    default:
      return 'manager'
  }
}
