/// <reference types="vite/client" />

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import api from '@/apis/axios.instance'
import { toastService } from '@components/common/common-toastmessage'
import {
  ADMIN_PROFILE_GET,
  CHANGE_PASSWORD_PATCH,
  FORGOT_PASSWORD_POST,
  LOGIN_POST,
  LOGOUT_DELETE,
  RESEND_EMAIL_POST,
  RESET_PASSWORD_POST,
  TOKEN_POST,
  UPDATE_PROFILE,
} from '@/constants/api-endpoints'

// Local types adapted from reference
type ApiResponse<T> = { data: T; message?: string }

export type Admin = {
  _id: string
  firstName: string | null
  lastName: string | null
  email: string | null
  phoneNumber: string | null
  pictureUrl: string | null
  profilePic: string | null
}

export type AuthState = {
  admin: Admin
}

type ResponseToken = {
  isValid: boolean
}

const INITIAL_STATE: AuthState = {
  admin: {
    _id: '',
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    pictureUrl: null,
    profilePic: null,
  },
}

export const login = createAsyncThunk('auth/login', async (payload: { identifier: string; password: string }, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<{ token?: string }>>(LOGIN_POST, payload)
    const token = res.data?.data?.token
    if (token) localStorage.setItem('auth_token', token)
    toastService.showToast(res.data?.message || 'Logged in successfully', 'success')
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<unknown>>(LOGOUT_DELETE, {})
    localStorage.removeItem('auth_token')
    toastService.showToast(res.data?.message || 'Logged out', 'success')
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const getProfile = createAsyncThunk('auth/getProfile', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get<ApiResponse<Admin>>(ADMIN_PROFILE_GET)
    return res.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (payload: { identifier: string }, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<unknown>>(FORGOT_PASSWORD_POST, payload)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const resendEmail = createAsyncThunk('auth/resendEmail', async (payload: { identifier: string }, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<unknown>>(RESEND_EMAIL_POST, payload)
    toastService.showToast(res.data?.message || 'Email sent', 'success')
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: { password: string; token: string }, { rejectWithValue }) => {
    try {
      const { password, token } = payload
      const res = await api.post<ApiResponse<unknown>>(RESET_PASSWORD_POST, { password }, {
        headers: { authorization: `Bearer ${token}` },
      })
      toastService.showToast(res.data?.message || 'Password reset successfully', 'success')
      return res.data
    } catch (error: unknown) {
      const axiosErr = error as AxiosError<{ message?: string }>
      const message = axiosErr?.response?.data?.message
      if (message) toastService.showToast(message, 'error')
      return rejectWithValue(error)
    }
  }
)

export const changePassword = createAsyncThunk('auth/changePassword', async (payload: { currentPassword: string; newPassword: string }, { rejectWithValue }) => {
  try {
    const res = await api.put<ApiResponse<unknown>>(CHANGE_PASSWORD_PATCH, payload)
    toastService.showToast('Password successfully updated', 'success')
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const updateProfile = createAsyncThunk('auth/updateProfile', async (payload: FormData, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.put<ApiResponse<unknown>>(UPDATE_PROFILE, payload)
    toastService.showToast(res.data?.message || 'Profile updated', 'success')
    dispatch(getProfile())
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const verifyResetToken = createAsyncThunk('auth/verifyResetToken', async (token: string, { rejectWithValue }) => {
  try {
    const res = await api.post<ApiResponse<ResponseToken>>(TOKEN_POST, { token })
    return res.data.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState: { ...INITIAL_STATE } as AuthState,
  reducers: {
    setAdmin: (state: AuthState, action: PayloadAction<Admin>) => {
      state.admin = { ...state.admin, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      const { profilePic, ...rest } = action.payload
      state.admin = {
        ...rest,
        profilePic: profilePic || null,
        pictureUrl: profilePic ? `${import.meta.env.VITE_APP_MEDIA_BASE_URL}/${profilePic}` : null,
      }
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.admin = { ...INITIAL_STATE.admin }
    })
  },
})

export const { setAdmin } = authSlice.actions

type RootStateLite = { auth?: { admin: Admin } }
export const selectAdmin = (state: RootStateLite) => state.auth?.admin as Admin

export default authSlice.reducer


