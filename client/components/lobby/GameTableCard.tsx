import { LockClosedIcon, ClockIcon, StarIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid"
import { UserIcon } from "@heroicons/react/outline"
import type { ITable, IUser } from "types/game"
import { useUser } from "contexts/UserContext"
import { Table } from "proto/table_pb";

const GameTableCard: React.FC<{
    table: Table,
    onJoin: (table: Table) => void
}> = ({ table, onJoin }) => {
    const full = table?.joined === 4
    const transition = "transition-colors ease-in-out duration-300"

    const handleJoinTable = () => {
        if (full) return

        onJoin(table)
    }

    return (
        <div className="w-full h-20 min-h-min">
            <div className={`group rounded-xl flex w-full h-full overflow-hidden cursor-pointer ${full && 'pointer-events-none'}`}
                onClick={handleJoinTable}
            >
                <div className={`${full ? "bg-red-400" : "bg-purple-300"} w-3 ${transition} group-hover:bg-dark-1`} />
                <div className={`py-2 px-3 bg-dark-1 grow grid grid-flow-row grid-cols-2 ${transition} group-hover:bg-purple-300`}>
                    <div className="font-bold text-xl">
                        {table?.name}
                    </div>
                    <div className="justify-self-end">
                        {table?.password && <LockClosedIcon className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`} />}
                    </div>
                    <div className="flex gap-1">
                        {[...Array(table?.joined || 2)].map((_, index) => (
                            <UserIcon key={index} className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`} />
                        ))}
                    </div>
                    <div className="relative flex gap-1 justify-self-end text-xl font-semibold items-center">
                        {table.iber && <PlusCircleIcon className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`} />}
                        {table.cheating && <MinusCircleIcon className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`} />}
                        {table.points}
                        <StarIcon className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`} />
                        {table.time}
                        <ClockIcon className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameTableCard
