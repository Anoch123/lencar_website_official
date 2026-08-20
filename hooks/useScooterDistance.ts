import { useCallback, useEffect, useRef, useState } from "react";

type ScooterDistanceData = {
    totalDistanceKm: number;
    lastRefreshed: string;
};

const FETCH_URL = "/api/scooters/total-distance";
const REFRESH_URL = "/api/scooters/total-distance/refresh";

export function useScooterDistance(initialDistance?: number) {
    const [distance, setDistance] = useState(initialDistance ?? 0);
    const [lastRefreshed, setLastRefreshed] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [active, setActive] = useState(false);
    const initializedRef = useRef(false);
    const activeRef = useRef(false);

    const fetchDistance = useCallback(async () => {
        try {
            const res = await fetch(FETCH_URL);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const json: ScooterDistanceData = await res.json();
            setDistance(json.totalDistanceKm);
            setLastRefreshed(json.lastRefreshed);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initializedRef.current) {
            initializedRef.current = true;
            fetchDistance();
        }
    }, [fetchDistance]);

    useEffect(() => {
        activeRef.current = active;
    }, [active]);

    useEffect(() => {
        if (!active) return;
        const interval = setInterval(async () => {
            try {
                await fetch(REFRESH_URL, { method: "POST" });
            } catch {
                // ignore refresh errors
            }
            await fetchDistance();
        }, 30000);
        return () => clearInterval(interval);
    }, [active, fetchDistance]);

    // Simulated live updates — nudge totals forward for the "live feed" effect.
    useEffect(() => {
        if (!active) return;
        const interval = setInterval(() => {
            setDistance((prev) => prev + 0.4 + Math.random() * 1.1);
        }, 2200);
        return () => clearInterval(interval);
    }, [active]);

    return {
        distance,
        lastRefreshed,
        loading,
        error,
        active,
        setActive,
    };
}
