interface ButtonProps {
    children: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({ children, disabled, onClick }: ButtonProps) {
    return (
        <button className="bg-dark-1 text-white py-2 px-4 rounded-md transition-colors duration-100 transform hover:bg-purple-300 active:bg-purple-300 active:text-dark-1"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}