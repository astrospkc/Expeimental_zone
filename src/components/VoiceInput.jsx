import { useState } from "react"
import useSpeechToText from "../hooks/useSpeechToText"


const VoiceInput = () => {
    const [textInput, setTextInput] = useState("")
    console.log("webkit speech recognition: ", window.SpeechRecognition || window.webkitSpeechRecognition)
    console.log('webkitSpeechRecognition' in window)
    const { isListening, startListening, stopListening, transcript } = useSpeechToText({continuous:true})
    
    const startStopListening = () => {
        isListening ? stopVoiceInput() : startListening()
    }
    const stopVoiceInput = () => {
        console.log("transcript: ", transcript)
        console.log("text input: ", textInput)
        setTextInput(prev=>prev + (transcript.length ? (prev.length ? " ":"") + transcript : ""))
        stopListening()
    }

    return (
        <>
            <div className="flex flex-col gap-2 justify-center items-center">
                <button
                    style={{
                        backgroundColor: isListening ? "red" : "green",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                
                    onClick={startStopListening}>{isListening ? "Stop" : "Start"}</button>
                <textarea
                    className="text-white"
                    name="text"
                    id=""
                    rows={10}
                    cols={30}
                    disabled={isListening}
                    value={isListening ? textInput + (transcript.length ? (textInput.length ? " " : "") + transcript : "") : textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                ></textarea>
        </div>
        </>
    )
}

export default VoiceInput