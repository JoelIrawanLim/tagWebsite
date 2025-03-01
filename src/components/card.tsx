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
                easy: () => incrementDifficultyCount("easy", null),
                normal: () => incrementDifficultyCount("normal", null),
                hard: () => incrementDifficultyCount("hard", null),
            };
            const runFunction = difficultyFunction[this.difficulty] || (() => {});
            runFunction();
        };
    }
}

const cardDataEasy = [
    { title: "Find One of Each Digit", difficulty: "easy", description: "Find an example of each digit from 0 to 9. Each digit cannot be from the same location (within 5 meters) as another digit.", moreDetails: "Find an example of each digit from 0 to 9. Each digit cannot be from the same location (within 5 meters) as another digit. Reward for completion: Reroll all current challenges" },
    { title: "You Shall Be Blind", difficulty: "easy", description: "Do not view anybody’s location or use a map on your phone for the next 5 minutes.", moreDetails: "Do not view anybody’s location or use a map on your phone for the next 5 minutes.\nReward for completion: Reroll all current challenges" },
    { title: "AEIOU", difficulty: "easy", description: "Find a physical billboard that has the letters A, E, I, O and U anywhere on it. ", moreDetails: "Find a physical billboard that has the letters A, E, I, O and U anywhere on it. Reward for completion: Reroll all current challenges" },
    { title: "Step by Step", difficulty: "easy", description: "Face exactly NE, and walk 24 steps in that direction. Face West, and walk 17 steps. Facing South, take 17 steps. ", moreDetails: "Face exactly NE, and walk 24 steps in that direction. Face West, and walk 17 steps. Facing South, take 17 steps. Reward for completion: Reroll all current challenges" },
    { title: "Picture ABCDEF", difficulty: "easy", description: "Take a single picture which has items starting with the letter A, B, C, D, E and F. List those items in the picture. ", moreDetails: "Take a single picture which has items starting with the letter A, B, C, D, E and F. List those items in the picture. Reward for completion: Reroll all current challenges" },
    { title: "Banished", difficulty: "easy", description: "Do not be in suntec for the next 5 minutes.", moreDetails: "Do not be in suntec for the next 5 minutes. Reward for completion: Reroll all current challenges" },
    { title: "Bear Bear", difficulty: "easy", description: "Find a teddy bear for sale", moreDetails: "Find a teddy bear for sale. Reward for completion: Reroll all current challenges" },
    { title: "Drink", difficulty: "easy", description: "Find potable water that is not from any of the players.", moreDetails: "Find potable water that is not from any of the players. Reward for completion: Reroll all current challenges" },
    { title: "The Big Wheel", difficulty: "easy", description: "Take a picture of singapore flyer", moreDetails: "Take a picture of singapore flyers. Reward for completion: Reroll all current challenges" },
    { title: "Yummy", difficulty: "easy", description: "Find a snack cheaper than $2", moreDetails: "Find a snack cheaper than $2. Reward for completion: Reroll all current challenge" },
    { title: "Paranoid Pedestrian", difficulty: "easy", description: "Before crossing a road, look left, and then right. Repeat 5 more times before crossing.", moreDetails: "Before crossing a road, look left, and then right. Repeat 5 more times before crossing. Reward for completion: Reroll all current challenges" },
    { title: "Truely Huge", difficulty: "easy", description: "Find a body of water bigger than 1m squared in area.", moreDetails: "Find a body of water bigger than 1m squared in area. Reward for completion: Reroll all current challenges" },
    { title: "Stay hygienic!", difficulty: "easy", description: "Wash your hands. With soap, of course.", moreDetails: "Wash your hands. With soap, of course." },
    { title: "Weather Forecaster", difficulty: "easy", description: "Check the weather and make a forecast.", moreDetails: "Check the NEA weather map/forecast. Announce to the players whether you believe it may rain or not." },

    //{ title: "", difficulty: "easy", description: "", moreDetails: "" },
    // ... other card data
];

