import React from 'react';

const ExternalWebsite = () => {
    // Define the URL of the external website
    const externalUrl = 'http://localhost:3001/';

    return (
        <div>
            <h2>Group Chat Service</h2>

            <iframe
                title="GrouptExternal Website"
                src={externalUrl}
                width="100%"
                height="500px"
                allow="fullscreen"
            />
        </div>
    );
};

export default ExternalWebsite;
