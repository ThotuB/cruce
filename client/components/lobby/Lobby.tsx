import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid"
import { useMutation, useQuery } from "@tanstack/react-query"
import Button from "components/common/Button"
import Modal from "components/common/Modal"
import { useUser } from "contexts/UserContext"
import Router from "next/router"
import { Table } from "proto/table_pb"
import { useState } from "react"
import { getTables, joinTable } from "services/table"
import CreateTableForm from "./CreateTableForm"
import GameMode from "./GameMode"
import JoinTableForm from "./JoinTableForm"

type JoinTableMutation = {
    table_id: number
    user_id: string
}

export default function Lobby() {
    const [showCreateTableModal, setCreateTableModal] = useState(false)
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)

    const { user } = useUser()

    const { data } = useQuery({
        queryKey: ["tables"],
        queryFn: getTables,
    })

    const joinTableMutation = useMutation({
        mutationFn: (v: JoinTableMutation) => joinTable(v.table_id, v.user_id),
        onSuccess: (id) => {
            console.log(id)
            Router.push(`/game/${id}`)
        },
    })

    const tables1v1 = data?.tables.filter((table) => table.mode === 0) || []
    const tables1v1v1 = data?.tables.filter((table) => table.mode === 1) || []
    const tables2v2 = data?.tables.filter((table) => table.mode === 2) || []

    const handleJoinTable = (id: number) => {
        setSelectedTable(null)
        joinTableMutation.mutate({
            table_id: id,
            user_id: user.uid,
        })
    }

    const handleJoin = (table: Table) => {
        if (table?.password) {
            setSelectedTable(table)
            return
        }

        handleJoinTable(table.id)
    }

    return (
        <div className="relative h-full">
            {showCreateTableModal && (
                <Modal onClose={() => setCreateTableModal(false)}>
                    <CreateTableForm />
                </Modal>
            )}
            {selectedTable && (
                <Modal onClose={() => setSelectedTable(null)}>
                    <JoinTableForm
                        table={selectedTable}
                        onTableJoined={handleJoinTable}
                    />
                </Modal>
            )}
            <div className="flex h-full flex-col gap-4 p-3">
                <div className="flex justify-center">
                    <Button onClick={() => setCreateTableModal(true)}>
                        <PlusIcon className="h-10 w-10" />
                    </Button>
                </div>
                <div className="flex h-full flex-col justify-center gap-4 px-4 2xl:flex-row 2xl:gap-16">
                    <GameMode
                        title={
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-16 text-purple-300" />
                                vs
                                <UserIcon className="w-16 text-purple-300" />
                            </div>
                        }
                        games={tables1v1}
                        onJoin={handleJoin}
                    />
                    <GameMode
                        title={
                            <div className="flex items-center gap-2">
                                <UserIcon className="w-16 text-purple-300" />
                                vs
                                <UserIcon className="w-16 text-purple-300" />
                                vs
                                <UserIcon className="w-16 text-purple-300" />
                            </div>
                        }
                        games={tables1v1v1}
                        onJoin={handleJoin}
                    />
                    <GameMode
                        title={
                            <div className="flex items-center gap-2">
                                <UsersIcon className="w-16 text-purple-300" />
                                vs
                                <UsersIcon className="w-16 text-purple-300" />
                            </div>
                        }
                        games={tables2v2}
                        onJoin={handleJoin}
                    />
                </div>
            </div>
        </div>
    )
}
