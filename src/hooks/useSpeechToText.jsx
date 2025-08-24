import { useEffect, useRef, useState } from "react"

const useSpeechToText = (options) => {
    const [isListening , setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    // keep the track of what user is saying
    const recognitionRef = useRef(null)

    useEffect(() => {
        if(!('webkitSpeechRecognition' in window)) {
            console.log('webkitSpeechRecognition is not supported in this browser')
            return
        }
        // create a new instance of webkitSpeechRecognition
        recognitionRef.current = new window.webkitSpeechRecognition()
        const recognition = recognitionRef.current
        console.log("logging out interim results : ",recognition.interimResults)
        recognition.interimResults = options.interimResults|| false
        recognition.continuous = options.continuous||  false
        recognition.lang =options.lang || 'en-US'
        
        if ("webkitSpeechRecognition" in window) {
            const grammar = "#JSGF v1.0; grammar punctuation; public <punc> = . | , | ? | ! | ; | : ;" 
            const speechRecognitionList = new window.webkitSpeechGrammarList()
            speechRecognitionList.addFromString(grammar,1)
            recognition.grammars = speechRecognitionList
        }

        recognition.onresult = (event) => {
            console.log("event: ", event.results, event)
            let text= ""
            for (let i = 0; i < event.results.length; i++){
                text += event.results[i][0].transcript
            }
            console.log("text: ", text)
            setTranscript(text)
        }

        recognition.onerror = (event) => {
            console.log("event: ", event)
        }

        recognition.onend = () => {
            setIsListening(false)
            setTranscript("")
        }

        return () => {
            recognition.stop()
        }
    }, [])
    
    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start()
            setIsListening(true)

        }
    }
    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
            
        }
    }

    console.log("transcript in hook: ", transcript)


    return {
        isListening,
        startListening,
        stopListening,
        transcript
    
    }
    
}

export default useSpeechToText
