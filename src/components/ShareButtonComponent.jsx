import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

const ShareButtonComponent = ({ data }) => {
    const shareUrl = `http://128.140.43.32${data.path?.[0]?.alias}`;
    const title = data.title?.[0]?.value || '';

    return (
        <div>
            <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round />
            </TwitterShareButton>
        </div>
    );
};

export default ShareButtonComponent;
