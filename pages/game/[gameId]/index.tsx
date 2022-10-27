import Game from "components/game/Game";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { getTable } from "services/table";
import { ITable } from "types/game";

interface GamePageProps {
    id: string;
}

export default function GamePage({ id }: GamePageProps) {
    const [table, setTable] = useState<ITable>();

    useEffect(() => {
        getTable(id)
            .then(res => setTable(res.data))
            .catch(err => console.log(err));

    }, [id]);

    return (
        <>
            {table && <Game id={id} table={table} />}
        </>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { gameId } = context.query;
    
    return {
        props: {
            id: gameId as string
        }
    }
}