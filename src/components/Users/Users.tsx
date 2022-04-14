import { FC, useEffect, useState } from 'react'
import {  usersAPI } from '../../api'
import { AppButton } from '../../common/AppButton'
import { AppSpinner } from '../../common/AppSpinner/AppSpinner'
import { UserCard } from './UserCard'
import { IUser } from '../../types'

interface IProps {
    
}

export const Users: FC<IProps> = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [next, setNext] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')


  const fetchUsers = async () => {
    setLoading(true)
    setError('')

    const initialUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6`;

    try {
      const response = await usersAPI.getUsers(initialUrl);
      
      setUsers(response.users)
      setNext(response.next_url)

    } catch (error: any) {
      setError(error.message || 'Some error')

    } finally {
      setLoading(false)
    }
  }

  useEffect( () => {
    fetchUsers()
  }, [])

  const showMoreUsers = async () => {
    if(next) {
        setLoading(true)
        try {
          const data = await usersAPI.getUsers(next)
          // const response = await axios.get(next)
          // const data = new ResponseDto(response.data)
          setUsers((prev: any) => [...data.users, ...prev])
          setNext(data.next_url)
        } catch (error: any) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
        
      }
    }
    

    return (
      <div className='sect'>
          <h1 className='sectionTitle pb-12'>Working with GET request</h1>
          {
            users.length <= 0  ? 
                <div className='flex text-gray-100 text-5xl justify-center text-center py-12'>Fetching data...</div>
              : (
                <div className=" grid md:grid-cols-3 grid-cols-1 gap-8 pb-12">
                  {users.map((user) => (
                    <UserCard
                      key={user.id}
                      user={user}
                    />
                  )) }
                </div> 
                
              )}

          {
              loading && (
                <div className='text-center py-10'><AppSpinner /></div>
              )
            }

          <div className='text-center'>
            <AppButton 
              title="Show more" 
              type={'primary'}
              onClickHandler={showMoreUsers} 
              disabled={loading || !next}  
            />
          </div>
        
      </div>
    )
}

export default Users
