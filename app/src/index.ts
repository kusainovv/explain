import './style.css'
import './components/math';

declare global {
    interface Window {
        keplr?: any;
    }
}

window.onload = () => {
    if (!window.keplr) {
        alert('Please install keplr extension!');
    }
}


const connectToKepler = async () => {
    const chainId = 'keplr-1';
    try {
        await window.keplr.enable(chainId);
        alert('Connected');
    } catch(error) {
        alert(error);
    }
}

interface OfflineSigner {
    address: string,
    public: string
}

const getAddress = async () => {
    const chainId = 'keplr-1';
    try {
        await window.keplr.enable(chainId);
        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        accounts.forEach(({ address }: OfflineSigner) => alert(address));
    } catch(error) {
        alert(error);
    }
}

document.getElementById('connect')?.addEventListener('click', connectToKepler);
document.getElementById('get_address')?.addEventListener('click', getAddress);


