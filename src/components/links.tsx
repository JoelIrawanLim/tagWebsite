

const LinksCard = () => {
    const handleFeedbackClick = () => {
        alert("Feedback button clicked!"); // ✅ Replace with your feedback logic
    };

    const openLink = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer"); // ✅ Opens in a new tab
    };


    return (
        <div className="card yellow-card">
            <h2 className="links-title">Links</h2>
            <div className="links-buttons">
                <button className="link-button" onClick={handleFeedbackClick}>
                    Feedback
                </button>
                <button className="link-button" onClick={() => openLink("/docs")}>
                    Docs
                </button>
                <button className="link-button" onClick={() => openLink("https://www.youtube.com/@FindnSnap")}>
                    Updates
                </button>
            </div>
        </div>
    );
};

export default LinksCard;
