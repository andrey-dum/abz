import { AppButton } from '../common/AppButton'
import { AppLogo } from '../common/AppLogo'

export const Header = () => {
    return (
      <div className='max-w-[1024px] mx-auto py-2 bg-white 
        flex justify-between  sm:px-0 px-2'>
            <AppLogo />
          
            <div className='space-x-2'>
                <AppButton
                    title="Users"
                    type="primary"
                />
                
                <AppButton
                    title="Sign Up"
                    type="primary"
                />
            </div>
        
      </div>
    )
}
