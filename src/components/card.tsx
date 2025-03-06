import { useState, useEffect } from 'react';
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
    { title: "Find One of Each Digit", difficulty: "easy", 		description: "Find an example of each digit from 0 to 9.  <br> Each digit cannot be from the same location (within 5 meters) as another digit.", moreDetails: "Find an example of each digit from 0 to 9.  <br> Each digit cannot be from the same location (within 5 meters) as another digit.  <br> Reward for completion: Reroll all current challenges" },
    { title: "You Shall Be Blind", difficulty: "easy", 			description: "Do not view anybody’s location or use a map on your phone for the next 5 minutes.", 						moreDetails: "Do not view anybody’s location or use a map on your phone for the next 5 minutes. <br> Reward for completion: Reroll all current challenges" },
    { title: "AEIOU", difficulty: "easy", 						description: "Find a physical billboard that has the letters A, E, I, O and U anywhere on it. ", 						moreDetails: "Find a physical billboard that has the letters A, E, I, O and U anywhere on it.  <br> Reward for completion: Reroll all current challenges" },
    { title: "Step by Step", difficulty: "easy", 				description: "Face exactly NE, and walk 24 steps in that direction. Face West, and walk 17 steps. Facing South, take 17 steps. ", moreDetails: "Face exactly NE, and walk 24 steps in that direction. Face West, and walk 17 steps. Facing South, take 17 steps.  <br> Reward for completion: Reroll all current challenges" },
    { title: "Picture ABCDEF", difficulty: "easy",				description: "Take a single picture which has items starting with the letter A, B, C, D, E and F.  <br> List those items in the picture. ", moreDetails: "Take a single picture which has items starting with the letter A, B, C, D, E and F.  <br> List those items in the picture.  <br> Reward for completion: Reroll all current challenges" },
    { title: "Banished", difficulty: "easy", 					description: "Do not be in suntec for the next 5 minutes.", 															moreDetails: "Do not be in suntec for the next 5 minutes.  <br> Reward for completion: Reroll all current challenges" },
    { title: "Bear Bear", difficulty: "easy", 					description: "Find a teddy bear for sale", 																				moreDetails: "Find a teddy bear for sale.  <br> Reward for completion: Reroll all current challenges" },
    { title: "Drink", difficulty: "easy", 						description: "Find potable water that is not from any of the players.", 												moreDetails: "Find potable water that is not from any of the players.  <br> Reward for completion: Reroll all current challenges" },
    { title: "The Big Wheel", difficulty: "easy", 				description: "Take a picture of the Singapore flyer", 																	moreDetails: "Take a picture of the Singapore flyer. <br> Reward for completion: Reroll all current challenges" },
    { title: "Yummy", difficulty: "easy",						description: "Find a snack cheaper than $2", 																			moreDetails: "Find a snack cheaper than $2.  <br> Reward for completion: Reroll all current challenge" },
    { title: "Paranoid Pedestrian", difficulty: "easy", 		description: "Before crossing a road, look left, and then right.  <br> Repeat 5 more times before crossing.", 			moreDetails: "Before crossing a road, look left, and then right.  <br> Repeat 5 more times before crossing. <br> Reward for completion: Reroll all current challenges" },
    { title: "Truely Huge", difficulty: "easy",					description: "Find a body of water bigger than 1m squared in area.", 													moreDetails: "Find a body of water bigger than 1m squared in area.  <br> Reward for completion: Reroll all current challenges" },
    { title: "Stay hygienic!", difficulty: "easy", 				description: "Wash your hands. With soap, of course.", 																	moreDetails: "Wash your hands. With soap, of course." },
    { title: "Weather Forecaster", difficulty: "easy", 			description: "Check the weather and make a forecast.", 																	moreDetails: "Check the NEA weather map/forecast.  <br> Announce to the players whether you believe it may rain or not.  <br> Reward for completion: Reroll all current challenges" },

    //{ title: "", difficulty: "easy", description: "", moreDetails: "" },
    // ... other card data
];

