import { Button } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
}

export function CustomButton({ children, onClick, disabled }: ButtonProps) {
  return (
    <Button as={Fragment}>
      {({ hover, active }) => (
        <button
          className={clsx(
            'py-2 px-4 text-sm text-white border-2 border-solid border-white',
            hover && 'bg-white text-black',
            active && 'bg-[#181818]'
          )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
      )}
    </Button>
  )
}