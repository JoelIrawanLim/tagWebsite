import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

interface ICardProps {
    title: string;
    difficulty: string;
    description: string;
    moreDetails: string;
    onButtonClick(): void;
}

export class CardProperties implements ICardProps {
    public title: string;
    public difficulty: string;
    public description: string;
    public moreDetails: string;
    public onButtonClick: () => void;

    constructor(title: string, difficulty: string, description: string, moreDetails: string) {
        this.title = title;
        this.difficulty = difficulty;
        this.description = description;
        this.moreDetails = moreDetails;
        this.onButtonClick = () => {
            const difficultyFunction: Record<string, Function> = {
                easy: () => incrementDifficultyCount("easy"),
                normal: () => incrementDifficultyCount("normal"),
                hard: () => incrementDifficultyCount("hard"),
            };
            const runFunction = difficultyFunction[this.difficulty] || (() => {});
            runFunction();
        };
    }
}

const cardDataEasy = [
    { title: "Build a Tower1", difficulty: "easy", description: "Stack blocks high", moreDetails: "Requires balance skills" },
    { title: "Solve a Puzzle2", difficulty: "easy", description: "Complete a jigsaw puzzle", moreDetails: "Focus on edges first" },
    { title: "Code a Game3", difficulty: "easy", description: "Write a simple game", moreDetails: "Use JavaScript & Canvas" },
    // ... other card data
];

const cardDataMedium = [
    { title: "Build a Tower", difficulty: "normal", description: "Stack blocks high", moreDetails: "Requires balance skills" },
    { title: "Solve a Puzzle", difficulty: "normal", description: "Complete a jigsaw puzzle", moreDetails: "Focus on edges first" },
    { title: "Code a Game", difficulty: "normal", description: "Write a simple game", moreDetails: "Use JavaScript & Canvas" },
];

const cardDataHard = [
    { title: "Build a Tower", difficulty: "hard", description: "Stack blocks high", moreDetails: "Requires balance skills" },
    { title: "Solve a Puzzle", difficulty: "hard", description: "Complete a jigsaw puzzle", moreDetails: "Focus on edges first" },
    { title: "Code a Game", difficulty: "hard", description: "Write a simple game", moreDetails: "Use JavaScript & Canvas" },
];

export const fetchCardByKeyEasy = (key: number): CardProperties | null => {
    if (key < 0 || key >= cardDataEasy.length) {
        console.warn(`No card found for key ${key}.`);
        return null;
    }

    const card = cardDataEasy[key];
    return new CardProperties(card.title, card.difficulty, card.description, card.moreDetails);
};

export const fetchCardByKeyMedium = (key: number): CardProperties | null => {
    if (key < 0 || key >= cardDataMedium.length) {
        console.warn(`No card found for key ${key}.`);
        return null;
    }

    const card = cardDataMedium[key];
    return new CardProperties(card.title, card.difficulty, card.description, card.moreDetails);
};

export const fetchCardByKeyHard = (key: number): CardProperties | null => {
    if (key < 0 || key >= cardDataHard.length) {
        console.warn(`No card found for key ${key}.`);
        return null;
    }

    const card = cardDataHard[key];
    return new CardProperties(card.title, card.difficulty, card.description, card.moreDetails);
};

const difficultyColor: Record<string, string> = {
    easy: "blue-card",
    normal: "yellow-card",
    hard: "red-card",
};

const incrementDifficultyCount = async (difficulty: string) => {
    let column = "";
    let maxRange = 1;
    switch (difficulty.toLowerCase()) {
        case "easy":
            column = "easy_count";
            maxRange = cardDataEasy.length;
            break;
        case "normal":
            column = "normal_count";
            maxRange = cardDataMedium.length;
            break;
        case "hard":
            column = "hard_count";
            maxRange = cardDataHard.length;
            break;
        default:
            console.error("Invalid difficulty:", difficulty);
            return;
    }

    const newCount = Math.floor(Math.random() * maxRange);

    const { error } = await supabase
        .from("game_data")
        .update({ [column]: newCount })
        .eq("id", 1);

    if (error) {
        console.error(`Error updating ${column}:`, error);
    } else {
        console.log(`${column} updated successfully!`, newCount);
    }
};

const Card = ({ difficulty }: { difficulty: string }) => {
    const fetchDifficultyCount = async (difficulty: string): Promise<number> => {
        let column = "";

        switch (difficulty.toLowerCase()) {
            case "easy":
                column = "easy_count";
                break;
            case "normal":
                column = "normal_count";
                break;
            case "hard":
                column = "hard_count";
                break;
            default:
                console.error("Invalid difficulty:", difficulty);
                return 0;
        }

        const { data, error } = await supabase
            .from("game_data")
            .select(column)
            .eq("id", 1)
            .single();

        if (error) {
            console.error(`Error fetching ${column}:`, error);
            return 0;
        }

        if (data && typeof data === "object" && column in data) {
            return data[column] as number;
        } else {
            console.warn(`Column ${column} not found in returned data`, data);
            return 0;
        }
    };

    const [key, setKey] = useState<number | null>(null);
    const [props, setProps] = useState<CardProperties | null>(null);
    const [loading, setLoading] = useState(true);
    const [initialLoading, setInitialLoading] = useState(true);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (initialLoading) {
                setLoading(true);
            }

            const count = await fetchDifficultyCount(difficulty);
            setKey(count);

            const difficultyFunction: Record<string, (key: number) => CardProperties | null> = {
                easy: fetchCardByKeyEasy,
                normal: fetchCardByKeyMedium,
                hard: fetchCardByKeyHard,
            };

            const cardData = difficultyFunction[difficulty](count);
            setProps(cardData || null);
            setLoading(false);
            setInitialLoading(false);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [difficulty]);

    const difficultyKey = props?.difficulty ? props.difficulty.toLowerCase() : "default";
    const bgColor = difficultyColor[difficultyKey] || "gray-card";

    const handleComplete = async () => {
        if (props) {
            await incrementDifficultyCount(props.difficulty);
            const count = await fetchDifficultyCount(difficulty);
            setKey(count);

            const difficultyFunction: Record<string, (key: number) => CardProperties | null> = {
                easy: fetchCardByKeyEasy,
                normal: fetchCardByKeyMedium,
                hard: fetchCardByKeyHard,
            };

            const cardData = difficultyFunction[difficulty](count);
            setProps(cardData || null);
        }
    };

    if (loading && initialLoading) {
        return <div className="loading-card">Loading...</div>;
    }

    return (
        <div className={`card ${bgColor}`}>
            {showDetails ? (
                <div>
                    <p className="detailed-view">{props?.moreDetails}</p>
                    <button className="card-button" onClick={() => setShowDetails(false)}>
                        Back
                    </button>
                </div>
            ) : (
                <>
                    <CardHeader difficulty={props?.difficulty || ""} onShowDetails={() => setShowDetails(true)} />
                    <h2 className="title">{props?.title}</h2>
                    <p>{props?.description}</p>
                    <button className="card-button" onClick={handleComplete}>Complete</button>
                </>
            )}
        </div>
    );
};

const CardHeader = ({ difficulty, onShowDetails }: { difficulty: string; onShowDetails: () => void }) => {
    return (
        <div className="title-row">
            <h1 className="difficulty">{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h1>
            <button className="details-button" onClick={onShowDetails}>
                More Details
            </button>
        </div>
    );
};

export default Card;