const cardDataMedium = [
    { title: "Invent a new sport.", difficulty: "normal",       description: "Invent a new sport, and play a round of it",                                                              moreDetails: "Invent a new sport. Your sport must use pins, targets, baskets or nets.  <br> You must have a method of scoring.  <br> The sport must be for multiple players.  <br> You must play at least one round of your new sport, lasting at least 3 minutes.  <br> You can compete against yourself.  <br> Do not spend more than $10 on the challenge.  <br> Reward for completion: 3 “Location Off” Minutes" },
    { title: "Tower of Babbel", difficulty: "normal",           description: "Compete against your opponents in a tower making contest. ",                                              moreDetails: "Compete against your opponents in a tower making contest.  <br> Announce the contest publicly, with a 5 minute preparation time.  <br> After prep time is over, all teams have 5 minutes to make the tallest tower possible, without spending any money.  <br> The winner of the contest wins the “Location Off” Minutes. Reward for winner: 3 “Location Off” Minutes" },
    { title: "The Farlands", difficulty: "normal",              description: "Visit the map border! Take a picture of either the water boundary, or the Victoria/Hill St boundary.",    moreDetails: "Visit the map border! Take a picture of either the water boundary, or the Victoria/Hill St boundary.  <br> Reward for completion: 3 “Location Off” Minutes" },
    { title: "Price war: Water", difficulty: "normal",          description: "Compete against your opponents in a price war! Attempt to find the cheapest bottled water for sale. ",    moreDetails: "Announce the competition publicly, with a 5 minute preparation time.  <br> All teams have 10 minutes to find the cheapest possible version for sale.  <br> It cannot be free. It cannot be sold by someone playing the game.  <br> Reward for winner: 3 “Location Off” Minutes" },
    { title: "Price war: Chips", difficulty: "normal",          description: "Compete against your opponents in a price war! Attempt to find the cheapest bag of chips for sale. ",     moreDetails: "Announce the competition publicly, with a 5 minute preparation time.  <br> All teams have 10 minutes to find (and send a picture of) the cheapest bag of chips for sale that they can find. <br> It cannot be free. It cannot be sold by someone playing the game.  <br> Reward for winner: 3 “Location Off” Minutes" },
    { title: "Price war: Tissues", difficulty: "normal",        description: "Compete against your opponents in a price war! Attempt to find the cheapest pack of tissue paper for sale. ", moreDetails: "Announce the competition publicly, with a 5 minute preparation time.  <br> All teams have 10 minutes to find (and send a picture of) the cheapest pack of tissue paper for sale that they can find. <br> It cannot be free. It cannot be sold by someone playing the game. <br>  Reward for winner: 3 “Location Off” Minutes" },
    { title: "Questionable Trade", difficulty: "normal",        description: "Make a trade. Your opponents each get 3 “Location Off” Minutes. You get 4 “Location Off” Minutes.",       moreDetails: "Make a trade. Your opponents each gain 3 “Location Off” Minutes, while you gain 4 “Location Off” Minutes." },
    { title: "Start a sightseeing competition! ",difficulty: "normal", description: "Compete against other teams to find numbers and buildings",                                        moreDetails: "Announce that you are starting this challenge, and then start a 5 minute period. <br> After the 5 minute period, take a picture of 3 different buildings/objects with numbers on them (greater than zero only). <br>  Use the 3 numbers and 3 of any operand to get 0.  <br> The first team to acquire a suitable set of numbers wins. <br> Examples: 4 + 9 - 13 (valid).  <br> 14 - 8 - 6 (valid).  <br> 0 + 0 + 0 (invalid).  <br> 0 + 8 - 8 (invalid).  <br> Reward for winner: 4 “Location Off” Minutes" },
    { title: "Awkwardly Social", difficulty: "normal",          description: "Greet a stranger and be acknowledged",                                                                    moreDetails: "Greet a stranger and be acknowledged.  <br> It cannot be in a transactional setting.  <br> Examples: In a store (Invalid).  <br> On the street (Valid).  <br> Reward for completion: 3 “Location Off” Minutes" },
    { title: "Nature Lover", difficulty: "normal",              description: "Avoid entering air-conditioned places for 10 minutes.",                                                   moreDetails: "Appreciate nature and fresh air!  <br> Announce that you are starting this challenge. <br> Do not enter any air-conditioned place for 10 minutes.  <br> If you do, your attempt is void, but the challenge can be reattempted. <br> Reward for completion: 3 “Location Off” Minutes" },
    { title: "Data Leak", difficulty: "normal",                 description: "For the next 20 minutes, all your communications must be public",                                         moreDetails: "Announce that you are starting this challenge. <br> For the next 20 minutes, you are only allowed to use the public chat for communications. <br> If you do, your attempt is void, but the challenge can be reattempted. <br> After the 20 minutes, you are granted the reward.  <br> Reward for completion: 3 “Location Off” Minutes" },
    { title: "Go On Wheels", difficulty: "normal",              description: "For the next 15 minutes, you cannot use stairs or escalators.",                                           moreDetails: "Announce that you are starting this challenge. <br>  For the next 15 minutes, you cannot use stairs or escalators. <br> If you do, your attempt is void, but the challenge can be reattempted. <br> You may use lifts and slopes. <br> Reward for completion: 4 “Location Off” Minutes" },

    //{ title: "", difficulty: "normal", description: "", moreDetails: "" },
];

