import React, { FC } from 'react'

interface IProps {
    title: string;
    type: string;
    onClickHandler?: () => void;
    disabled?: boolean;
}

export const AppButton: FC<IProps> = ({ 
    title, 
    type = 'primary',
    onClickHandler,
    disabled
}) => {
    return (
        <button
            onClick={onClickHandler}
            disabled={disabled}
            className={`button
                ${type === 'primary' ? ' bg-[#F4E041]' : ''}
                ${disabled && ' disabled'}
            `}
        >
            {title}
      </button>
    )
}
