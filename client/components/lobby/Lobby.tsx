import Button from "components/common/Button";
import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";
import GameMode from "./GameMode";
import { useState } from "react";
import Modal from "components/common/Modal";
import CreateTableForm from "./CreateTableForm";
import { getTables, joinTable } from "services/table";
import { IUser } from "types/game";
import Router from "next/router";
import { useUser } from "contexts/UserContext";
import JoinTableForm from "./JoinTableForm";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Table } from "proto/table_pb";

export default function Lobby() {
    const [showCreateTableModal, setCreateTableModal] = useState(false);
    const [selectedTable, setSelectedTable] = useState<Table | null>(null)

    const { user } = useUser();

    const { data } = useQuery({
        queryKey: ['tables'],
        queryFn: getTables,
    })

    const joinTableMutation = useMutation({
        mutationFn: (id: number) => joinTable(id),
        onSuccess: (id) => {
            console.log(id)
            Router.push(`/game/${id}`)
        }
    })

    const tables1v1 = data?.tables.filter(table => table.mode === 0) || []
    const tables1v1v1 = data?.tables.filter(table => table.mode === 1) || []
    const tables2v2 = data?.tables.filter(table => table.mode === 2) || []

    const handleJoinTable = (id: number) => {
        setSelectedTable(null);
        joinTableMutation.mutate(id)
    }

    const handleJoin = (table: Table) => {
        if (table?.password) {
            setSelectedTable(table);
            return;
        }

        handleJoinTable(table.id)
    }

    return (
        <div className="relative h-full">
            {showCreateTableModal && (
                <Modal
                    onClose={() => setCreateTableModal(false)}
                >
                    <CreateTableForm />
                </Modal>
            )}
            {selectedTable && (
                <Modal
                    onClose={() => setSelectedTable(null)}
                >
                    <JoinTableForm table={selectedTable} onTableJoined={handleJoinTable} />
                </Modal>
            )}
            <div className="flex flex-col gap-4 p-3 h-full">
                <div className="flex justify-center">
                    <Button
                        onClick={() => setCreateTableModal(true)}
                    >
                        <PlusIcon className="w-10 h-10" />
                    </Button>
                </div>
                <div className="flex gap-16 px-4 h-full justify-center overflow-hidden">
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>}
                        games={tables1v1}
                        onJoin={handleJoin}
                    />
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                            vs
                            <UserIcon className="w-16 text-purple-300" />
                        </div>}
                        games={tables1v1v1}
                        onJoin={handleJoin}
                    />
                    <GameMode title={
                        <div className="flex items-center gap-2">
                            <UsersIcon className="w-16 text-purple-300" />
                            vs
                            <UsersIcon className="w-16 text-purple-300" />
                        </div>}
                        games={tables2v2}
                        onJoin={handleJoin}
                    />
                </div>
            </div>
        </div>
    )
}
