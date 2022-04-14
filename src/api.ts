import axios from "axios";
import { IPosition, DataResponse, IUser } from "./types";


export class ResponseDto {
    users: IUser[];
  
    next_url: string | null;
  
    constructor({ users, links }: any) {
      this.users = users;
      this.next_url = links.next_url;
    }
  
  }
  
export const usersAPI = {
    getUsers: async (url: string): Promise<ResponseDto> => {
        const response =  await axios.get(url)
        return new ResponseDto (response.data)
    },
    
    getPositions: async (): Promise<IPosition[]> => {
      const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`)
      return response.data.positions;
    }
}



export const authAPI = {
    getToken: async (): Promise<string> => {
        const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
        return response.data.token;
    },
    
    addUser: async (formData: any, token: string) => {
        const response = await axios.post('https://frontend-test-assignment-api.abz.agency/api/v1/users',
        formData, { 
            headers: { 
                'Token': token,
                'Content-Type': 'multipart/form-data'
            } 
        })
        return response;
    }
}

