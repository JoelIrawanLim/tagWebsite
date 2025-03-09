import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

const TimeCard = () => {

    const COUNTDOWN_DURATION = (2 * 60 * 60 * 1000) + (20 * 60 * 1000)
    const PASSCODE = "1234"; // ✅ Change this to any simple passcode

    const [timeLeft, setTimeLeft] = useState<number>(0);

    useEffect(() => {
        fetchGameData();
        const interval = setInterval(fetchGameData, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchGameData(); 
        const interval = setInterval(() => {
            setTimeLeft(prev => Math.max(prev - 1, 0)); // Decrement timer every second
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchGameData = async () => {
        const { data, error } = await supabase
            .from("game_data")
            .select("last_reset, hard_count, normal_count, easy_count")
            .eq("id", 1) // Only one row exists
            .single();

        if (error) {
            console.error("Error fetching data:", error);
            return;
        }

        const storedTime = new Date(data.last_reset).getTime(); // Convert UTC to milliseconds
        updateTimeLeft(storedTime);
    };

    const updateTimeLeft = (storedTime: number) => {
        const now = Date.now() + new Date().getTimezoneOffset() * 60 * 1000; // Convert local time to UTC
        const expiryTime = storedTime + COUNTDOWN_DURATION;
        const difference = Math.max(Math.floor((expiryTime - now) / 1000), 0); // ✅ Convert to seconds
        setTimeLeft(difference); 
    };

    // ✅ Handle passcode entry & reset timer
    const handleTimeReset = async () => {
        const userInput = prompt("Enter passcode:");
        if (userInput !== PASSCODE) {
            alert("Incorrect passcode!");
            return;
        }
        const newResetTime = new Date().toISOString(); // ✅ Store a timestamp in milliseconds
        const { error } = await supabase
            .from("game_data")
            .update({ last_reset: newResetTime })
            .eq("id", 1);

        if (error) {
            console.error("Error updating time:", error);
            alert("Failed to update time!");
        } else {
            alert("Time reset successfully!");
            updateTimeLeft(Date.now()); // ✅ Instantly update UI
            fetchGameData();
        }
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds/60);
        const sec = seconds % 60;
        if (minutes === 0 && sec === 0){
            return "FINISHED"
        }
        return `${String(minutes).padStart(2, "0")} : ${String(sec).padStart(2, "0")}`;
    }
    return (
        <div className="card time-card" onClick={handleTimeReset}>
            <h2 className="title">Time Left</h2>
            <p className={`time-left ${timeLeft <= 1 ? "finished" : ""}`}>{formatTime(timeLeft)}</p>
        </div>
    );
};

export default TimeCard;

