import {
    ClockIcon,
    LockClosedIcon,
    MinusCircleIcon,
    PlusCircleIcon,
    StarIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/solid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import TextField from "components/common/TextField"
import Toggle from "components/common/Toggle"
import ToggleSwitch from "components/common/ToggleSwitch"
import { useUser } from "contexts/UserContext"
import Router from "next/router"
import { CreateTableRequest, GameMode, Points, Time } from "proto/table_pb"
import { useState } from "react"
import { postTable } from "services/table"

const CreateTable: React.FC = () => {
    console.log("CreateTable")
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.GAME_MODE_2_V_2)
    const [points, setPoints] = useState<Points>(Points.POINTS_21)
    const [time, setTime] = useState<Time>(Time.TIME_30S)
    const [isIber, setIsIber] = useState(true)
    const [isCheating, setIsCheating] = useState(false)
    const [password, setPassword] = useState<string>("")

    const { user } = useUser()

    const queryClient = useQueryClient()
    const postTableMutation = useMutation({
        mutationFn: postTable,
        onSuccess: ({ tableId }) => {
            queryClient.invalidateQueries({ queryKey: ["tables"] })
            Router.push(`/game/${tableId}`)
        },
        onError: (err) => {
            alert(err)
        },
    })

    const handleCreateTable = () => {
        console.log("handleCreateTable")

        const table = new CreateTableRequest({
            userId: user.uid,
            mode: gameMode,
            points: points,
            time: time,
            password: password,
            cheating: isCheating,
            iber: isIber,
        })

        postTableMutation.mutate(table)
    }

    return (
        <div className="flex flex-col justify-center gap-4 text-4xl font-semibold">
            <div className="grid grid-flow-row grid-cols-max-3 gap-x-4 gap-y-4">
                <div className="text-right">Game Mode</div>
                <div />
                <Toggle.Group
                    value={gameMode}
                    onChange={(value) => setGameMode(value)}
                >
                    <Toggle.Item value={GameMode.GAME_MODE_1_V_1}>
                        <div className="flex text-2xl">
                            <UserIcon className="w-6" />
                            vs
                            <UserIcon className="w-6" />
                        </div>
                    </Toggle.Item>
                    <Toggle.Item value={GameMode.GAME_MODE_1_V_1_V_1}>
                        <div className="flex text-2xl">
                            <UserIcon className="w-6" />
                            vs
                            <UserIcon className="w-6" />
                            vs
                            <UserIcon className="w-6" />
                        </div>
                    </Toggle.Item>
                    <Toggle.Item value={GameMode.GAME_MODE_2_V_2}>
                        <div className="flex text-2xl">
                            <UsersIcon className="w-6" />
                            vs
                            <UsersIcon className="w-6" />
                        </div>
                    </Toggle.Item>
                </Toggle.Group>

                <div className="text-right">Points</div>
                <StarIcon className="w-10 text-purple-300" />
                <div className="font-mono text-2xl">
                    <Toggle.Group
                        value={points}
                        onChange={(value) => setPoints(value)}
                    >
                        <Toggle.Item value={Points.POINTS_6}>06</Toggle.Item>
                        <Toggle.Item value={Points.POINTS_11}>11</Toggle.Item>
                        <Toggle.Item value={Points.POINTS_21}>21</Toggle.Item>
                    </Toggle.Group>
                </div>

                <div className="text-right">Time</div>
                <ClockIcon className="w-10 text-purple-300" />
                <div className="font-mono text-2xl">
                    <Toggle.Group
                        value={time}
                        onChange={(value) => setTime(value)}
                    >
                        <Toggle.Item value={Time.TIME_5S}>05</Toggle.Item>
                        <Toggle.Item value={Time.TIME_15S}>15</Toggle.Item>
                        <Toggle.Item value={Time.TIME_30S}>30</Toggle.Item>
                    </Toggle.Group>
                </div>

                <div className="text-right">Iber</div>
                <PlusCircleIcon className="w-10 text-purple-300" />
                <ToggleSwitch onChange={setIsIber} value={isIber} />

                <div className="text-right">Cheating</div>
                <MinusCircleIcon className="w-10 text-purple-300" />
                <ToggleSwitch onChange={setIsCheating} value={isCheating} />

                <div className="text-right">Password</div>
                <LockClosedIcon className="w-10 text-purple-300" />
                <TextField
                    value={password}
                    type="password"
                    onChange={setPassword}
                />
            </div>
            <Button onClick={handleCreateTable}>Create Table</Button>
        </div>
    )
}

export default CreateTable