const cardDataHard = [
    { title: "Telepathy", difficulty: "hard",                   description: "Without any communication about the item, go into a store of your choice and mentally select an item.  <br> Your partner must guess the same item as you.",                           moreDetails: "Without any communication about the item, go into a store of your choice and mentally select an item.  <br> Your partner must guess the exact same item as you.  <br> If your partner is unable to, you can reattempt.  <br> Reward for completion: 6 “Location Off” Minutes" },
    { title: "Scrapbook", difficulty: "hard",                   description: "Word for word, recreate the most recent message from your opponents’ team using pictures of signboards you pass by. ",                                                                moreDetails: "Word for word, recreate the most recent message from your opponents’ team using pictures of signboards you pass by.  <br> Reward for completion: 6 “Location Off” Minutes" },
    { title: "Pun-ology", difficulty: "hard",                   description: "Come up with 5 puns about your surroundings in your building/location",                                                                                                               moreDetails: "Announce that you are starting this challenge.  <br> Look around you. Before you can leave your building/location, you must come up with 5 puns about your surroundings. <br>  If you do leave, the attempt is void, but the challenge can be reattempted. <br> Send your puns into public chat, along with pictures of what they reference.  <br> Reward for completion: 6 “Location Off” Minutes" },
    { title: "Play tag inside tag!", difficulty: "hard",        description: "For the next 5 minutes, play tag inside your location.  <br> You cannot leave until 5 minutes is up.",                                                                                moreDetails: "Split your group into 2, and decide who will be “It”.  <br> For the next 5 minutes, play tag inside your location. You cannot leave until 5 minutes is up.  <br> If you do leave, the attempt is void, but the challenge can be reattempted. <br> Reward for completion: 6 “Location Off” Minutes" },
    { title: "Take a breather! ", difficulty: "hard",           description: "Rest at your current location for X minutes.  <br> You gain X÷2 “Location Off” Minutes",                                                                                              moreDetails: "Announce that you are starting this challenge.  <br> Make sure your location is on. Publicly predetermine how many minutes (X) you are going to rest for.  <br> After your rest, you gain X÷2 (rounded up) “Location Off” Minutes.  <br> Your rest time is minimum 2 min, max 8 min.  <br> You cannot move during your rest period.  <br> Reward for completion: X÷2 “Location Off” Minutes" },
    { title: "Start a bidding war! ", difficulty: "hard",       description: "There is 1 debuff that comes with a reward.  <br> The unit which is willing to take the lowest reward, gets the debuff and reward.",                                                  moreDetails: "Announce that you are starting this challenge. <br> There is a debuff (being unable to check anyone’s location for the next 10 minutes) that comes with a reward (“Location Off” Minutes). <br> Units must bid against each other. <br> The unit willing to receive the lowest reward for the debuff will get the debuff and reward. <br> The highest reward is 12 Location Off Minutes. <br> You can only bid whole numbers. <br> The bid ends if no further offer is made after 5 minutes.<br> Reward for winner: The amount bidded" },
    { title: "Play the new sport! ", difficulty: "hard",        description: "Play the new sport with your friendly team. (If the “New sport” challenge has not been completed yet, reroll this challenge)",                                                        moreDetails: "Invite your friendly team to play the new sport.  <br> Meet up with your friendly team, and play a round lasting at least 5 minutes. <br>  During the round, no one can leave the vicinity. The winner claims the reward for this challenge. <br> Reward for winner: 6 “Location Off” Minutes" },
    { title: "Visibly Invisible", difficulty: "hard",           description: "Turn off your location for 15 minutes. For the rest of the round, you cannot enter air-conditioned buildings. (If there is less than 30min left in the game, reroll this)",           moreDetails: "Announce that you are starting this challenge. <br> Turn off your location for 15 minutes.For the rest of the round, you cannot enter air-conditioned buildings. <br> This challenge cannot be attempted if there is less than 30 minutes left in the game." },
    { title: "Bet on yourself!", difficulty: "hard",            description: "Get a small bonus up front. If you win the next 2 contest-styled challenges, get a bonus. If not, your opponents get a bonus.",                                                       moreDetails: "Announce that you are starting this challenge.  <br> You get 2  “Location Off” Minutes for attempting the challenge.  <br> If you win the next 2 contest-styled challenges, you get a bonus of 4 “Location Off” Minutes. <br>  If you lose either of the next 2 contest-styled challenges, your opponents receive 3 “Location Off” Minutes each. <br> Only 1 team can attempt this challenge at a time. <br> Reward for starting an attempt: 2 “Location Off” Minutes" },


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
    const [, setContentHeight] = useState('auto');
    const [opacity, setOpacity] = useState(1);

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

    useEffect(() => {
        if (showDetails) {
            setContentHeight('auto');
            setOpacity(1);
        } else {
            setContentHeight('0');
            setOpacity(0);
        }
    }, [showDetails]);

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
        return (
            <div className={`card yellow-card`}>
                <CardHeader difficulty="easy" onShowDetails={() => setShowDetails(true)} />
                <h2 className="title">Loading</h2>
                <p>Loading...</p>
                <button className="card-button">Complete</button>
            </div>
        )
    }

    return (
        <div className={`card ${bgColor}`} >
            {showDetails ? (
                <div>
                    <p className="detailed-view" style={{opacity: opacity, transition: 'max-height 0.7s ease, opacity 0.7s ease' }} dangerouslySetInnerHTML={{ __html: props?.moreDetails || "" }}></p>
                    <button className="card-button" onClick={() => setShowDetails(false)}>
                        Back
                    </button>
                </div>
            ) : (
                <>
                    <CardHeader difficulty={props?.difficulty || ""} onShowDetails={() => setShowDetails(true)} />
                    <h2 className="title">{props?.title}</h2>
                    <p dangerouslySetInnerHTML={{ __html: props?.description || "" }}></p>
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
