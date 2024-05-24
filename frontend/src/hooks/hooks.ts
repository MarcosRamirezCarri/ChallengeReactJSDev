import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../app/store'

export const useAppSelector = useSelector.withTypes<RootState>()

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

