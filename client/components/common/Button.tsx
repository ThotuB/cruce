interface ButtonProps {
    children: React.ReactNode
    disabled?: boolean
    onClick: () => void
}

export default function Button({ children, disabled, onClick }: ButtonProps) {
    return (
        <button
            className="transform rounded-md bg-dark-1 py-2 px-4 text-white transition-colors duration-100 hover:bg-purple-300 active:bg-purple-300 active:text-dark-1"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
