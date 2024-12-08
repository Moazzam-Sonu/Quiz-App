function Start({totalQuestion, dispatch}){
return <>
<div className="start">
    <h2>Welcome To The React Quiz!</h2>
    <h3>{totalQuestion} questions to test your React mastry</h3>
    <button className="btn btn-ui" onClick={()=> dispatch({type:"active"} )}>let start</button>
</div>
</>
}
export default Start;