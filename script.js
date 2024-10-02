let btn = document.querySelector("#btn")
let content = document.querySelector("#content")


function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="hi-GB"
    window.speechSynthesis.speak(text_speak) 
}

function wishMe(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0 && hours<12){
        speak("Good Morning Sir")
    }else if(hours>=12 && hours<16){
        speak("Good afternoon sir")
    }else{
        speak("Good evening sir")
    }
}

// window.addEventListener('load',()=>{
//     wishMe()
 //})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (speechRecognition) {
    let recognition = new speechRecognition();
    recognition.continuous = false; // Optional: Set to true if you want continuous listening
    recognition.interimResults = false; // Optional: Set to true if you want partial results

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript.trim().toLowerCase(); // Trim and convert to lowercase
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    // Correct 'Click' event to lowercase 'click'
    btn.addEventListener('click', () => {
        recognition.start();
    });
} else {
    console.log("Speech recognition not supported by this browser.");
}

function takeCommand(message) {
    console.log("Received message", message);
    
    if (message.includes("hello")) {
        speak("Hello Sir, What can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Amar Sir.");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    } else if (message.includes("open ataccama")) {
        speak("Opening Ataccama...");
        window.open("https://www.ataccama.com/", "_blank");
        
    } 
    else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
        
    } 
    else if (message.includes("open whatsapp")) {
        speak("Opening whatsapp...");
        window.open("whatsapp://");
        
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time);
        
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short",year: "numeric"})
        speak(date);
        
    }

    //* new lines of code//
    else if (message.includes("increase volume")) {
        speak("Increasing volume.");
        let video = document.querySelector('video');
        if (video) video.volume = Math.min(video.volume + 0.1, 1);
    } else if (message.includes("decrease volume")) {
        speak("Decreasing volume.");
        let video = document.querySelector('video');
        if (video) video.volume = Math.max(video.volume - 0.1, 0);
    }
    else if (message.includes("play music")) {
        speak("Playing your favorite music.");
        window.open("https://www.youtube.com/results?search_query=your+favorite+song", "_blank");
    }
    else if (message.includes("what's the weather")) {
        speak("Fetching the weather for you.");
        fetch('https://api.openweathermap.org/data/2.5/weather?q=YourCity&appid=YourAPIKey')
            .then(response => response.json())
            .then(data => {
                let weather = `The weather in ${data.name} is ${data.weather[0].description} with a temperature of ${Math.round(data.main.temp - 273.15)}°C.`;
                speak(weather);
            })
            .catch(error => {
                speak("I couldn't fetch the weather at the moment.");
            });
    }
    else if (message.includes("play video")) {
        speak("Playing video.");
        let video = document.querySelector('video');
        if (video) video.play();
    } else if (message.includes("pause video")) {
        speak("Pausing video.");
        let video = document.querySelector('video');
        if (video) video.pause();
    }
    else if (message.includes("remind me to")) {
        let reminderText = message.replace("remind me to", "").trim();
        speak(`Setting a reminder for: ${reminderText}`);
        setTimeout(() => {
            speak(`Reminder: ${reminderText}`);
        }, 5000); // Here, it's set for 5 seconds; you can make this dynamic
    }
    else if (message.includes("tell me a joke")) {
        let jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        speak(randomJoke);
    }
    else if (message.includes("take a note")) {
        let note = message.replace("take a note", "").trim();
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
        speak("Note saved.");
    } else if (message.includes("show my notes")) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        if (notes.length > 0) {
            speak(`You have ${notes.length} notes: ` + notes.join(", "));
        } else {
            speak("You have no notes.");
        }
    }
    else if (message.includes("calculate")) {
        try {
            let calculation = message.replace("calculate", "").trim();
            let result = eval(calculation); // Be careful with eval, ensure input is sanitized
            speak(`The result is ${result}`);
        } catch (error) {
            speak("Sorry, I couldn't calculate that.");
        }
    }
    // else if (message.includes("change language to hindi")) {
    //     speak("Changing language to Hindi.");
    //     text_speak.lang = "hi-IN"; // Change to Hindi
    // } else if (message.includes("change language to english")) {
    //     speak("Changing language to English.");
    //     text_speak.lang = "en-US"; // Change to English
    // }
    else if (message.includes("what's the news")) {
        speak("Fetching the latest news.");
        fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YourAPIKey')
            .then(response => response.json())
            .then(data => {
                let articles = data.articles.slice(0, 5);
                let newsHeadlines = articles.map(article => article.title).join(", ");
                speak("Here are the latest headlines: " + newsHeadlines);
            })
            .catch(error => speak("I couldn't fetch the news at this moment."));
    }
    
    else {
        let finalText ="This is what I found on the internet regarding" +message.replace("alexa", "")||
        message.replace("alexa","")
        speak(finalText);
        speak("This is what I found on the internet.");
        window.open(`https://www.google.com/search?q=${message.replace("alexa", "")}`, "_blank");
    }
}
    