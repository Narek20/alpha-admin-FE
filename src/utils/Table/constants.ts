export const createTurnoverData = (
  name: string,
  turnover: string,
  qty: number
) => ({
  name,
  turnover,
  qty,
})

export const createStorageData = (
  id: number,
  date: string,
  storage: string,
  qty: number,
  status: string
) => ({
  id,
  date,
  storage,
  qty,
  status,
})
