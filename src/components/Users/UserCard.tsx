import { FC } from 'react'
import { IUser } from '../../types'

interface IProps {
    user: IUser;
}

export const UserCard: FC<IProps> = ({ user }) => {
    return (
        <div
            className='bg-white rounded-lg py-5 px-4 text-center'
        >
            <img 
                src={user.photo} 
                className='h-70 w-70 rounded-full mx-auto' 
                alt={user.name} 
            />
            <div className='my-4'>{user.name}</div>

            <div >{user.position}</div>
            <div className='truncate'>{user.email}</div>
            <div>{user.phone}</div>

      </div>
    )
}
