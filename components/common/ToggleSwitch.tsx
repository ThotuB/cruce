interface ToggleProps {
    onChange: (value: boolean) => void;
    value: boolean;
}

export default function Toggle({ onChange, value }: ToggleProps) {
    return (
        <div className={`relative w-20 h-10 transition duration-200 ease-linear rounded-full cursor-pointer ${value ? 'bg-purple-300' : 'bg-dark-1'}`}
            onClick={() => onChange(!value)}
        > 
            <div className={`absolute w-10 h-10 border-4 transition duration-100 ease-linear cursor-pointer transform rounded-full 
                ${value ? 'translate-x-full border-purple-300 bg-dark-1' : 'translate-x-0 border-dark-1 bg-white'}`}
            />
        </div>
    )
}