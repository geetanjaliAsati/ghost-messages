import React from 'react';
import "./SaveResponse.css";

const SaveResponse = () => {
    const [userName, setUserName] = React.useState('');
    const [userMessage, setUserMessage] = React.useState('');
    const userResponse = [];
    const [allResponses, setAllResponses] = React.useState([]);
    const [stopInfiniteLoop, setStopInfiniteLoop] = React.useState(false);
    //getting all the resposes
    if(!stopInfiniteLoop)   {
    fetch("https://learning-firebase-55222-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        for(const dataItem in data) {
            console.log(
                data[dataItem].userName,
                data[dataItem].userMessage,
                
            );
            userResponse.push({userName: data[dataItem].userName, userMessage: data[dataItem].userMessage});
        }
        setAllResponses(userResponse);
        // setUserResponse(data);
    })
    setStopInfiniteLoop(true);
    }


    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    }
    const handleUserMessageChange = (event) => {
        setUserMessage(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("User name: ", userName);
        console.log("user message: ",userMessage);

        if(userName === "" && userMessage === "" ) { 
            alert("can't submit empty feedback");
            return;
        }
        // create CRUD object 
        fetch("https://learning-firebase-55222-default-rtdb.asia-southeast1.firebasedatabase.app/messages.json",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                userName: userName,
                userMessage: userMessage,
            })
        }).then(res => {
            console.log("res:", res);
            return res.json();
        }).then(data => {console.log(data);})
        setUserName('');
        setUserMessage('');
        alert("submitted feedback successfully");
    }
  return (
    <div className='container'>
        <div className="container-box">
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input className="input-user-name" type="text" placeholder="Want to write your name" autocomplete="off" onChange= {handleUserNameChange} />
                <input className="input-user-message" type="text" placeholder='Enter your Message' onChange= {handleUserMessageChange} />
                <button className="input-submit" type="submit">Send Message</button>
            </form>
        </div>


        <div className="response-container">
            {
                allResponses && (
                    allResponses.map(item => {
                        return(
                            <div>
                                <p>{item.userName}</p>
                                <p>{item.userMessage}</p>
                            </div>
                        )
                    })
                )
            }

        </div>
        </div>
    </div>
  )
}

export default SaveResponse