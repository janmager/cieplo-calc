export const copyToClipboard = (text: string) => {
    window.parent.postMessage({ type: 'copyUrl', text }, '*');
    return navigator.clipboard.writeText(text)
}