import { UserIcon } from "@heroicons/react/outline"
import {
    ClockIcon,
    LockClosedIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    StarIcon,
} from "@heroicons/react/solid"
import { Points, Table, Time } from "proto/table_pb"

const GameModeItem: React.FC<{
    table: Table
    onJoin: (table: Table) => void
}> = ({ table, onJoin }) => {
    const full = table?.joined === 4
    const transition = "transition-colors ease-in-out duration-300"

    const handleJoinTable = () => {
        if (full) return

        onJoin(table)
    }

    console.log(table)

    const points = tablePoints(table.points)
    const time = tableTime(table.time)

    return (
        <div
            className={`group flex w-full cursor-pointer overflow-hidden rounded-xl ${full && "pointer-events-none"}`}
            onClick={handleJoinTable}
        >
            <div
                className={`${full ? "bg-red-400" : "bg-purple-300"} w-3 ${transition} group-hover:bg-dark-1`}
            />
            <div
                className={`grid grow grid-flow-row grid-cols-2 gap-y-1 bg-dark-1 py-2 px-3 ${transition} group-hover:bg-purple-300`}
            >
                <div className="text-xl font-bold">{table.name}</div>
                <div className="justify-self-end">
                    {table?.password && (
                        <LockClosedIcon
                            className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`}
                        />
                    )}
                </div>
                <div className="flex gap-1">
                    {[...Array(table?.joined || 2)].map((_, index) => (
                        <UserIcon
                            key={index}
                            className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`}
                        />
                    ))}
                </div>
                <div className="relative flex items-center gap-1 justify-self-end text-xl font-semibold">
                    {table.iber && (
                        <PlusCircleIcon
                            className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`}
                        />
                    )}
                    {table.cheating && (
                        <MinusCircleIcon
                            className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`}
                        />
                    )}
                    {points}p
                    <StarIcon
                        className={`w-7 text-purple-300 ${transition} group-hover:text-dark-1`}
                    />
                    {time}s
                    <ClockIcon
                        className={`w-6 text-purple-300 ${transition} group-hover:text-dark-1`}
                    />
                </div>
            </div>
        </div>
    )
}

const tablePoints = (points: Points) => {
    switch (points) {
        case Points.POINTS_6:
            return 6
        case Points.POINTS_11:
            return 11
        case Points.POINTS_21:
            return 21
    }
}

const tableTime = (time: Time) => {
    switch (time) {
        case Time.TIME_5S:
            return 5
        case Time.TIME_15S:
            return 15
        case Time.TIME_30S:
            return 30
    }
}

export default GameModeItem
