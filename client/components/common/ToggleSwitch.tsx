interface ToggleProps {
    onChange: (value: boolean) => void
    value: boolean
}

export default function Toggle({ onChange, value }: ToggleProps) {
    return (
        <div
            className={`relative h-10 w-20 cursor-pointer rounded-full transition duration-200 ease-linear ${value ? "bg-purple-300" : "bg-dark-1"}`}
            onClick={() => onChange(!value)}
        >
            <div
                className={`absolute h-10 w-10 transform cursor-pointer rounded-full border-4 transition duration-100 ease-linear 
                ${value ? "translate-x-full border-purple-300 bg-dark-1" : "translate-x-0 border-dark-1 bg-white"}`}
            />
        </div>
    )
}
