// app/page.tsx
"use client";
import { useState } from "react";

type HelloResponse = {
    message: string;
    now: string;
    received?: object; // for POST
};

export default function Home() {
    // const [data, setData] = useState<unknown>(null);
    // const callGet = async () => {
    //     const res = await fetch("/api/hello");
    //     setData(await res.json());
    // };
    
    const [data, setData] = useState<HelloResponse | null>(null);
    
    const callGet = async () => {
        const res = await fetch("/api/hello");
        const json: HelloResponse = await res.json();
        setData(json);
    };
    
    const callPost = async () => {
        const res = await fetch("/api/hello", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "Dev", ts: Date.now() }),
        });
        setData(await res.json());
    };
    
    return (
        <main style={{ padding: 24 }}>
            <h1>Vercel Serverless Function Demo</h1>
            <div style={{ gap: 8 }}>
                <button onClick={callGet}>Call GET /api/hello</button>
                <br/>
                <button onClick={callPost}>Call POST /api/hello</button>
            </div>
            {/* <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
                {data ? JSON.stringify(data, null, 2) : "Response will appear here"}
            </pre> */}
            <pre style={{ whiteSpace: "pre-wrap", marginTop: 12 }}>
                {data ? `Message: ${data.message}\nTime: ${data.now}` : "Response will appear here"}
            </pre>
        </main>
    );
}