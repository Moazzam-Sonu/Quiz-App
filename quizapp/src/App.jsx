import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Main1 from "./components/Main1"
import Loader from "./components/Loader"
import Error from "./components/Error"
import Start from "./components/Start"
import Question from "./components/Question"
import FinishScreen from "./components/FinishScreen"

const initialState ={
  questions:[],
  status:"loading",
  index: 0,
  answer:null,
  point: 0,
  heighScore:0,
  secondsRemaining:0,
}
const SECOND_PER_QESTON = 10;
function reducer(state , action){
  switch(action.type){
    case "dataReceived":
      return {...state, questions:action.payload, status: "ready"}
    case "restart":
      return {...initialState,questions:state.questions, status: "ready"}
    case "dataFaild":
      return {...state, status:"error"}
    case "active":
      return {...state, status:"active", secondsRemaining: state.questions.length * SECOND_PER_QESTON}
    case "nextQuestion":
      return {...state, index:state.index+1, answer:null}
      case "newAnswer":
        const checkQ = state.questions.at(state.index);
        return {...state, answer:action.payload,point: action.payload === checkQ.correctOption? state.point + checkQ.points : state.point   }
    case "finished":
      return {...state, status: "finish", heighScore: state.point > state.heighScore? state.point : state.heighScore }
    case "tick":
      return {...state, secondsRemaining:state.secondsRemaining -1, status:state.secondsRemaining===0? "finish" : state.status}
      default:
      throw new Error("unknown")
  }
}
function App() {
  const [{questions , status, index,answer,point,heighScore,secondsRemaining} , dispatch] = useReducer(reducer,initialState)
  const totalQuestion = questions.length;
  const totalPoints =  questions.reduce((pre,cur)=>pre+cur.points,0);
  
  useEffect(()=>{
    fetch('http://localhost:8000/questions')
    .then((res) => res.json())
    .then((data)=> dispatch({type:"dataReceived",payload: data}))
    .catch((err)=> dispatch({type:"dataFaild",payload: err.message}));
  },[])

  return (
    <>
    <div className="app">
    <Header />
    <Main1>
     {status === 'loading' && <Loader/>}
     {status === 'error' && <Error/>}
     {status === 'ready' && <Start totalQuestion={totalQuestion} dispatch={dispatch} />}
     {status === 'active' && <Question point={point} index={index} totalQuestion={totalQuestion} totalPoints={totalPoints} question={questions[index]}  dispatch={dispatch} answer={answer} secondsRemaining={secondsRemaining} />}
    {status === 'finish' && <FinishScreen dispatch={dispatch} heighScore={heighScore} point={point} totalPoints={totalPoints}/>}
    </Main1>
    </div>
    </>
  )
}

export default App
