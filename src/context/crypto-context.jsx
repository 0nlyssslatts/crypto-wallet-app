import { createContext, useState, useEffect, useContext } from "react";
import { fetchCrypto, fetchAssets } from "../api.js";
import { percentDifference } from "../utils.js";

const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
});

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        async function preload() {
            setLoading(true);
            const { result } = await fetchCrypto();
            const assets = await fetchAssets();

            setAssets(
                assets.map((asset) => {
                    const coin = result.find((c) => c.id === asset.id);
                    return {
                        grow: asset.price < coin.price,
                        growPercent: percentDifference(asset.price, coin.price),
                        totalAmount: asset.amount * coin.price,
                        totalProfit:
                            asset.amount * coin.price -
                            asset.amount * asset.price,
                        ...asset,
                    };
                })
            );
            setCrypto(result);
            setLoading(false);
        }

        preload();
    }, []);

    function addAsset(newAsset) {
        setAssets((prev) => [...prev, newAsset]);
    }

    return (
        <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContext;

export function useCrypto() {
    return useContext(CryptoContext);
}
