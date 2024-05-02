interface PrivateToggleButtonProps<Type> {
    children: React.ReactNode;
    value: Type;
    selected: boolean;
    onClick: (value: Type) => void;
}

interface ToggleItemProps<Type> {
    children: React.ReactNode;
    value: Type;
}

interface ToggleButtonGroupProps<Type> {
    children: React.ReactElement<ToggleItemProps<Type>>[];
    value: Type;
    onChange: (value: Type) => void;
}

export default class Toggle {
    static __Item<Type>({ children, value, selected, onClick }: PrivateToggleButtonProps<Type>) {
        return (
            <div className={`h-10 w-min px-3 py-1 rounded-md transition-colors duration-150 ease-linear
                    ${selected ? 'bg-purple-300 cursor-default text-dark-1' : 'bg-dark-1 hover:bg-purple-300 cursor-pointer'}`}
                onClick={() => onClick(value)}
            >
                {children}
            </div>
        )
    }

    static Item<Type>({ children, value }: ToggleItemProps<Type>) {
        return (<></>)
    }

    static Group<Type>({ children, value, onChange }: ToggleButtonGroupProps<Type>) {
        const selected = value

        return (
            <div className="flex gap-2">
                {children.map(({ props: { children, value } }, index) => (
                    <Toggle.__Item
                        key={index}
                        value={value}
                        selected={selected === value}
                        onClick={onChange}
                    >
                        {children}
                    </Toggle.__Item>
                ))}
            </div>
        )
    }
}