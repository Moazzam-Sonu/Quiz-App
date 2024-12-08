// import { useQuiz } from "../contexts/QuizContext";

function FinishScreen({point , totalPoints, heighScore,dispatch}) {
  // const { point, totalPoints } = useQuiz();

  const percentage = (point / totalPoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{point}</strong> out of{" "}
        {totalPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {heighScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
