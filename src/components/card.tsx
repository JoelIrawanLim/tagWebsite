type CardProps = {
    title: string;
    difficulty: string;
    description: string;
};

const difficultyColor: Record<string, string> = {
    easy: "blue-card",  
    normal: "yellow-card",
    hard: "red-card"
};  

const Card = (props: CardProps) => {
    const difficultyKey = props.difficulty ? props.difficulty.toLowerCase() : "default";
    const bgColor = difficultyColor[difficultyKey] || "gray-card"

    return(
        <div className={`card ${bgColor}`}>
                <h1 className="difficulty">{props.difficulty.charAt(0).toUpperCase()+props.difficulty.slice(1)}</h1>
                <h2 className="title">{props.title}</h2>
                <p>{props.description}</p>
        </div>
    )
}

export default Card