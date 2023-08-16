import React from 'react'
import Image from 'next/image'
import LottieJson from '../../assets/animated-photo.json'
import { CenteredLottie, DownloadQuoteCardCon, DownloadQuoteCardConText } from './AnimationElements'

interface AnimatedDownloadButtonProps {
    handleDownload: () => void;
}

const AnimatedDownloadButton = ({handleDownload}: AnimatedDownloadButtonProps) => {
    return (
        <DownloadQuoteCardCon 
            onClick={handleDownload}
        >

            <CenteredLottie
                loop
                animationData={LottieJson}
                play
            />    
            <DownloadQuoteCardConText>
                Download your quote card
            </DownloadQuoteCardConText>
        </DownloadQuoteCardCon>
    )
}

export default AnimatedDownloadButton