const cardDataMedium = [
    { title: "Invent a new sport.", difficulty: "normal", description: "Invent a new sport. Your sport must use pins, targets, baskets or nets. You must have a method of scoring. The sport must be for multiple players. You must play at least one round of your new sport, lasting at least 3 minutes. You can compete against yourself. Do not spend more than $10 on the challenge.", moreDetails: "Invent a new sport. Your sport must use pins, targets, baskets or nets. You must have a method of scoring. The sport must be for multiple players. You must play at least one round of your new sport, lasting at least 3 minutes. You can compete against yourself. Do not spend more than $10 on the challenge. Reward for completion: 3 “Location Off” Minutes" },
    { title: "Tower of Babbel", difficulty: "normal", description: "Compete against your opponents in a tower making contest. Announce the contest publicly, with a 5 minute preparation time. After prep time is over, all teams have 5 minutes to make the tallest tower possible, without spending any money. The winner of the contest wins the “Location Off” Minutes.", moreDetails: "Compete against your opponents in a tower making contest. Announce the contest publicly, with a 5 minute preparation time. After prep time is over, all teams have 5 minutes to make the tallest tower possible, without spending any money. The winner of the contest wins the “Location Off” Minutes. Reward for winner: 3 “Location Off” Minutes" },
    { title: "The Farlands", difficulty: "normal", description: "Visit the map border! Take a picture of either the water boundary, or the Victoria/Hill St boundary.", moreDetails: "Visit the map border! Take a picture of either the water boundary, or the Victoria/Hill St boundary. Reward for completion: 3 “Location Off” Minutes" },
    { title: "Price war: Water", difficulty: "normal", description: "Compete against your opponents in a price war. Find the cheapest version of bottled water for sale. Announce the competition publicly, with a 5 minute preparation time. All teams have 10 minutes to find the cheapest possible version for sale. It cannot be free. It cannot be sold by someone playing the game.", moreDetails: "Compete against your opponents in a price war. Find the cheapest version of bottled water for sale. Announce the competition publicly, with a 5 minute preparation time. All teams have 10 minutes to find the cheapest possible version for sale. It cannot be free. It cannot be sold by someone playing the game. Reward for winner: 3 “Location Off” Minutes" },
    { title: "Price war: Chips", difficulty: "normal", description: "Compete against your opponents in a price war! Attempt to find the cheapest bag of chips for sale. ", moreDetails: "Announce the competition publicly, with a 5 minute preparation time. All teams have 10 minutes to find (and send a picture of) the cheapest bag of chips for sale that they can find.It cannot be free. It cannot be sold by someone playing the game. Reward for winner: 3 “Location Off” Minutes" },
    { title: "Price war: Tissues", difficulty: "normal", description: "Compete against your opponents in a price war! Attempt to find the cheapest pack of tissue paper for sale. ", moreDetails: "Announce the competition publicly, with a 5 minute preparation time. All teams have 10 minutes to find (and send a picture of) the cheapest pack of tissue paper for sale that they can find.It cannot be free. It cannot be sold by someone playing the game. Reward for winner: 3 “Location Off” Minutes" },
    { title: "Questionable Trade", difficulty: "normal", description: "Make a trade. Your opponents each get 3 “Location Off” Minutes. You get 4 “Location Off” Minutes.", moreDetails: "Make a trade. Your opponents each gain 3 “Location Off” Minutes, while you gain 4 “Location Off” Minutes." },
    { title: "Start a sightseeing competition! ", difficulty: "normal", description: "Compete against other teams to find numbers and buildings", moreDetails: "Announce that you are starting this challenge, and then start a 5 minute period.After the 5 minute period, take a picture of 3 different buildings/objects with numbers on them (greater than zero only). Use the 3 numbers and 3 of any operand to get 0. The first team to acquire a suitable set of numbers wins.Examples: 4 + 9 - 13 (valid). 14 - 8 - 6 (valid). 0 + 0 + 0 (invalid). 0 + 8 - 8 (invalid). Reward for winner: 4 “Location Off” Minutes" },
    { title: "Awkwardly Social", difficulty: "normal", description: "Greet a stranger and be acknowledged", moreDetails: "Greet a stranger and be acknowledged. It cannot be in a transactional setting. Examples: In a store (Invalid). On the street (Valid). Reward for completion: 3 “Location Off” Minutes" },
    { title: "Nature Lover", difficulty: "normal", description: "Avoid entering air-conditioned places for 10 minutes.", moreDetails: "Appreciate nature and fresh air! Announce that you are starting this challenge.Do not enter any air-conditioned place for 10 minutes. If you do, your attempt is void, but the challenge can be reattempted.Reward for completion: 3 “Location Off” Minutes" },
    { title: "Data Leak", difficulty: "normal", description: "For the next 20 minutes, all your communications must be public", moreDetails: "Announce that you are starting this challenge.For the next 20 minutes, you are only allowed to use the public chat for communications.If you do, your attempt is void, but the challenge can be reattempted.After the 20 minutes, you are granted the reward. Reward for completion: 3 “Location Off” Minutes" },
    { title: "Go On Wheels", difficulty: "normal", description: "For the next 15 minutes, you cannot use stairs or escalators.", moreDetails: "Announce that you are starting this challenge. For the next 15 minutes, you cannot use stairs or escalators.If you do, your attempt is void, but the challenge can be reattempted.You may use lifts and slopes.Reward for completion: 4 “Location Off” Minutes" },

    //{ title: "", difficulty: "normal", description: "", moreDetails: "" },
];

