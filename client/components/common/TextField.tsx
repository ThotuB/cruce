const TextField: React.FC<{
    value: string;
    warning?: boolean;
    type: string;
    placeholder?: string;
    title?: string;
    onChange: (value: string) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}> = ({ value, warning, type, placeholder, title, onChange, onKeyDown }) => {
    return (
        <input className={`h-10 w-full border-2 bg-dark-1 px-3 py-4 rounded-md text-md focus:outline-none ${warning ? 'border-rose-500 caret-rose-500' : 'border-dark-1 caret-purple-300'}`}
            title={title}
            placeholder={placeholder}
            type={type}
            value={value}
            autoComplete="game-password"
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
        />
    )
}

export default TextField
