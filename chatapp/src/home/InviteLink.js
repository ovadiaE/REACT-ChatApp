import React, {useState} from "react"

const InviteLink = ({copyText}) => {
    const [isCopied, setIsCopied] = useState(false)

    async function copyToClipboard (text) {
        if('clipboard' in navigator){
            return await navigator.clipboard.writeText(text)
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const handleCopyClick = async () => {
        try {
            let copy = await copyToClipboard(copyText)
            if(copy){setIsCopied(true)}
            setTimeout( () => {
                setIsCopied(false)
            }, 1500)
        
        } catch (error) {
            console.log(error)
        };
    }

    return (
        <div>
            <input type="text" value={copyText} readOnly/>
            <button onClick={handleCopyClick}>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
        </div>
    )

}

export default InviteLink