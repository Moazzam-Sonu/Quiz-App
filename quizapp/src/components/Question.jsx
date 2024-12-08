import Footer from "./Footer";
import NextButton from "./NextButton";
import Options from "./Options";
import Progress from "./Progess";
import Timer from "./Timer";

function Question({secondsRemaining, question,answer,point, dispatch , index, totalQuestion,totalPoints}){
    return(
        <>
       
        <Progress point={point} index={index} totalQuestion={totalQuestion} totalPoints={totalPoints} answer={answer} />
        <div>
            <h4>{question.question}</h4>
            <Options question={question} answer={answer} dispatch={dispatch} />
        </div>
        <Footer>
        <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
        <NextButton dispatch={dispatch} answer={answer} index={index} totalQuestions={totalQuestion} />
        </Footer>
        
        </>
)
}
export default Question;