const cardDataHard = [
    { title: "Telepathy", difficulty: "hard", description: "Without any communication about the item, go into a store of your choice and mentally select an item. Your partner must guess the same item as you.", moreDetails: "Without any communication about the item, go into a store of your choice and mentally select an item. Your partner must guess the exact same item as you. If your partner is unable to, you can reattempt. Reward for completion: 8 “Location Off” Minutes" },
    { title: "Scrapbook", difficulty: "hard", description: "Word for word, recreate the most recent message from your opponents’ team using pictures of signboards you pass by. ", moreDetails: "Word for word, recreate the most recent message from your opponents’ team using pictures of signboards you pass by. Reward for completion: 8 “Location Off” Minutes" },
    { title: "Pun-ology", difficulty: "hard", description: "Come up with 5 puns about your surroundings in your building/location", moreDetails: "Announce that you are starting this challenge. Look around you. Before you can leave your building/location, you must come up with 5 puns about your surroundings. If you do leave, the attempt is void, but the challenge can be reattempted.Send your puns into public chat, along with pictures of what they reference. Reward for completion: 8 “Location Off” Minutes" },
    { title: "Play tag inside tag!", difficulty: "hard", description: "For the next 5 minutes, play tag inside your location. You cannot leave until 5 minutes is up.", moreDetails: "Split your group into 2, and decide who will be “It”. For the next 5 minutes, play tag inside your location. You cannot leave until 5 minutes is up. If you do leave, the attempt is void, but the challenge can be reattempted.Reward for completion: 8 “Location Off” Minutes" },
    { title: "Take a breather! ", difficulty: "hard", description: "Rest at your current location for X minutes. You gain X÷2 “Location Off” Minutes", moreDetails: "Announce that you are starting this challenge. Make sure your location is on. Publicly predetermine how many minutes (X) you are going to rest for. After your rest, you gain X÷2 (rounded up) “Location Off” Minutes. Your rest time is minimum 2 min, max 8 min. You cannot move during your rest period. Reward for completion: X÷2 “Location Off” Minutes" },
    { title: "Start a bidding war! ", difficulty: "hard", description: "There is 1 debuff that comes with a reward. The unit which is willing to take the lowest reward, gets the debuff and reward.", moreDetails: "Announce that you are starting this challenge. There is a debuff (being unable to check anyone’s location for the next 10 minutes) that comes with a reward (“Location Off” Minutes). Units must bid against each other. The unit willing to receive the lowest reward for the debuff will get the debuff and reward.The highest reward is 12 Location Off Minutes. You can only bid whole numbers. The bid ends if no further offer is made after 5 minutes.Reward for winner: The amount bidded" },
    { title: "Play the new sport! ", difficulty: "hard", description: "Play the new sport with your friendly team. (If the “New sport” challenge has not been completed yet, reroll this challenge)", moreDetails: "Invite your friendly team to play the new sport. Meet up with your friendly team, and play a round lasting at least 5 minutes. During the round, no one can leave the vicinity. The winner claims the reward for this challenge.Reward for winner: 8 “Location Off” Minutes" },
    { title: "Visibly Invisible", difficulty: "hard", description: "Turn off your location for 15 minutes. For the rest of the round, you cannot enter air-conditioned buildings. (If there is less than 30min left in the game, reroll this)", moreDetails: "Announce that you are starting this challenge. Turn off your location for 15 minutes.For the rest of the round, you cannot enter air-conditioned buildingsThis challenge cannot be attempted if there is less than 30 minutes left in the game." },
    { title: "Bet on yourself!", difficulty: "hard", description: "Get a small bonus up front. If you win the next 2 contest-styled challenges, get a bonus. If not, your opponents get a bonus.", moreDetails: "Announce that you are starting this challenge. You get 2  “Location Off” Minutes for attempting the challenge.If you win the next 2 contest-styled challenges, you get a bonus of 4 “Location Off” Minutes. If you lose either of the next 2 contest-styled challenges, your opponents receive 3 “Location Off” Minutes each.Only 1 team can attempt this challenge at a time.Reward for starting an attempt: 2 “Location Off” Minutes" },


    //{ title: "", difficulty: "hard", description: "", moreDetails: "" },
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

const incrementDifficultyCount = async (difficulty: string, key: number | null) => {
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

    let newCount: number;
    console.log(key, typeof key);

    if (key === null) {
        newCount = Math.floor(Math.random() * maxRange);
    } else {
        do {
            newCount = Math.floor(Math.random() * maxRange);
            console.log("newCount", newCount, typeof newCount);
            console.log("maxRange", maxRange);
        } while (newCount === key);

        if (newCount === 0 && key === 0) {
            console.log("why???");
        }
    }

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
            await incrementDifficultyCount(props.difficulty, key);
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