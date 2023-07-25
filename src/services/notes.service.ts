import { axiosInstance } from './axios.service'
import { INotes } from 'types/notes.types'
import { IResponse } from 'types/response.types'
import { NotesEndpoints } from 'types/endpoints.types'

export const getAllNotes = async (): Promise<IResponse> => {
  try {
    const data = await axiosInstance.get(NotesEndpoints.NOTES)

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const createNotes = async (
  NotesData: {title: string, note: string}
): Promise<IResponse> => {
  try {
    const data = await axiosInstance.post(
      NotesEndpoints.NOTES_CREATE,
      NotesData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.response.data.message,
    }
  }
}

export const updateNotes = async (NotesData: INotes): Promise<IResponse> => {
  try {
    const data = await axiosInstance.put(
      NotesEndpoints.NOTES_UPDATE + NotesData.id,
      NotesData
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}

export const removeNotes = async (noteId: number): Promise<IResponse> => {
  try {
    const data = await axiosInstance.delete(
      NotesEndpoints.NOTES_DELETE + noteId
    )

    return data.data
  } catch (err: any) {
    return {
      success: false,
      message: err.message,
    }
  }
}
