import React, { useEffect, useState } from 'react'
import Image from 'next/image'

interface ImageBlobProps {
    quoteReceived: String;
    blobUrl: string | null;
}

const ImageBlob = ({ 
    quoteReceived, 
    // blobUrl
}: ImageBlobProps) => {
    const[blobUrl, setBlobUrl] = useState<string | null>(null);

    useEffect(() => {
        const response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "image/png",
                "Access-Control-Allow-Origin": "*"
            },
            "body": blob,
            "isBase64Encoded": true
        }
        const binaryData = Buffer.from(response.body, 'base64');
        const blob = new Blob([binaryData], { type: response.headers["Content-Type"] });
        const newBloblUrl = URL.createObjectURL(blob);
        setBlobUrl(newBloblUrl);
        return () => {
            URL.revokeObjectURL(newBloblUrl);
        }
    },[])

    if (!blobUrl) {
        return null;
    }

    return (
        <Image src={blobUrl} alt="Generated quote card" width={150} height={100} />
    )
}

export default ImageBlob