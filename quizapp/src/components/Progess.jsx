function Progress({index, totalPoints , totalQuestion, answer,point}){
    return (
        <header className="progress">
            <progress max={totalQuestion} value={index + (answer !== null)} />
            <p>Questions <strong>{index}</strong>/ {totalQuestion}</p>
            <p>{point}/{totalPoints}</p>
        </header>
    )

}
export default Progress;