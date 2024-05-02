import { UserIcon, UsersIcon, LockClosedIcon, ClockIcon, StarIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/solid";
import TextField from "components/common/TextField";
import { useState } from "react";
import Button from "components/common/Button";
import { GameMode, Points, Table, Time } from "proto/table_pb";

const JoinTable: React.FC<{
    table: Table;
    onTableJoined: (id: number) => void;
}> = ({ table: { id, mode, name, time, points, password, cheating, iber }, onTableJoined }) => {
    const [passwordField, setPasswordField] = useState("");
    const [wrongPassword, setWrongPassword] = useState(false);

    const handleJoinTable = async () => {
        if (passwordField !== password) return setWrongPassword(true);

        onTableJoined(id)
    }

    return (
        <div className="flex flex-col gap-10 items-center font-semibold text-4xl">
            <div className="text-5xl font-black">
                {name}
            </div>
            <div className="grid grid-cols-max-3 grid-flow-row gap-x-4 gap-y-4">
                <div className="text-right">
                    Game Mode
                </div>
                <div />
                <div className="flex text-2xl h-10 w-min px-3 py-1 rounded-md bg-purple-300 cursor-default text-dark-1">
                    {{
                        [GameMode.GAME_MODE_1_V_1]:
                            <>
                                <UserIcon className="w-6" />
                                vs
                                <UserIcon className="w-6" />
                            </>,
                        [GameMode.GAME_MODE_1_V_1_V_1]:
                            <>
                                <UserIcon className="w-6" />
                                vs
                                <UserIcon className="w-6" />
                                vs
                                <UserIcon className="w-6" />
                            </>,
                        [GameMode.GAME_MODE_2_V_2]:
                            <>
                                <UsersIcon className="w-6" />
                                vs
                                <UsersIcon className="w-6" />
                            </>
                    }[mode]}
                </div>


                <div className="text-right">
                    Points
                </div>
                <StarIcon className="w-10 text-purple-300" />
                <div className="text-2xl font-mono flex h-10 w-min px-3 py-1 rounded-md bg-purple-300 cursor-default text-dark-1">
                    {{
                        [Points.POINTS_6]: "6",
                        [Points.POINTS_11]: "11",
                        [Points.POINTS_21]: "21"
                    }[points]}
                </div>


                <div className="text-right">
                    Time
                </div>
                <ClockIcon className="w-10 text-purple-300" />
                <div className="flex text-2xl h-10 w-min px-3 py-1 rounded-md bg-purple-300 cursor-default text-dark-1 font-mono">
                    {{
                        [Time.TIME_5S]: "5s",
                        [Time.TIME_15S]: "15s",
                        [Time.TIME_30S]: "30s"
                    }[time]}
                </div>


                <div className="text-right">
                    Iber
                </div>
                <PlusCircleIcon className="w-10 text-purple-300" />
                <div className="w-10 h-10 border-4 rounded-full bg-dark-1 border-purple-300 flex items-center justify-center">
                    {iber &&
                        <div className="w-6 h-6 rounded-full bg-purple-300" />
                    }
                </div>

                <div className="text-right">
                    Cheating
                </div>
                <MinusCircleIcon className="w-10 text-purple-300" />
                <div className="w-10 h-10 border-4 rounded-full bg-dark-1 border-purple-300 flex items-center justify-center">
                    {cheating &&
                        <div className="w-6 h-6 rounded-full bg-purple-300" />
                    }
                </div>

                <div className="text-right">
                    Password
                </div>
                <LockClosedIcon className="w-10 text-purple-300" />
                <TextField
                    value={passwordField}
                    warning={wrongPassword}
                    type="password"
                    onChange={setPasswordField}
                />
            </div>
            <Button
                onClick={handleJoinTable}
            >
                Join Table
            </Button>
        </div>
    )
}

export default JoinTable
