import React from 'react';

const ExternalWebsite = () => {
    // Define the URL of the external website
    const externalUrl = 'http://localhost:8080';

    // Open the external website in a new tab
    const openWebsiteInNewTab = () => {
        window.open(externalUrl, '_blank');
    };

    return (
        <div>
            <h2>Group Chat Service</h2>

            <button onClick={openWebsiteInNewTab}>Open in new tab</button>
        </div>
    );
};

export default ExternalWebsite;
