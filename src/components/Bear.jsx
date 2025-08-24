import useStore from "../store/exp_store"


export const Bear = () => {
    const bears = useStore((state) => state.bears)
    const controlBears = useStore((state)=>state.increasePopulation)
    return (
        <>
            <h1>Number of bears: {bears}</h1>
            <button onClick={controlBears}>One bear up</button>
        </>
    )
}