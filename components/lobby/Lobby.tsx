import Button from "components/common/Button";
import { PlusIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";
import GameMode from "./GameMode";
import { useEffect, useState } from "react";
import Modal from "components/common/Modal";
import CreateTableForm from "./CreateTableForm";
import { getTables, joinTable } from "services/table";
import { ITable, IUser } from "types/game";
import io, { Socket } from "socket.io-client";
import Router from "next/router";
import { gameSocket } from "utils/sockets";
import { useUser } from "contexts/UserContext";
import JoinTableForm from "./JoinTableForm";

// let tableSocket: Socket;

export default function Lobby() {
    const [showTableModal, setShowTableModal] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [table, setTable] = useState<ITable>({} as ITable);
    const [tables, setTables] = useState<ITable[]>([]);

    const [ping, setPing] = useState(0);

    const { user } = useUser();

    const tables1v1 = tables.filter(table => table.gameMode === 0);
    const tables1v1v1 = tables.filter(table => table.gameMode === 1);
    const tables2v2 = tables.filter(table => table.gameMode === 2);

    useEffect(() => {
        getTables()
            .then(res => {
                const tables: ITable[] = res.data

                setTables(tables)
                setTimeout(() => setPing(ping + 1), 1000)
            })
    }, [ping])

    const handleTableModal = () => {
        setShowTableModal(true);
    }

    const handleCreateTable = (table: ITable) => {
        gameSocket.emit('create-game', {gameId: table.id, user: {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL,
        }})
    }

    const handleJoinTable = (id: string) => {
        const usr: IUser = {
            uid: user.uid,
            name: user.displayName,
            photo: user.photoURL,
        }

        gameSocket.emit('join-game', {gameId: id, user: usr})
        setShowPasswordModal(false);
        
        joinTable(id, usr)
            .then(_ => {
                Router.push(`/game/${id}`)
            })
            .catch(err => console.log(err))
    }

    const handleJoin = (table: ITable) => {
        if (table.password !== "") {
            setTable(table);
            setShowPasswordModal(true);
            return;
        }
        
        handleJoinTable(table.id)
    }

    return (
        <div className="relative h-full">
            {showTableModal && (
                <Modal
                    onClose={() => setShowTableModal(false)}
                >
                    <CreateTableForm onTableCreated={handleCreateTable} />
                </Modal>
            )}
            {showPasswordModal && (
                <Modal
                    onClose={() => setShowPasswordModal(false)}
                >
                    <JoinTableForm table={table} onTableJoined={handleJoinTable} />
                </Modal>
            )}
            <div className="flex flex-col gap-4 p-3 h-full">
                <div className="flex justify-center">
                    <Button
                        onClick={handleTableModal}
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