import { proModeProps } from "../pro-mode"

export interface userDataProps {
    userData: {
        profile?: {
            email: string,
            firstName: string,
            name: string,
            phoneNumber: string,
        }
        proMode?: proModeProps | undefined 
    }
}