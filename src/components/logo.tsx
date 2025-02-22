
import challengeIcon from "../assets/challenge.svg"; // ✅ Make sure you have an SVG file in `/assets/`

const ChallengesCard = () => {
    return (
        <div className="card challenges-card">
            <div className="challenge-icon-container"> 
                <img src={challengeIcon} alt="Challenges Icon" className="challenge-icon" />
            </div>
            <h2 className="challenges-title">Challenges</h2>
        </div>
    );
};

export default ChallengesCard;
