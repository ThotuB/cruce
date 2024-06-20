import { useQuery } from "@tanstack/react-query"
import Game from "components/game/Game"
import { NextPageContext } from "next"
import { getTable } from "services/table"

const GamePage: React.FC<{
    id: number
}> = ({ id }) => {
    const { data, isLoading } = useQuery({
        queryKey: ["current-game"],
        queryFn: () => getTable(id),
    })

    return (
        <>
            {isLoading ? (
                <div>LOADING</div>
            ) : (
                <>
                    {data?.table ? (
                        <Game id={id} table={data.table} />
                    ) : (
                        <div>NOT FOUND</div>
                    )}
                </>
            )}
        </>
    )
}

export const getServerSideProps = async (context: NextPageContext) => {
    const { gameId } = context.query

    if (typeof gameId !== "string") {
        return {
            props: {},
        }
    }

    const id = parseInt(gameId)

    return {
        props: {
            id,
        },
    }
}

export default GamePage
